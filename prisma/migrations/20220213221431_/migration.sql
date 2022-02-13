-- AlterTable
ALTER TABLE "Apply" ALTER COLUMN "isAccepted" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Exchange" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "user_id_sender" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id_recipient" INTEGER NOT NULL,
    "isAccepted" BOOLEAN,
    "exchangeReference" INTEGER,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exchange_exchangeReference_key" ON "Exchange"("exchangeReference");

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_exchangeReference_fkey" FOREIGN KEY ("exchangeReference") REFERENCES "Exchange"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_user_id_sender_fkey" FOREIGN KEY ("user_id_sender") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_user_id_recipient_fkey" FOREIGN KEY ("user_id_recipient") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
