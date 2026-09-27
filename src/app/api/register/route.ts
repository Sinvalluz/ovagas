import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { env } from "@/config/env";
import { RegisterUserRequestSchema } from "@/server/dto/register-request-dto";
import { registerUser } from "@/server/services/auth-service";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const cookieStore = await cookies();

	const result = RegisterUserRequestSchema.safeParse(body);

	if (!result.success) {
		return Response.json({ message: result.error }, { status: 400 });
	}

	const { data, error } = await registerUser(result.data);

	if (error) {
		return Response.json({ message: error.message }, { status: error.errorStatus });
	}

	if (!data.session) {
		return Response.json({ message: "Erro interno do servidor" }, { status: 500 });
	}

	cookieStore.set("access_token", data.session.access_token, {
		httpOnly: true,
		sameSite: "lax",
		secure: env.NEXT_PUBLIC_NODE_ENV === "production",
		path: "/",
	});
	cookieStore.set("refresh_token", data.session.refresh_token, {
		httpOnly: true,
		sameSite: "lax",
		secure: env.NEXT_PUBLIC_NODE_ENV === "production",
		path: "/",
	});

	return Response.json({ message: "Usuário criado com sucesso" }, { status: 201 });
}
