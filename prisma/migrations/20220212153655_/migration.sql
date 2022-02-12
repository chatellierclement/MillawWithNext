/*
  Warnings:

  - You are about to drop the `API` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "API" DROP CONSTRAINT "API_bar_id_fkey";

-- DropTable
DROP TABLE "API";

-- CreateTable
CREATE TABLE "Api" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "bar_id" INTEGER NOT NULL,

    CONSTRAINT "Api_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Api_bar_id_key" ON "Api"("bar_id");

-- AddForeignKey
ALTER TABLE "Api" ADD CONSTRAINT "Api_bar_id_fkey" FOREIGN KEY ("bar_id") REFERENCES "Bar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
