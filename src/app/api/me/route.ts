import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import type { UserResponse } from "@/types/user";

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

		const {
			data: { user },
			error,
		} = await supabase.auth.getUser(accessToken);

		if (error) {
			if (error.code === "bad_jwt") {
				cookieStore.delete("access_token");
				cookieStore.delete("refresh_token");

				return NextResponse.json(
					{ error: { code: "UNAUTHORIZED", message: "O token de acesso enviado é inválido." } },
					{ status: 401 },
				);
			}
		}

		if (!user) {
			return NextResponse.json(
				{ error: { code: "UNAUTHORIZED", message: "O token de acesso enviado é inválido." } },
				{ status: 401 },
			);
		}

		const findUserById = await prisma.user.findUnique({ where: { id: user.id } });

		if (!findUserById) {
			return NextResponse.json(
				{ error: { code: "USER_NOT_FOUND", message: "O usuário não foi encontrado." } },
				{ status: 404 },
			);
		}

		return NextResponse.json<UserResponse>(findUserById, { status: 200 });
	} catch (_error) {
		return NextResponse.json(
			{ error: { code: "INTERNAL_ERROR", message: "Erro ao tentar buscar usuário" } },
			{ status: 500 },
		);
	}
}
