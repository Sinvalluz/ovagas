import { AppError } from "./app-error";

export default class InternalServerError extends AppError {
	constructor() {
		super(500, "INTERNAL_ERROR", "Error interno do servidor");
	}
}
