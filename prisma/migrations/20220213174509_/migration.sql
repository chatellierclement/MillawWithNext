-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_permanence_id_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "isDayOff" BOOLEAN,
ALTER COLUMN "permanence_id" DROP NOT NULL,
ALTER COLUMN "planning_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_permanence_id_fkey" FOREIGN KEY ("permanence_id") REFERENCES "Permanence"("id") ON DELETE SET NULL ON UPDATE CASCADE;
