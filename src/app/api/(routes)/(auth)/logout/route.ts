import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { InternalServerError } from "@/app/api/_erros/internal-server-error";
import { UnauthorizedError } from "@/app/api/_erros/unauthorized-error";
import { handleError } from "@/app/api/_helpers/handle-error";
import { supabase } from "@/lib/supabase";

export async function GET() {
	try {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get("access_token")?.value;

		if (!accessToken) {
			throw new UnauthorizedError("O Token de acesso não foi informado.");
		}

		const { error } = await supabase.auth.admin.signOut(accessToken, "global");

		if (error) {
			throw new InternalServerError("Erro ao tentar encerrar sessão", "AUTH_PROVIDER_ERROR");
		}

		cookieStore.delete("access_token");
		cookieStore.delete("refresh_token");

		return NextResponse.json({ message: "Sessão removida com sucesso" }, { status: 200 });
	} catch (error) {
		return handleError(error, "Erro ao tentar encerrar sessão");
	}
}
