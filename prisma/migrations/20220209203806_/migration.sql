/*
  Warnings:

  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Event` table. All the data in the column will be lost.
  - Added the required column `permanence_id` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "permanence_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Permanence" ADD COLUMN     "permanenceId" INTEGER;

-- CreateTable
CREATE TABLE "Apply" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "isAccepted" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Apply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_permanence_id_fkey" FOREIGN KEY ("permanence_id") REFERENCES "Permanence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permanence" ADD CONSTRAINT "Permanence_permanenceId_fkey" FOREIGN KEY ("permanenceId") REFERENCES "Permanence"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apply" ADD CONSTRAINT "Apply_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
