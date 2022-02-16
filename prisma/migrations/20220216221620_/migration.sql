/*
  Warnings:

  - Made the column `planning_id` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_planning_id_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "planning_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_planning_id_fkey" FOREIGN KEY ("planning_id") REFERENCES "Planning"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
