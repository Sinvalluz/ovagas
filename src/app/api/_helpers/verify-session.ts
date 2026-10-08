import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { UnauthorizedError } from "../_erros/unauthorized-error";

export async function verifySession() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("access_token")?.value;

	if (!accessToken) {
		throw new UnauthorizedError("O Token de acesso não foi informado.");
	}

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser(accessToken);

	if (error || !user) {
		throw new UnauthorizedError("O token de acesso enviado é inválido.");
	}

	return user;
}
