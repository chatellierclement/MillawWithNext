/*
  Warnings:

  - You are about to drop the column `permanenceId` on the `Permanence` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Permanence" DROP CONSTRAINT "Permanence_permanenceId_fkey";

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Permanence" DROP COLUMN "permanenceId";
