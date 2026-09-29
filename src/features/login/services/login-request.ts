import type { LoginRequestDto } from "@/app/api/(routes)/(auth)/login/dto/login-request-dto";
import type { loginResponseDto } from "@/app/api/(routes)/(auth)/login/dto/login-response.dto";
import { api } from "@/lib/api-client";

export default function loginRequest(data: LoginRequestDto) {
	return api.post<loginResponseDto>("/login", data);
}
