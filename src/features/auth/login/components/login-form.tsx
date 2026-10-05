"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import AppInputGroup from "@/components/shared/app-input-group";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import type { ErrorResponse } from "@/types/error-response";
import LoginRequest from "../services/login-request";
import type { LoginFormData } from "../types/login-form-data";
import { LoginFormSchema } from "../types/login-form-schema";

export default function LoginForm() {
	const router = useRouter();
	const { handleSubmit, control, reset } = useForm({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: { email: "", password: "" },
	});
	const loginMutation = useMutation({
		mutationFn: LoginRequest,
		onError: (error: AxiosError<ErrorResponse>) => {
			toast.add({ type: "error", title: error.response?.data.error.message });
		},
		onSuccess: () => {
			router.push("/");
		},
	});

	const onSubmit = (data: LoginFormData) => {
		loginMutation.mutate(data);
		reset();
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col"
		>
			<FieldGroup className="gap-3">
				<AppInputGroup
					name="email"
					label="E-mail"
					control={control}
					type="email"
					placeholder="Digite seu e-mail completo"
					maxLength={100}
				/>
				<AppInputGroup
					name="password"
					label="Senha"
					control={control}
					type="password"
					placeholder="Crie sua senha"
					maxLength={100}
				/>

				<Button
					className={"w-full h-14"}
					type="submit"
				>
					{loginMutation.isPending ? <Spinner /> : "Entrar"}
				</Button>
				<div className="self-center space-x-2">
					<span className="text-muted-foreground">Não tem uma conta?</span>

					<Link
						href={"/register"}
						className="text-primary font-bold hover:text-primary/80"
					>
						Inscrever-se
					</Link>
				</div>
			</FieldGroup>
		</form>
	);
}
