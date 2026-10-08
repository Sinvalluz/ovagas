import type { RegisterUserRequestDto, RegisterUserResponseDto } from "@/app/api/_dtos/register-dto";
import { api } from "@/lib/api-client";

export default function registerRequest(data: RegisterUserRequestDto) {
	return api.post<RegisterUserResponseDto>("/register", data);
}
