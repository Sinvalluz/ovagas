import { api } from "@/lib/api-client";
import type { RegisterUserRequestDto } from "@/server/dto/register-request-dto";

export default function registerRequest(data: RegisterUserRequestDto) {
	return api.post("/auth/register", data);
}
