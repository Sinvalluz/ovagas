import { AppError } from "./app-error";

export default class InvalidCredentialsError extends AppError {
	constructor() {
		super(401, "INVALID_CREDENTIALS", "E-mail ou senha inválidos. Verifique suas credenciais e tente novamente.");
	}
}
