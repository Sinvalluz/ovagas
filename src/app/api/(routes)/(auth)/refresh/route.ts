import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { UnauthorizedError } from "@/app/api/_erros/unauthorized-error";
import { handleError } from "@/app/api/_helpers/handle-error";
import { env } from "@/config/env";
import { supabase } from "@/lib/supabase";

export async function GET() {
	try {
		const cookieStore = await cookies();
		const refreshToken = cookieStore.get("refresh_token")?.value;

		if (!refreshToken) {
			throw new UnauthorizedError("O Token de atualização não foi informado.");
		}

		const {
			data: { session },
			error,
		} = await supabase.auth.refreshSession({ refresh_token: refreshToken });

		if (error || !session) {
			cookieStore.delete("access_token");
			cookieStore.delete("refresh_token");
			throw new UnauthorizedError("O token de atualização enviado é inválido.");
		}

		cookieStore.set("access_token", session.access_token, {
			httpOnly: true,
			sameSite: "lax",
			secure: env.NODE_ENV === "production",
			path: "/",
		});
		cookieStore.set("refresh_token", session.refresh_token, {
			httpOnly: true,
			sameSite: "lax",
			secure: env.NODE_ENV === "production",
			path: "/",
		});

		return NextResponse.json({ message: "A sessão do usuário foi atualizada com sucesso" }, { status: 200 });
	} catch (error) {
		return handleError(error, "Erro ao atualizar sessão");
	}
}
