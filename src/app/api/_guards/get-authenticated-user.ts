/** biome-ignore-all lint/style/noNonNullAssertion: <A regra de negocio do projeto é baseado em email onde sempre acontece um retorno de um usuário e uma sessão, pois não tem confirmação de e-mail> */
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import UnauthorizedError from "../_errors/unauthorized-error";

export async function getAuthenticatedUser() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("access_token")?.value;

	if (!accessToken) {
		throw new UnauthorizedError("O Token de acesso não foi informado.");
	}

	const { data, error } = await supabase.auth.getUser(accessToken);

	if (error || !data.user) {
		throw new UnauthorizedError("O token de acesso enviado é inválido.");
	}

	return data.user;
}
