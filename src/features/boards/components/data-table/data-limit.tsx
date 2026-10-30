import type { Dispatch, SetStateAction } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type DataLimitProps = { tableName: string; limitRows: number; setLimitRows: Dispatch<SetStateAction<number>> };

export default function DataLimit({ limitRows, setLimitRows, tableName }: DataLimitProps) {
	const defaultLimitRows = 10;
	return (
		<div className="flex items-center gap-2">
			<p>Mostrar</p>
			<Select>
				<SelectTrigger>
					<SelectValue placeholder={limitRows} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{Array.from({ length: 5 }, (_, i) => {
							const value = defaultLimitRows * (i + 1);

							return (
								<SelectItem
									value={value}
									key={value}
									onClick={() => setLimitRows(value)}
								>
									{value}
								</SelectItem>
							);
						})}
					</SelectGroup>
				</SelectContent>
			</Select>
			<p>{tableName} por página</p>
		</div>
	);
}
