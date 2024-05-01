-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ServiceType" ADD VALUE 'ITRequest';
ALTER TYPE "ServiceType" ADD VALUE 'FoodDeliveryService';

-- CreateTable
CREATE TABLE "ITRequest" (
    "ITRequestID" INTEGER NOT NULL,
    "problemType" TEXT NOT NULL,

    CONSTRAINT "ITRequest_pkey" PRIMARY KEY ("ITRequestID")
);

-- CreateTable
CREATE TABLE "FoodDeliveryService" (
    "foodRequestID" INTEGER NOT NULL,
    "order" TEXT NOT NULL,

    CONSTRAINT "FoodDeliveryService_pkey" PRIMARY KEY ("foodRequestID")
);

-- AddForeignKey
ALTER TABLE "ITRequest" ADD CONSTRAINT "ITRequest_ITRequestID_fkey" FOREIGN KEY ("ITRequestID") REFERENCES "ServiceRequest"("serviceID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodDeliveryService" ADD CONSTRAINT "FoodDeliveryService_foodRequestID_fkey" FOREIGN KEY ("foodRequestID") REFERENCES "ServiceRequest"("serviceID") ON DELETE CASCADE ON UPDATE CASCADE;
