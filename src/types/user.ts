type Role = "USER" | "ADMIN";

type User = {
	name: string;
	id: string;
	email: string;
	role: Role;
	imgUrl: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type { User };
