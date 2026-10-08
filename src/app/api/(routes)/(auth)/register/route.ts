import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { RegisterUserRequestSchema } from "@/app/api/_dtos/register-dto";
import { BadRequestError } from "@/app/api/_erros/bad-request-error";
import { ConflictError } from "@/app/api/_erros/conflict-error";
import { InternalServerError } from "@/app/api/_erros/internal-server-error";
import { handleError } from "@/app/api/_helpers/handle-error";
import { env } from "@/config/env";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
	try {
		const cookieStore = await cookies();
		const body = await request.json();

		const registerUserRequestValidation = RegisterUserRequestSchema.safeParse(body);

		if (!registerUserRequestValidation.success) {
			throw new BadRequestError(registerUserRequestValidation.error.message, "VALIDATION");
		}

		const { email, name, password } = registerUserRequestValidation.data;

		const findByEmail = await prisma.user.findUnique({ where: { email } });

		if (findByEmail) {
			throw new ConflictError(
				"Este e-mail já está cadastrado. Tente usar outro e-mail ou faça login com este endereço.",
				"EMAIL_ALREADY_IN_USE",
			);
		}

		const {
			data: { session, user },
			error,
		} = await supabase.auth.signUp({ email, password, options: { data: { name } } });

		if (error || !session || !user || !user.email) {
			throw new InternalServerError("Erro ao tentar criar usuário", "AUTH_PROVIDER_ERROR");
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

		return NextResponse.json({ message: "Usuário criado com sucesso" }, { status: 201 });
	} catch (error) {
		return handleError(error, "Erro ao tentar criar usuário");
	}
}
