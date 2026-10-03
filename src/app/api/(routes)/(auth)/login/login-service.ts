/** biome-ignore-all lint/style/noNonNullAssertion: <A regra de negocio do projeto é baseado em email onde sempre acontece um retorno de um usuário e uma sessão, pois não tem confirmação de e-mail> */
import InvalidCredentialsError from "@/app/api/_errors/invalid-credentials-error";
import SupabaseAuthError from "@/app/api/_errors/supabase-auth-error";
import { findByEmail } from "@/app/api/_repository/user-repository";
import { supabase } from "@/lib/supabase";
import type { LoginRequestDto } from "./dto/login-request-dto";

export default async function loginService(loginRequestDto: LoginRequestDto) {
	const userExists = await findByEmail(loginRequestDto.email);

	if (!userExists) {
		throw new InvalidCredentialsError();
	}

	const { data, error } = await supabase.auth.signInWithPassword({
		email: loginRequestDto.email,
		password: loginRequestDto.password,
	});

	if (error) {
		if (error.code === "invalid_credentials") {
			throw new InvalidCredentialsError();
		}

		throw new SupabaseAuthError();
	}

	return data.session;
}
