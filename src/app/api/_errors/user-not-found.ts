import { AppError } from "./app-error";

export default class UserNotFound extends AppError {
	constructor() {
		super(404, "USER_NOT_FOUND", "O usuário não foi encontrado.");
	}
}
