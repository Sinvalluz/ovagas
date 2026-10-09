import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BoardRequestSchema, type BoardResponse } from "../../_dtos/board-dto";
import { BadRequestError } from "../../_erros/bad-request-error";
import { ConflictError } from "../../_erros/conflict-error";
import { handleError } from "../../_helpers/handle-error";
import { verifySession } from "../../_helpers/verify-session";

export async function POST(request: NextRequest) {
	try {
		const user = await verifySession();
		const body = await request.json();

		const boardRequestValidation = BoardRequestSchema.safeParse(body);

		if (!boardRequestValidation.success) {
			throw new BadRequestError(boardRequestValidation.error.message, "VALIDATION");
		}

		const { name } = boardRequestValidation.data;

		const existsBoardByUserId = await prisma.board.findUnique({
			where: { name_userId: { userId: user.id, name } },
		});

		if (existsBoardByUserId) {
			throw new ConflictError("Este usuário já possui um quadro com esse nome", "BOARD_IS_ALREADY_IN_USE");
		}

		await prisma.board.create({ data: { name, userId: user.id, createdAt: new Date(), updatedAt: new Date() } });

		return NextResponse.json<BoardResponse>({ message: "Quadro criado com sucesso." }, { status: 201 });
	} catch (error) {
		return handleError(error, "Error ao tentar criar um Quadro");
	}
}
