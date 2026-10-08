import type { LoginRequestDto, loginResponseDto } from "@/app/api/_dtos/login-dto";
import { api } from "@/lib/api-client";

export default function loginRequest(data: LoginRequestDto) {
	return api.post<loginResponseDto>("/login", data);
}
