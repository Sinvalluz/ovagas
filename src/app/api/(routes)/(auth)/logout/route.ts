import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiError } from "@/app/api/_errors/api-error";
import { getAuthenticatedUser } from "@/app/api/_guards/get-authenticated-user";
import logoutService from "./logout-service";

export async function GET() {
	try {
		const cookieStore = await cookies();
		await getAuthenticatedUser();
		await logoutService();

		cookieStore.delete("access_token");
		cookieStore.delete("refresh_token");

		return NextResponse.json({ message: "Sessão removida com sucesso" }, { status: 200 });
	} catch (error) {
		return apiError(error);
	}
}
