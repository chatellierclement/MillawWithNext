/*
  Warnings:

  - Added the required column `planning_id` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "planning_id" TEXT NOT NULL;
