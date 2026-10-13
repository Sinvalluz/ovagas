import Image from "next/image";
import LoginForm from "@/features/auth/login/components/login-form";

export default function Login() {
	return (
		<div className="flex h-dvh justify-center items-center p-4 md:p-2">
			<div className="h-full hidden md:block w-[40%] relative">
				<Image
					src={"/login-background.png"}
					alt="Logo"
					width={3677}
					height={5516}
					loading="eager"
					className="text-foreground mb-8 h-full object-cover rounded-lg absolute z-0"
				/>
			</div>
			<div className="flex justify-center items-center w-full md:w-[60%] p-0 md:p-8">
				<div className="w-full max-w-md flex flex-col gap-12">
					<Image
						src={"/logo.svg"}
						alt="Logo"
						width={571}
						height={140}
						loading="eager"
						className="text-foreground w-40 h-10"
					/>
					<div className="space-y-2">
						<h1 className="text-4xl font-bold">Entrar</h1>
						<p className="text-lg text-muted-foreground">
							Bem-vindo de volta! Por favor, insira seus dados.
						</p>
					</div>
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
