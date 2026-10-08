import { ApiError } from "./api-error";

export class UnauthorizedError extends ApiError {
	constructor(public readonly message: string) {
		super("UNAUTHORIZED", 401, message);
	}
}
