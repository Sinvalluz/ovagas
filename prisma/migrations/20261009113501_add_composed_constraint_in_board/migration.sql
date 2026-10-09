/*
  Warnings:

  - A unique constraint covering the columns `[name,user_id]` on the table `boards` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "boards_name_user_id_key" ON "boards"("name", "user_id");
