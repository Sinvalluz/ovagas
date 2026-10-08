-- AlterTable
ALTER TABLE "boards" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "job_vacancies" ALTER COLUMN "created_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" DROP DEFAULT;
