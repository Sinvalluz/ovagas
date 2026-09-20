import z from "zod";
import "dotenv/config";
import { pt } from "zod/locales";

z.config(pt());

const EnvSchema = z.object({
	DATABASE_URL: z.string(),
	DIRECT_URL: z.string(),
	PROJECT_URL: z.string(),
	PUBLISHABLE_KEY: z.string(),
});

export const env = EnvSchema.parse(process.env);
