import { api } from "@/lib/api-client";
import type { UserResponse } from "@/types/user";

export default function getUser() {
	return api.get<UserResponse>("/me");
}
