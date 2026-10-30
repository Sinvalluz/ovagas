export type GetBoardsResponse = {
	boards: { name: string; id: string; userId: string; createdAt: string; updatedAt: string }[];
	pagination: {
		path: string;
		page: number;
		count: number;
		previousPage: number | null;
		nextPage: number | null;
		lastPage: number;
	};
};
