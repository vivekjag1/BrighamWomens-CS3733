-- AlterEnum
ALTER TYPE "ServiceType" ADD VALUE 'GiftDelivery';

-- CreateTable
CREATE TABLE "GiftDelivery" (
    "giftID" INTEGER NOT NULL,
    "giftType" TEXT NOT NULL,
    "senderNote" TEXT NOT NULL,

    CONSTRAINT "GiftDelivery_pkey" PRIMARY KEY ("giftID")
);

-- AddForeignKey
ALTER TABLE "GiftDelivery" ADD CONSTRAINT "GiftDelivery_giftID_fkey" FOREIGN KEY ("giftID") REFERENCES "ServiceRequest"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;
