import { type NextRequest, NextResponse } from "next/server";
import { BoardDeleteParamsSchema, BoardEditRequestSchema } from "@/app/api/_dtos/board-dto";
import { BadRequestError } from "@/app/api/_erros/bad-request-error";
import { NotFoundError } from "@/app/api/_erros/not-found-error";
import { handleError } from "@/app/api/_helpers/handle-error";
import { verifySession } from "@/app/api/_helpers/verify-session";
import { prisma } from "@/lib/prisma";

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const user = await verifySession();
		const { id } = await params;

		const boardDeleteParamsValidation = BoardDeleteParamsSchema.safeParse(id);

		if (!boardDeleteParamsValidation.success) {
			throw new BadRequestError(boardDeleteParamsValidation.error.message, "VALIDATION");
		}

		const idValidated = boardDeleteParamsValidation.data;

		const board = await prisma.board.findUnique({ where: { id: idValidated, userId: user.id } });

		if (!board) {
			throw new NotFoundError("Nenhum quadro encontrado para esse Usuário, tente outro ID");
		}

		await prisma.board.delete({ where: { id, userId: user.id } });

		return new NextResponse(null, { status: 204 });
	} catch (error) {
		return handleError(error, "Error ao tentar deletar o quadro");
	}
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const user = await verifySession();
		const body = await request.json();
		const { id } = await params;

		const boardEditRequestValidation = BoardEditRequestSchema.safeParse({ ...body, id });

		if (!boardEditRequestValidation.success) {
			throw new BadRequestError(boardEditRequestValidation.error.message, "VALIDATION");
		}

		const { id: boardId, name } = boardEditRequestValidation.data;

		const board = await prisma.board.findUnique({ where: { id: boardId, userId: user.id } });

		if (!board) {
			throw new NotFoundError("Nenhum quadro encontrado para esse Usuário, tente outro ID");
		}

		await prisma.board.update({
			where: { id: boardId },
			data: { name: board.name === name ? board.name : name, updatedAt: new Date() },
		});

		return new NextResponse(null, { status: 204 });
	} catch (error) {
		return handleError(error, "Error ao tentar deletar o quadro");
	}
}
