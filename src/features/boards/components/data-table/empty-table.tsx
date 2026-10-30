import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmptyImage from "@/components/ui/empty-image";

export default function EmptyTable() {
	return (
		<div className="flex items-center pt-30 flex-col justify-center gap-4">
			<EmptyImage className="w-30 h-auto" />
			<h3 className="font-base text-lg">Nenhum quadro encontrado</h3>
			<Button className={"h-10 font-medium"}>
				<Plus />
				Adicionar novo Quadro
			</Button>
		</div>
	);
}
