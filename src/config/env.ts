import z from "zod";

const EnvSchema = z.object({
	DATABASE_URL: z.string(),
	DIRECT_URL: z.string(),
	PROJECT_URL: z.string(),
	SECRET_KEY: z.string(),
	API_URL: z.string(),
	NODE_ENV: z.enum(["development", "production", "test"]),
});

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error("Variáveis de ambiente inválidas", parsedEnv.error.issues);

	throw new Error("Variáveis de ambiente inválidas");
}

export const env = parsedEnv.data;
