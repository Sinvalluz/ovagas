import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { env } from "@/config/env";
import { RegisterUserRequestSchema } from "@/server/dto/register-request-dto";
import { apiError } from "@/server/errors/api-error";
import registerUser from "@/server/services/register-user-service";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const cookieStore = await cookies();

		const result = RegisterUserRequestSchema.safeParse(body);

		if (!result.success) {
			return Response.json({ message: result.error }, { status: 400 });
		}

		const session = await registerUser(result.data);

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
