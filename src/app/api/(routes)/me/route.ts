import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { MeResponse } from "../../_dtos/me-dto";
import { NotFoundError } from "../../_erros/not-found-error";
import { handleError } from "../../_helpers/handle-error";
import { verifySession } from "../../_helpers/verify-session";

export async function GET() {
	try {
		const user = await verifySession();

		const findUserById = await prisma.user.findUnique({ where: { id: user.id } });

		if (!findUserById) {
			throw new NotFoundError("O usuário não foi encontrado.");
		}

		return NextResponse.json<MeResponse>(findUserById, { status: 200 });
	} catch (error) {
		return handleError(error, "Erro ao tentar buscar usuário");
	}
}
