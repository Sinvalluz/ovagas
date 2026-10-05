import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/config/env";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { RegisterUserRequestSchema } from "./dto/register-request-dto";

export async function POST(request: NextRequest) {
	try {
		const cookieStore = await cookies();
		const body = await request.json();

		const result = RegisterUserRequestSchema.safeParse(body);

		if (!result.success) {
			return Response.json({ message: result.error }, { status: 400 });
		}

		const { email, name, password } = result.data;

		const findByEmail = await prisma.user.findUnique({ where: { email } });

		if (findByEmail) {
			return NextResponse.json(
				{
					error: {
						code: "EMAIL_IS_ALREADY_IN_USE",
						message:
							"Este e-mail já está cadastrado. Tente usar outro e-mail ou faça login com este endereço.",
					},
				},
				{ status: 409 },
			);
		}

		const {
			data: { session, user },
			error,
		} = await supabase.auth.signUp({ email, password, options: { data: { name } } });

		if (error) {
			return NextResponse.json(
				{ error: { code: "INTERNAL_ERROR", message: "Erro ao tentar criar usuário" } },
				{ status: 500 },
			);
		}

		if (!session || !user || !user.email) {
			return NextResponse.json(
				{ error: { code: "INTERNAL_ERROR", message: "Erro ao tentar criar usuário" } },
				{ status: 500 },
			);
		}

		await prisma.user.create({
			data: {
				id: user.id,
				email: user.email,
				name,
				role: "USER",
				imgUrl: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});

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

		return Response.json({ message: "Usuário criado com sucesso" }, { status: 201 });
	} catch (_error) {
		return NextResponse.json(
			{ error: { code: "INTERNAL_ERROR", message: "Erro ao tentar criar usuário" } },
			{ status: 500 },
		);
	}
}
