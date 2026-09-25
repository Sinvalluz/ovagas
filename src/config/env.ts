import z from "zod";
import { pt } from "zod/locales";

z.config(pt());

const EnvSchema = z.object({
	NEXT_PUBLIC_DATABASE_URL: z.string(),
	NEXT_PUBLIC_DIRECT_URL: z.string(),
	NEXT_PUBLIC_PROJECT_URL: z.string(),
	NEXT_PUBLIC_PUBLISHABLE_KEY: z.string(),
	NEXT_PUBLIC_API_URL: z.string(),
	NEXT_PUBLIC_NODE_ENV: z.enum(["development", "production", "test"]),
});

const processEnv = {
	NEXT_PUBLIC_DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
	NEXT_PUBLIC_DIRECT_URL: process.env.NEXT_PUBLIC_DIRECT_URL,
	NEXT_PUBLIC_PROJECT_URL: process.env.NEXT_PUBLIC_PROJECT_URL,
	NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
	NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
};

const parsedEnv = EnvSchema.safeParse(processEnv);

if (!parsedEnv.success) {
	console.error("Variáveis de ambiente inválidas", parsedEnv.error.issues);

	throw new Error("Variáveis de ambiente inválidas");
}

export const env = parsedEnv.data;
