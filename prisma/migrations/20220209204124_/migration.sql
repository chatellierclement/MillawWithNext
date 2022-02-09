/*
  Warnings:

  - Added the required column `permanence_id` to the `Apply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Apply" ADD COLUMN     "permanence_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Apply" ADD CONSTRAINT "Apply_permanence_id_fkey" FOREIGN KEY ("permanence_id") REFERENCES "Permanence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
