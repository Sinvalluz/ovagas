import { ApiError } from "./api-error";

export class ConflictError extends ApiError {
	constructor(
		public readonly message: string,
		public readonly code: string = "CONFLICT",
	) {
		super(code, 409, message);
	}
}
