import z from "zod";

export const BoardRequestSchema = z.object({
	name: z
		.string()
		.min(1, "O nome é obrigatório.")
		.min(3, "O nome deve conter mais de 3 caracteres")
		.max(100, "O nome deve conter menos de 100 caracteres"),
});

export type BoardResponse = { message: string };
