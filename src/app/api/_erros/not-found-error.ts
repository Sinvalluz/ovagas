import { ApiError } from "./api-error";

export class NotFoundError extends ApiError {
	constructor(public readonly message: string) {
		super("NOT_FOUND", 404, message);
	}
}
