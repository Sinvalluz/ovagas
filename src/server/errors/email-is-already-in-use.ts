import { AppError } from "./app-error";

export default class EmailIsAlreadyInUse extends AppError {
	constructor() {
		super(
			409,
			"EMAIL_IS_ALREADY_IN_USE",
			"Este e-mail já está cadastrado. Tente usar outro e-mail ou faça login com este endereço.",
		);
	}
}
