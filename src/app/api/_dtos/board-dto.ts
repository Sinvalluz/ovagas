import z from "zod";
import type { Board } from "../../../../generated/prisma/browser";

export const BoardRequestSchema = z.object({
	name: z
		.string()
		.min(1, "O nome é obrigatório.")
		.min(3, "O nome deve conter mais de 3 caracteres")
		.max(100, "O nome deve conter menos de 100 caracteres"),
});

export const BoardParamsSchema = z.object({
	page: z.coerce
		.number("O parâmetro (page) deve ser um número")
		.gt(0, "O número do parâmetro (page) para deve ser positivo")
		.default(1),
	limit: z.coerce
		.number("O parâmetro (limit) deve ser um número")
		.gt(0, "O número do parâmetro (limit) deve ser positivo")
		.default(10),
});

export type PostBoardResponse = { message: string };

export type GetBoardsResponse = {
	boards: Omit<Board, "userId">[];
	pagination: {
		path: string;
		page: number;
		count: number;
		previousPage: number | null;
		nextPage: number | null;
		lastPage: number;
	};
};

export const BoardEditDeleteParamsSchema = z.uuid().min(1, "O id nos parâmetros é obrigatório.");
