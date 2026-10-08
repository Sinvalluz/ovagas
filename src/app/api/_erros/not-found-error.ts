import { ApiError } from "./api-error";

export class NotFoundError extends ApiError {
	constructor(
		public readonly message: string,
		public readonly code: string = "NOT_FOUND",
	) {
		super(code, 404, message);
	}
}
