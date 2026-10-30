import { api } from "@/lib/api-client";
import type { GetBoardsResponse } from "../types/get-boards-response";

type BoardParams = { page: number; limit: number };

export default async function getBoards(params: BoardParams) {
	const response = await api.get<GetBoardsResponse>("/board", { params });
	return response.data;
}
