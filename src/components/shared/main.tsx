export default function Main({ children }: { children: React.ReactNode }) {
	return <main className="flex-1 min-h-0 p-8 flex flex-col gap-4">{children}</main>;
}
