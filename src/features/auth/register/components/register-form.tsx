"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import AuthInputGroup from "../../components/auth-input-group";
import registerRequest from "../services/register-request";
import type RegisterFormData from "../types/register-form-data";
import RegisterFormSchema from "../types/register-form-schema";

export default function RegisterForm() {
	const { handleSubmit, control, reset } = useForm({
		resolver: zodResolver(RegisterFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const registerMutation = useMutation({
		mutationFn: registerRequest,
		onSuccess: () => {
			toast.add({
				title: "Usuário criado com sucesso",
			});
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
			<FieldGroup>
				<AuthInputGroup
					name="name"
					label="Nome de usuário"
					control={control}
					type="text"
					placeholder="Digite seu nome completo"
					maxLength={100}
				/>
				<AuthInputGroup
					name="email"
					label="E-mail"
					control={control}
					type="email"
					placeholder="Digite seu e-mail completo"
					maxLength={100}
				/>
				<AuthInputGroup
					name="password"
					label="Senha"
					control={control}
					type="password"
					placeholder="Crie sua senha"
					maxLength={100}
				/>
				<AuthInputGroup
					name="confirmPassword"
					label="Confirmar senha"
					control={control}
					type="password"
					placeholder="Confirme a senha"
					maxLength={100}
				/>
				<Button
					className={"w-full h-10"}
					type="submit"
				>
					{registerMutation.isPending ? <Spinner /> : "Criar conta"}
				</Button>
				<div className="self-center space-x-2">
					<span className="text-muted-foreground">Já tem uma conta?</span>

					<Link
						href={"auth/login"}
						className="text-primary font-bold hover:text-primary/80"
					>
						Entrar
					</Link>
				</div>
			</FieldGroup>
		</form>
	);
}
