import { api } from "@/lib/api-client";
import type { UserResponse } from "@/types/user";

export default async function getUser() {
	const userResponse = await api.get<UserResponse>("/me");
	return userResponse.data;
}
