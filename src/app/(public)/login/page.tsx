import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/features/login/components/login-form";

export default function Login() {
	return (
		<div className="flex min-h-dvh justify-center items-center p-2">
			<Card className="w-full max-w-md">
				<CardHeader>
					<Image
						src={"/logo.svg"}
						alt="Logo"
						width={160}
						height={40}
						loading="eager"
						className="text-foreground mb-8 w-40 h-10"
					/>
					<CardTitle className="text-4xl font-bold">Bem vindo de volta!</CardTitle>
					<CardDescription className="text-lg">
						Bem-vindo de volta! Por favor, insira seus dados.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	);
}
