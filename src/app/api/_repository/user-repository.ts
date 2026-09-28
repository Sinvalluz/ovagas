import { prisma } from "@/lib/prisma";
import type { User } from "@/types/user";

async function create(user: User) {
	return await prisma.user.create({ data: user });
}

async function findByEmail(email: string) {
	return await prisma.user.findUnique({ where: { email } });
}

export { create, findByEmail };
