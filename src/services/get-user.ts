import type { MeResponse } from "@/app/api/_dtos/me-dto";
import { api } from "@/lib/api-client";

export default async function getUser() {
	const MeResponse = await api.get<MeResponse>("/me");
	return MeResponse.data;
}
