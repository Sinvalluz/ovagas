import { AppError } from "./app-error";

export default class SupabaseAuthError extends AppError {
	constructor() {
		super(500, "SUPABASE_AUTH_ERROR", "Falha na autenticação via Supabase");
	}
}
