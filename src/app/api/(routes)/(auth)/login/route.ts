import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { LoginRequestSchema, type loginResponseDto } from "@/app/api/_dtos/login-dto";
import { BadRequestError } from "@/app/api/_erros/bad-request-error";
import { InternalServerError } from "@/app/api/_erros/internal-server-error";
import { UnauthorizedError } from "@/app/api/_erros/unauthorized-error";
import { handleError } from "@/app/api/_helpers/handle-error";
import { env } from "@/config/env";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
	try {
		const cookieStore = await cookies();
		const body = await request.json();

		const loginRequestValidation = LoginRequestSchema.safeParse(body);

		if (!loginRequestValidation.success) {
			throw new BadRequestError(loginRequestValidation.error.message, "VALIDATION");
		}

		const { email, password } = loginRequestValidation.data;

		const findByEmail = await prisma.user.findUnique({ where: { email } });

		if (!findByEmail) {
			throw new UnauthorizedError(
				"E-mail ou senha inválidos. Verifique suas credenciais e tente novamente.",
				"INVALID_CREDENTIALS",
			);
		}

		const {
			data: { session },
			error,
		} = await supabase.auth.signInWithPassword({ email, password });

		if (error || !session) {
			if (error?.code === "invalid_credentials") {
				throw new UnauthorizedError(
					"E-mail ou senha inválidos. Verifique suas credenciais e tente novamente.",
					"INVALID_CREDENTIALS",
				);
			}

			throw new InternalServerError("Erro ao tentar fazer o login", "AUTH_PROVIDER_ERROR");
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
	} catch (error) {
		return handleError(error, "Erro ao tentar fazer o login");
	}
}
