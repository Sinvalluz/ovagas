"use client";

import { cn } from "cn";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/shared/header";
import Main from "@/components/shared/main";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import AddNewBoardDialog from "@/features/boards/components/add-new-board-dialog";
import DataBoardTable from "@/features/boards/components/data-table";
import useCurrentUser from "@/hooks/use-current-user";

export default function Home() {
	const router = useRouter();
	const { isLoading, isError, data: user } = useCurrentUser();
	const [inputWidth, setInputWidth] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");

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

	if (isError || !user) {
		return null;
	}

	return (
		<div className="h-dvh flex flex-col">
			<Header
				username={user.name}
				imgUrl={user.imgUrl}
			/>
			<Main>
				<div className="flex flex-col gap-2 justify-between lg:flex-row">
					<h1 className="text-2xl font-bold">Quadros</h1>
					<div className="flex gap-2 flex-col lg:flex-row">
						<InputGroup className="w-full lg:max-w-lg lg:w-auto">
							<InputGroupInput
								placeholder="Pesquisar..."
								onFocus={() => setInputWidth(true)}
								onBlur={() => setInputWidth(false)}
								type="text"
								value={search}
								onChange={(e) => {
									setSearch(e.target.value);
								}}
								className={cn(
									"transition-all duration-300 ease-in ",
									inputWidth ? "lg:w-100" : "lg:w-full",
								)}
							/>
							<InputGroupAddon>
								<Search />
							</InputGroupAddon>

							{search && (
								<InputGroupAddon
									align={"inline-end"}
									className="cursor-pointer"
									onClick={() => setSearch("")}
								>
									<X />
								</InputGroupAddon>
							)}
						</InputGroup>
						<AddNewBoardDialog />
					</div>
				</div>

				<DataBoardTable search={search} />
			</Main>
		</div>
	);
}
