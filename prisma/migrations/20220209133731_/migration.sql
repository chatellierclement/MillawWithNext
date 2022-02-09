/*
  Warnings:

  - Added the required column `typePermanence_id` to the `Permanence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Permanence" ADD COLUMN     "typePermanence_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TypePermanence" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TypePermanence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Permanence" ADD CONSTRAINT "Permanence_typePermanence_id_fkey" FOREIGN KEY ("typePermanence_id") REFERENCES "TypePermanence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
