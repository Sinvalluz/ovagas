import { NextResponse } from "next/server";
import type { ErrorResponse } from "@/types/error-response";
import { AppError } from "./app-error";

export function apiError(error: unknown) {
	if (error instanceof AppError) {
		return NextResponse.json(
			{
				error: {
					code: error.code,
					message: error.message,
				},
			},
			{ status: error.status },
		);
	}

	console.error(error);

	return NextResponse.json<ErrorResponse>(
		{
			error: {
				code: "INTERNAL_ERROR",
				message: "Erro interno do Servidor",
			},
		},
		{ status: 500 },
	);
}
