import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import type { ErrorResponse } from "@/types/error-response";
import deleteBoard from "../../services/delete-board";

type DeleteBoardDialogProps = { id: string };

export default function DeleteBoardDialog({ id }: DeleteBoardDialogProps) {
	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: () => deleteBoard(id),
		onSuccess: () => {
			toast.add({ type: "success", title: "Quadro deletado com sucesso" });
			queryClient.invalidateQueries({ queryKey: ["boards"] });
		},
		onError: (error: AxiosError<ErrorResponse>) => {
			toast.add({ type: "error", title: error.response?.data.error.message });
		},
	});

	return (
		<AlertDialog>
			<AlertDialogTrigger
				render={
					<Button
						variant="destructive"
						className={"w-full justify-start"}
					>
						Remover
					</Button>
				}
			/>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
					<AlertDialogDescription>
						Esta ação não pode ser desfeita. O quadro será excluído permanentemente, incluindo todo o seu
						conteúdo.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						variant={"destructive"}
						onClick={() => deleteMutation.mutate()}
					>
						{deleteMutation.isPending ? <Spinner /> : "Deletar"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
