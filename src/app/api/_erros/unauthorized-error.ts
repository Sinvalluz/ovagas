import { ApiError } from "./api-error";

export class UnauthorizedError extends ApiError {
	constructor(
		public readonly message: string,
		public readonly code: string = "UNAUTHORIZED",
	) {
		super(code, 401, message);
	}
}
