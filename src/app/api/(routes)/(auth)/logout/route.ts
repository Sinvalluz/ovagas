import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
	try {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get("access_token")?.value;

		if (!accessToken) {
			return NextResponse.json(
				{ error: { code: "UNAUTHORIZED", message: "O Token de acesso não foi informado." } },
				{ status: 401 },
			);
		}

		const { error } = await supabase.auth.admin.signOut(accessToken, "global");

		if (error) {
			return NextResponse.json(
				{ error: { code: "INTERNAL_ERROR", message: "Erro ao tentar encerrar sessão" } },
				{ status: 500 },
			);
		}

		cookieStore.delete("access_token");
		cookieStore.delete("refresh_token");

		return NextResponse.json({ message: "Sessão removida com sucesso" }, { status: 200 });
	} catch (_error) {
		return NextResponse.json(
			{ error: { code: "INTERNAL_ERROR", message: "Erro ao tentar encerrar sessão" } },
			{ status: 500 },
		);
	}
}
