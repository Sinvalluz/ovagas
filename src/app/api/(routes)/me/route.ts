import { NextResponse } from "next/server";
import type { UserResponse } from "@/types/user";
import { apiError } from "../../_errors/api-error";
import { getAuthenticatedUser } from "../../_guards/get-authenticated-user";
import { getUser } from "../../_services/user-service";

export async function GET() {
	try {
		const authenticatedUser = await getAuthenticatedUser();

		const user = await getUser(authenticatedUser.id);

		return NextResponse.json<UserResponse>(user, { status: 200 });
	} catch (error) {
		return apiError(error);
	}
}
