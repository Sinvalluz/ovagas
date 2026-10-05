import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/config/env";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { LoginRequestSchema } from "./dto/login-request-dto";
import type { loginResponseDto } from "./dto/login-response-dto";

export async function POST(request: NextRequest) {
	try {
		const cookieStore = await cookies();
		const body = await request.json();

		const result = LoginRequestSchema.safeParse(body);

		if (!result.success) {
			return Response.json({ message: result.error }, { status: 400 });
		}

		const { email, password } = result.data;

		const findByEmail = await prisma.user.findUnique({ where: { email } });

		if (!findByEmail) {
			return NextResponse.json(
				{
					error: {
						code: "INVALID_CREDENTIALS",
						message: "E-mail ou senha inválidos. Verifique suas credenciais e tente novamente.",
					},
				},
				{ status: 401 },
			);
		}

		const {
			data: { session },
			error,
		} = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			if (error.code === "invalid_credentials") {
				return NextResponse.json(
					{
						error: {
							code: "INVALID_CREDENTIALS",
							message: "E-mail ou senha inválidos. Verifique suas credenciais e tente novamente.",
						},
					},
					{ status: 401 },
				);
			}
		}

		if (!session) {
			return NextResponse.json(
				{ error: { code: "INTERNAL_ERROR", message: "Erro ao tentar fazer o login" } },
				{ status: 500 },
			);
		}

		cookieStore.set("access_token", session.access_token, {
			httpOnly: true,
			sameSite: "lax",
			secure: env.NEXT_PUBLIC_NODE_ENV === "production",
			path: "/",
		});
		cookieStore.set("refresh_token", session.refresh_token, {
			httpOnly: true,
			sameSite: "lax",
			secure: env.NEXT_PUBLIC_NODE_ENV === "production",
			path: "/",
		});

		return NextResponse.json<loginResponseDto>({ message: "Usuário autenticado com sucesso" }, { status: 201 });
	} catch (_error) {
		return NextResponse.json(
			{ error: { code: "INTERNAL_ERROR", message: "Erro ao tentar fazer o login" } },
			{ status: 500 },
		);
	}
}
