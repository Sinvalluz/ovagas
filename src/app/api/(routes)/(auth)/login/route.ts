import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { apiError } from "@/app/api/_errors/api-error";
import { env } from "@/config/env";
import { LoginRequestSchema } from "./dto/login-request-dto";
import type { loginResponseDto } from "./dto/login-response.dto";
import loginService from "./login-service";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const cookieStore = await cookies();

		const result = LoginRequestSchema.safeParse(body);

		if (!result.success) {
			return Response.json({ message: result.error }, { status: 400 });
		}

		const session = await loginService(result.data);

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

		return NextResponse.json<loginResponseDto>({ message: "Usuário autenticado com sucesso" }, { status: 201 });
	} catch (error) {
		return apiError(error);
	}
}
