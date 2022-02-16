/*
  Warnings:

  - You are about to drop the column `permanence_id` on the `Event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_permanence_id_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "permanence_id";

-- CreateTable
CREATE TABLE "Planning" (
    "id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "permanenceId" INTEGER,

    CONSTRAINT "Planning_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_planning_id_fkey" FOREIGN KEY ("planning_id") REFERENCES "Planning"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planning" ADD CONSTRAINT "Planning_permanenceId_fkey" FOREIGN KEY ("permanenceId") REFERENCES "Permanence"("id") ON DELETE SET NULL ON UPDATE CASCADE;
