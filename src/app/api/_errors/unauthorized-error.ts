import { AppError } from "./app-error";

export default class UnauthorizedError extends AppError {
	constructor(public readonly message: string) {
		super(401, "UNAUTHORIZED", message);
	}
}
