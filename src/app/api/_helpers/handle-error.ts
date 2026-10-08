import { NextResponse } from "next/server";
import { ApiError } from "../_erros/api-error";

export function handleError(error: unknown, fallbackMessage: string) {
	if (error instanceof ApiError) {
		return NextResponse.json({ error: { code: error.code, message: error.message } }, { status: error.status });
	}

	console.log(error);

	return NextResponse.json({ error: { code: "INTERNAL_ERROR", message: fallbackMessage } }, { status: 500 });
}
