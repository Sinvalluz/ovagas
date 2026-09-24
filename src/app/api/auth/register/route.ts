import type { NextRequest } from "next/server";
import { RegisterUserRequestSchema } from "@/server/dto/register-request-dto";
import { registerUser } from "@/server/services/auth-service";

export async function POST(request: NextRequest) {
	const body = await request.json();

	const result = RegisterUserRequestSchema.safeParse(body);

	if (!result.success) {
		return Response.json({ message: result.error }, { status: 400 });
	}

	const { data, error } = await registerUser(result.data);

	if (error) {
		return Response.json({ message: error.message }, { status: error.errorStatus });
	}

	return Response.json(data.user, { status: 201 });
}
