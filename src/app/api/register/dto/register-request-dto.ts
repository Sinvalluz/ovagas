import { z } from "zod";

export const RegisterUserRequestSchema = z.object({
	name: z
		.string()
		.min(1, "O nome é obrigatório.")
		.min(3, "O nome deve conter mais de 3 caracteres")
		.max(100, "O nome deve conter menos de 100 caracteres"),
	email: z.email("O e-mail é obrigatório").max(100, "O email deve conter menos de 100 caracteres"),
	password: z
		.string()
		.min(6, "A senha deve ter pelo menos 6 caracteres.")
		.max(100, "A senha deve ter no máximo 100 caracteres.")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=~`]).+$/,
			"A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
		),
});

export type RegisterUserRequestDto = z.infer<typeof RegisterUserRequestSchema>;
