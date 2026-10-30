import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const boards = Array.from({ length: 100 }, (_, i) => {
	const year = new Date().getFullYear();
	const createdAt = new Date(year, 0, 1 + i);
	const updatedAt = new Date(createdAt.getTime() + 1000 * 60 * 60 * 24);

	return { name: `Quadro ${i + 1}`, createdAt, updatedAt };
});

async function main() {
	const user = await prisma.user.findUnique({ where: { email: process.env.EMAIL_SEED } });

	if (!user) {
		throw new Error("Usuário não encontrado");
	}

	await prisma.board.createMany({
		data: boards.map((board) => {
			return { name: board.name, userId: user.id, createdAt: board.createdAt, updatedAt: board.updatedAt };
		}),
	});

	console.log("O Seed de quadros foi aplicado com sucesso");
}

main()
	.then(async () => {
		await prisma.$disconnect();
		await pool.end();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		await pool.end();
		process.exit(1);
	});
