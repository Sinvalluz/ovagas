import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/features/auth/register/components/register-form";

export default function Register() {
	return (
		<div className="flex h-full justify-center items-center p-2">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-4xl font-bold">Crie sua conta!</CardTitle>
					<CardDescription className="text-lg">
						Crie sua conta e gerencie suas vagas de emprego de forma simples e eficiente.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<RegisterForm />
				</CardContent>
			</Card>
		</div>
	);
}
