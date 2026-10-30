import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export default function LoadingRows() {
	return Array.from({ length: 11 }, (_, i) => (
		<TableRow
			className="h-14"
			// biome-ignore lint/suspicious/noArrayIndexKey: <not applicable>
			key={i}
		>
			<TableCell>
				<Skeleton className="h-5 w-full " />
			</TableCell>
			<TableCell>
				<Skeleton className="h-5 w-full " />
			</TableCell>
			<TableCell>
				<Skeleton className="h-8 w-full" />
			</TableCell>
		</TableRow>
	));
}
