import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "@/services/logout";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type HeaderProps = { username: string; imgUrl: string | null };

export default function Header({ username, imgUrl }: HeaderProps) {
	const queryClient = useQueryClient();
	const router = useRouter();
	return (
		<header className="flex px-4 h-18 items-center justify-between border-b overflow-hidden">
			<Image
				src={"/logo.svg"}
				alt="Logo"
				width={100}
				height={40}
				loading="eager"
				className="select-none w-25 h-10"
			/>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<div className="flex items-center gap-2">
						<span className="leading-none font-semibold select-none whitespace-nowrap">{username}</span>
						<Avatar>
							{imgUrl ? <AvatarImage src={imgUrl} /> : <AvatarFallback>{username?.at(0)}</AvatarFallback>}
						</Avatar>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className={"mt-2"}
					align="end"
				>
					<DropdownMenuGroup>
						<DropdownMenuItem
							onClick={async () => {
								await logout();
								queryClient.clear();
								router.refresh();
							}}
						>
							Sair
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
}
