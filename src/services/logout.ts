import { api } from "@/lib/api-client";

export async function logout() {
	await api.get("/logout");
}
