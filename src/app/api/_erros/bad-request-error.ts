import { ApiError } from "./api-error";

export class BadRequestError extends ApiError {
	constructor(
		public readonly message: string,
		public readonly code: string = "BAD_REQUEST",
	) {
		super(code, 400, message);
	}
}
