import { api } from "@/lib/api-client";

export default async function deleteBoard(id: string) {
	await api.delete(`/board/${id}`);
}
