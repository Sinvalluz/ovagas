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
import registerRequest from "../services/register-request";
import type RegisterFormData from "../types/register-form-data";
import RegisterFormSchema from "../types/register-form-schema";

export default function RegisterForm() {
	const router = useRouter();
	const { handleSubmit, control, reset } = useForm({
		resolver: zodResolver(RegisterFormSchema),
		defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
	});

	const registerMutation = useMutation({
		mutationFn: registerRequest,
		onError: (error: AxiosError<ErrorResponse>) => {
			toast.add({ type: "error", title: error.response?.data.error.message });
		},
		onSuccess: () => {
			router.push("/");
		},
	});

	const onSubmit = (data: RegisterFormData) => {
		registerMutation.mutate({ email: data.email, name: data.name, password: data.password });
		reset();
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col"
		>
			<FieldGroup className="gap-3">
				<AppInputGroup
					name="name"
					label="Nome de usuário"
					control={control}
					type="text"
					placeholder="Digite seu nome completo"
					maxLength={100}
				/>
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
				<AppInputGroup
					name="confirmPassword"
					label="Confirmar senha"
					control={control}
					type="password"
					placeholder="Confirme a senha"
					maxLength={100}
				/>
				<Button
					className={"w-full h-14"}
					type="submit"
				>
					{registerMutation.isPending ? <Spinner /> : "Criar conta"}
				</Button>
				<div className="self-center space-x-2">
					<span className="text-muted-foreground">Já tem uma conta?</span>

					<Link
						href={"/login"}
						className="text-primary font-bold hover:text-primary/80"
					>
						Entrar
					</Link>
				</div>
			</FieldGroup>
		</form>
	);
}
