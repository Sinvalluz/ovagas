type Role = "USER" | "ADMIN";

export type MeResponse = {
	name: string;
	id: string;
	email: string;
	role: Role;
	imgUrl: string | null;
	createdAt: Date;
	updatedAt: Date;
};
