import { api } from "@/lib/api-client";
import type { RegisterUserRequestDto } from "@/server/dto/register-request-dto";
import type { RegisterUserResponseDto } from "@/server/dto/register-response.dto";

export default function registerRequest(data: RegisterUserRequestDto) {
	return api.post<RegisterUserResponseDto>("/register", data);
}
