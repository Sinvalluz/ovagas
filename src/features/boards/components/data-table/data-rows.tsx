import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { capitalizedWord } from "@/utils/capitalized-word";
import DeleteBoardDialog from "./delete-board-dialog";

type DataRowsProps = { data: { name: string; id: string; userId: string; createdAt: string; updatedAt: string }[] };

export default function DataRows({ data }: DataRowsProps) {
	return data.map((board) => (
		<TableRow
			key={board.name}
			className="h-14"
		>
			<TableCell className="w-75">{capitalizedWord(board.name)}</TableCell>
			<TableCell>{new Date(board.updatedAt).toLocaleDateString("pt-BR")}</TableCell>
			<TableCell>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button
								variant="ghost"
								size="icon"
								className="size-8"
							>
								<MoreHorizontalIcon />
							</Button>
						}
					/>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>Editar</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DeleteBoardDialog id={board.id} />
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	));
}
