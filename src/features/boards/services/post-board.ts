import { api } from "@/lib/api-client";
import type { BoardFormType } from "../types/board-form-type";

export async function PostBoard(data: BoardFormType) {
	return await api.post<{ message: string }>("/board", data);
}
