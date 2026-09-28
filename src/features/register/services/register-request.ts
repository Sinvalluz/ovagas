import type { RegisterUserRequestDto } from "@/app/api/(auth)/register/dto/register-request-dto";
import type { RegisterUserResponseDto } from "@/app/api/(auth)/register/dto/register-response.dto";
import { api } from "@/lib/api-client";

export default function registerRequest(data: RegisterUserRequestDto) {
	return api.post<RegisterUserResponseDto>("/register", data);
}
