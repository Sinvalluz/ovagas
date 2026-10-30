import { type NextRequest, NextResponse } from "next/server";
import { BoardEditDeleteParamsSchema } from "@/app/api/_dtos/board-dto";
import { BadRequestError } from "@/app/api/_erros/bad-request-error";
import { NotFoundError } from "@/app/api/_erros/not-found-error";
import { handleError } from "@/app/api/_helpers/handle-error";
import { verifySession } from "@/app/api/_helpers/verify-session";
import { prisma } from "@/lib/prisma";

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const user = await verifySession();
		const { id } = await params;

		const boardParamsValidation = BoardEditDeleteParamsSchema.safeParse(id);

		if (!boardParamsValidation.success) {
			throw new BadRequestError(boardParamsValidation.error.message, "VALIDATION");
		}

		const board = await prisma.board.findUnique({ where: { id, userId: user.id } });

		if (!board) {
			throw new NotFoundError("Nenhum quadro encontrado para esse Usuário, tente outro ID");
		}

		await prisma.board.delete({ where: { id, userId: user.id } });

		return new NextResponse(null, { status: 204 });
	} catch (error) {
		return handleError(error, "Error ao tentar deletar o quadro");
	}
}
