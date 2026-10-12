import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string(),
		DIRECT_URL: z.string(),
		PROJECT_URL: z.string(),
		SECRET_KEY: z.string(),
		NODE_ENV: z.enum(["development", "production", "test"]),
	},
	client: { NEXT_PUBLIC_API_URL: z.url() },
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		DIRECT_URL: process.env.DIRECT_URL,
		PROJECT_URL: process.env.PROJECT_URL,
		SECRET_KEY: process.env.SECRET_KEY,
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
});
