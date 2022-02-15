/*
  Warnings:

  - You are about to drop the column `isApplyAhtorized` on the `Bar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bar" DROP COLUMN "isApplyAhtorized",
ADD COLUMN     "isApplyAuthorized" BOOLEAN NOT NULL DEFAULT true;
