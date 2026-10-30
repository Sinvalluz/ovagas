import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

type PaginationProps = {
	lastPage: number;
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
	previousPage: number | null;
	nextPage: number | null;
};

export default function Pagination({ lastPage, page, setPage, previousPage, nextPage }: PaginationProps) {
	const getPages = () => {
		if (lastPage <= 6) {
			return Array.from({ length: lastPage }, (_, i) => i + 1);
		}

		if (page <= 4) {
			return [1, 2, 3, 4, 5, "...", lastPage];
		}

		if (page >= lastPage - 4) {
			return [1, "...", ...Array.from({ length: 5 }, (_, i) => lastPage - 4 + i)];
		}

		return [1, "...", page - 1, page, page + 1, "...", lastPage];
	};

	console.log(getPages());
	console.log(page);

	return (
		<div className="flex p-1 gap-1">
			<Button
				variant={"ghost"}
				onClick={() => setPage(previousPage ? previousPage : page)}
			>
				<ChevronLeft />
			</Button>
			{getPages().map((value, index) =>
				value === "..." ? (
					<Button
						// biome-ignore lint/suspicious/noArrayIndexKey: <not applicable>
						key={`ellipsis-${index}`}
						variant={"outline"}
					>
						...
					</Button>
				) : (
					<Button
						key={value}
						variant={page === value ? "default" : "outline"}
						onClick={() => setPage(value as number)}
					>
						{value}
					</Button>
				),
			)}

			<Button
				variant={"ghost"}
				onClick={() => setPage(nextPage ? nextPage : lastPage)}
			>
				<ChevronRight />
			</Button>
		</div>
	);
}
