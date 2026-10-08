import { ApiError } from "./api-error";

export class InternalServerError extends ApiError {
	constructor(
		public readonly message: string,
		public readonly code: string = "INTERNAL_ERROR",
	) {
		super(code, 500, message);
	}
}
