import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
	BoardParamsSchema,
	BoardRequestSchema,
	type GetBoardsResponse,
	type PostBoardResponse,
} from "../../_dtos/board-dto";
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

		return NextResponse.json<PostBoardResponse>({ message: "Quadro criado com sucesso." }, { status: 201 });
	} catch (error) {
		return handleError(error, "Error ao tentar criar um Quadro");
	}
}

export async function GET(request: NextRequest) {
	try {
		const user = await verifySession();
		const searchParams = request.nextUrl.searchParams;

		const boardParamsValidation = BoardParamsSchema.safeParse(Object.fromEntries(searchParams));

		if (!boardParamsValidation.success) {
			throw new BadRequestError(boardParamsValidation.error.message, "VALIDATION");
		}

		const { page, limit } = boardParamsValidation.data;

		const countBoards = await prisma.board.count({ where: { userId: user.id } });

		const lastPage = Math.ceil(countBoards / limit);

		if (countBoards === 0) {
			return NextResponse.json<GetBoardsResponse>(
				{
					boards: [],
					pagination: {
						path: request.nextUrl.pathname,
						page: page,
						count: countBoards,
						previousPage: null,
						nextPage: null,
						lastPage: lastPage,
					},
				},
				{ status: 200 },
			);
		}

		if (page > lastPage) {
			throw new BadRequestError("O número de paginas não está disponível no intervalo", "VALIDATION");
		}

		const boards = await prisma.board.findMany({
			where: { userId: user.id },
			omit: { userId: true },
			take: limit,
			skip: page * limit - limit,
			orderBy: { name: "asc" },
		});

		return NextResponse.json<GetBoardsResponse>(
			{
				boards: boards,
				pagination: {
					path: request.nextUrl.pathname,
					page: page,
					count: countBoards,
					previousPage: page > 1 ? page - 1 : null,
					nextPage: page < lastPage ? page + 1 : null,
					lastPage: lastPage,
				},
			},
			{ status: 200 },
		);
	} catch (error) {
		return handleError(error, "Error ao tentar Buscar quadros");
	}
}
