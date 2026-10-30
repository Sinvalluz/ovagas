import { Button } from "../ui/button";

export default function SubmitButton({ children }: { children: React.ReactNode }) {
	return (
		<Button
			className={"w-full h-14"}
			type="submit"
		>
			{children}
		</Button>
	);
}
