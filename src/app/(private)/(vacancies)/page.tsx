"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import useCurrentUser from "@/hooks/use-current-user";

export default function Home() {
	const router = useRouter();
	const { isLoading, error, data: user } = useCurrentUser();

	useEffect(() => {
		if (error) {
			router.replace("/login");
		}
	}, [error, router]);

	if (isLoading) {
		return (
			<div className="h-screen flex items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (error) {
		return null;
	}

	return (
		<div>
			<h1>Nome: {user?.data.name}</h1>
			<h1>E-mail: {user?.data.email}</h1>
			<h1>Id: {user?.data.id}</h1>
		</div>
	);
}
