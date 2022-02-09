-- CreateTable
CREATE TABLE "CommissionOffice" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "Sexe" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "BirthdayDate" TIMESTAMP(3) NOT NULL,
    "City" TEXT NOT NULL,
    "PostalCode" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "permanence_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "CommissionOffice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommissionOffice" ADD CONSTRAINT "CommissionOffice_permanence_id_fkey" FOREIGN KEY ("permanence_id") REFERENCES "Permanence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionOffice" ADD CONSTRAINT "CommissionOffice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
