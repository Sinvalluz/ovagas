import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AppInputGroup from "@/components/shared/app-input-group";
import SubmitButton from "@/components/shared/submit-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import type { ErrorResponse } from "@/types/error-response";
import { PostBoard } from "../services/post-board";
import { BoardFormSchema } from "../types/board-form-schema";
import type { BoardFormType } from "../types/board-form-type";

export default function AddNewBoardDialog() {
	const queryClient = useQueryClient();
	const [openModal, setOpenModal] = useState(false);
	const { control, handleSubmit, reset } = useForm({
		resolver: zodResolver(BoardFormSchema),
		defaultValues: { name: "" },
	});

	const boardMutation = useMutation({
		mutationKey: ["board"],
		mutationFn: PostBoard,
		onError: (error: AxiosError<ErrorResponse>) => {
			toast.add({ type: "error", title: error.response?.data.error.message });
		},
		onSuccess: (response) => {
			toast.add({ type: "success", title: response.data.message });
			queryClient.invalidateQueries({ queryKey: ["boards"] });
			setOpenModal(false);
		},
	});

	const onSubmit = (data: BoardFormType) => {
		boardMutation.mutate(data);
		reset();
	};

	return (
		<Dialog
			open={openModal}
			onOpenChange={setOpenModal}
		>
			<DialogTrigger
				render={
					<Button className={"h-10 font-medium"}>
						<Plus />
						Adicionar novo Quadro
					</Button>
				}
			/>
			<DialogContent className={"sm:max-w-md"}>
				<DialogTitle>Criar quadro de vagas</DialogTitle>
				<DialogDescription>
					Crie um novo quadro para organizar e gerenciar suas oportunidades de emprego. Acompanhe as vagas em
					diferentes etapas do processo seletivo.
				</DialogDescription>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FieldGroup className="gap-5">
						<AppInputGroup
							control={control}
							label="Nome"
							maxLength={100}
							name="name"
							placeholder="Digite o nome do quadro"
							type="text"
						/>
						<SubmitButton>{boardMutation.isPending ? <Spinner /> : "Criar novo Quadro"}</SubmitButton>
					</FieldGroup>
				</form>
			</DialogContent>
		</Dialog>
	);
}
