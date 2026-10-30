"use-client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";
import getBoards from "../../services/get-boards";
import DataLimit from "./data-limit";
import DataRows from "./data-rows";
import EmptyTable from "./empty-table";
import LoadingRows from "./loading-rows";
import Pagination from "./pagination";

type DataBoardTableProps = { search: string };

export default function DataBoardTable({ search }: DataBoardTableProps) {
	const [limitRows, setLimitRows] = useState<number>(10);
	const [page, setPage] = useState<number>(1);

	const { data, isLoading } = useQuery({
		queryKey: ["boards", { limit: limitRows, page }],
		queryFn: () => {
			return getBoards({ limit: limitRows, page });
		},
		retry: false,
	});

	const lowerSearch = search.toLowerCase();

	const filteredData = data?.boards.filter((board) => board.name.toLowerCase().includes(lowerSearch));

	return (
		<div className="flex min-h-0 flex-1 flex-col gap-5">
			<Table>
				<TableHeader className="bg-background sticky top-0 z-10">
					<TableRow>
						<TableHead>Nome</TableHead>
						<TableHead>Data de atualização</TableHead>
						<TableHead className="w-10">Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isLoading ? (
						<LoadingRows />
					) : !filteredData?.length ? (
						<TableRow className="hover:bg-transparent">
							<TableCell
								colSpan={3}
								className="p-0"
							>
								<EmptyTable />
							</TableCell>
						</TableRow>
					) : (
						<DataRows data={filteredData} />
					)}
				</TableBody>
			</Table>

			<div className="flex shrink-0 flex-col gap-2 md:flex-row items-center justify-between overflow-x-hidden">
				{isLoading ? (
					<>
						<Skeleton className="w-68.25 h-8" />
						<Skeleton className="w-83.5 h-10" />
					</>
				) : (
					data?.pagination && (
						<>
							<DataLimit
								tableName={"Quadros"}
								limitRows={limitRows}
								setLimitRows={setLimitRows}
							/>
							<Pagination
								setPage={setPage}
								page={data.pagination.page}
								lastPage={data.pagination.lastPage}
								previousPage={data.pagination.previousPage}
								nextPage={data.pagination.nextPage}
							/>
						</>
					)
				)}
			</div>
		</div>
	);
}
