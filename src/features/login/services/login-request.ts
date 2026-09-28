import { api } from "@/lib/api-client";
import type { LoginRequest } from "../types/login-request";

export default function loginRequest(data: LoginRequest) {
	return api.post("/login", data);
}
