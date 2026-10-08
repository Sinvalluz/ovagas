import { z } from "zod";

export const LoginRequestSchema = z.object({
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

export type LoginRequestDto = z.infer<typeof LoginRequestSchema>;

export type loginResponseDto = { message: string };
