/** biome-ignore-all lint/style/noNonNullAssertion: <It will always return the email> */
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import type { RegisterUserRequestDto } from "../dto/register-request-dto";
import { findByEmail } from "../repository/user-repository";

async function registerUser(registerUserRequestDto: RegisterUserRequestDto) {
	const userExists = await findByEmail(registerUserRequestDto.email);

	if (userExists) {
		return {
			data: {
				user: null,
				session: null,
			},
			error: {
				errorStatus: 409,
				errorCode: "EMAIL_IS_ALREADY_IN_USE",
				message: "O e-mail já está em uso, tente novamente com outro e-mail",
			},
		};
	}

	const { data, error } = await supabase.auth.signUp({
		email: registerUserRequestDto.email,
		password: registerUserRequestDto.password,
		options: {
			data: {
				name: registerUserRequestDto.name,
			},
		},
	});

	if (error) {
		return {
			data: {
				user: null,
				session: null,
			},
			error: {
				errorStatus: error.status,
				errorCode: error.code,
				message: error.message,
			},
		};
	}

	if (!data.user) {
		return {
			data: {
				user: null,
				session: null,
			},
			error: {
				errorStatus: 500,
				errorCode: "USER_NOT_CREATED",
				message: "Usuário não criado",
			},
		};
	}

	const userCreated = await prisma.user.create({
		data: {
			id: data.user.id,
			email: data.user.email!,
			name: registerUserRequestDto.name,
			role: "USER",
			imgUrl: null,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	return {
		data: {
			user: userCreated,
			session: data.session,
		},
		error: null,
	};
}

export { registerUser };
