import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type HeaderProps = {
	username: string;
	imgUrl: string | null;
};

export default function Header({ username, imgUrl }: HeaderProps) {
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
			<div className="flex items-center gap-2">
				<span className="leading-none font-semibold select-none whitespace-nowrap">{username}</span>
				<Avatar>
					{imgUrl ? <AvatarImage src={imgUrl} /> : <AvatarFallback>{username?.at(0)}</AvatarFallback>}
				</Avatar>
			</div>
		</header>
	);
}
