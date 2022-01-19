/*
  Warnings:

  - Added the required column `bar_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bar_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bar_id_fkey" FOREIGN KEY ("bar_id") REFERENCES "Bar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
