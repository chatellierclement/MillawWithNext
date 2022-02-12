-- CreateTable
CREATE TABLE "API" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "bar_id" INTEGER NOT NULL,

    CONSTRAINT "API_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "API" ADD CONSTRAINT "API_bar_id_fkey" FOREIGN KEY ("bar_id") REFERENCES "Bar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
