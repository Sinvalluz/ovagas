import { AppError } from "./app-error";

export default class SupabaseAuthError extends AppError {
	constructor(
		public readonly status: number,
		public readonly code: string,
		public readonly message: string,
	) {
		super(status, code, message);
	}
}
