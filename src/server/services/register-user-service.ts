/** biome-ignore-all lint/style/noNonNullAssertion: <A regra de negocio do projeto é baseado em email onde sempre acontece um retorno de um usuário e uma sessão, pois não tem confirmação de e-mail> */
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import type { RegisterUserRequestDto } from "../dto/register-request-dto";
import EmailIsAlreadyInUse from "../errors/email-is-already-in-use";
import InternalServerError from "../errors/internal-server-error";
import SupabaseAuthError from "../errors/supabase-auth-error";
import { findByEmail } from "../repository/user-repository";

export default async function registerUser(registerUserRequestDto: RegisterUserRequestDto) {
	const userExists = await findByEmail(registerUserRequestDto.email);

	if (userExists) {
		throw new EmailIsAlreadyInUse();
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

	if (error) throw new SupabaseAuthError(error.status!, error.code!, error.message);

	const user = await prisma.user.create({
		data: {
			id: data.user!.id,
			email: data.user!.email!,
			name: registerUserRequestDto.name,
			role: "USER",
			imgUrl: null,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	if (!user) throw new InternalServerError();

	return data.session!;
}
