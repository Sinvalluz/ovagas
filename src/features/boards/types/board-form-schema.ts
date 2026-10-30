import z from "zod";

export const BoardFormSchema = z.object({
	name: z
		.string("O Nome deve ser uma string")
		.min(3, "O nome deve conter no mínimo três caracteres")
		.max(100, "O nome deve conter no máximo 100 caracteres"),
});
