"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/header";
import { Spinner } from "@/components/ui/spinner";
import useCurrentUser from "@/hooks/use-current-user";

export default function Home() {
	const router = useRouter();
	const { isLoading, isError, data: user } = useCurrentUser();

	useEffect(() => {
		if (isError) {
			router.replace("/login");
		}
	}, [isError, router]);

	if (isLoading) {
		return (
			<div className="h-screen flex items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (!user) return;

	return (
		<div className="min-h-dvh">
			<Header
				username={user.name}
				imgUrl={user.imgUrl}
			/>
		</div>
	);
}
