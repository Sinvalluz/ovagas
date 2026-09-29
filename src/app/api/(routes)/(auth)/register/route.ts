import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { apiError } from "@/app/api/_errors/api-error";
import { env } from "@/config/env";
import { RegisterUserRequestSchema } from "./dto/register-request-dto";
import registerService from "./register-service";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const cookieStore = await cookies();

		const result = RegisterUserRequestSchema.safeParse(body);

		if (!result.success) {
			return Response.json({ message: result.error }, { status: 400 });
		}

		const session = await registerService(result.data);

		cookieStore.set("access_token", session.access_token, {
			httpOnly: true,
			sameSite: "lax",
			secure: env.NEXT_PUBLIC_NODE_ENV === "production",
			path: "/",
		});
		cookieStore.set("refresh_token", session.refresh_token, {
			httpOnly: true,
			sameSite: "lax",
			secure: env.NEXT_PUBLIC_NODE_ENV === "production",
			path: "/",
		});

		return Response.json({ message: "Usuário criado com sucesso" }, { status: 201 });
	} catch (error) {
		return apiError(error);
	}
}
