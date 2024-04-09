/*
  Warnings:

  - The primary key for the `Edge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userInstructions` on the `MedicineDelivery` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryInstructions` on the `ServiceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `roomNum` on the `ServiceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `timeStamp` on the `ServiceRequest` table. All the data in the column will be lost.
  - Added the required column `assignedTo` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestedTime` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ServiceType" ADD VALUE 'SecurityService';
ALTER TYPE "ServiceType" ADD VALUE 'SanitationService';
ALTER TYPE "ServiceType" ADD VALUE 'RoomScheduling';
ALTER TYPE "ServiceType" ADD VALUE 'DeviceDelivery';

-- AlterTable
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_pkey",
ALTER COLUMN "edgeID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Edge_pkey" PRIMARY KEY ("edgeID");

-- AlterTable
ALTER TABLE "MedicineDelivery" DROP COLUMN "userInstructions";

-- AlterTable
ALTER TABLE "ServiceRequest" DROP COLUMN "deliveryInstructions",
DROP COLUMN "roomNum",
DROP COLUMN "timeStamp",
ADD COLUMN     "assignedTo" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "enteredTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "priority" TEXT NOT NULL,
ADD COLUMN     "requestedTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "updatedTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "SecurityService" (
    "securityID" INTEGER NOT NULL,
    "securityType" TEXT NOT NULL,
    "numberPeople" INTEGER NOT NULL,

    CONSTRAINT "SecurityService_pkey" PRIMARY KEY ("securityID")
);

-- CreateTable
CREATE TABLE "SanitationService" (
    "sanitationID" INTEGER NOT NULL,
    "sanitationType" TEXT NOT NULL,
    "requiredEquipment" TEXT NOT NULL,

    CONSTRAINT "SanitationService_pkey" PRIMARY KEY ("sanitationID")
);

-- CreateTable
CREATE TABLE "RoomScheduling" (
    "reservationID" INTEGER NOT NULL,
    "reservationReason" TEXT NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomScheduling_pkey" PRIMARY KEY ("reservationID")
);

-- CreateTable
CREATE TABLE "DeviceDelivery" (
    "deliveryID" INTEGER NOT NULL,
    "deviceType" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "DeviceDelivery_pkey" PRIMARY KEY ("deliveryID")
);

-- AddForeignKey
ALTER TABLE "SecurityService" ADD CONSTRAINT "SecurityService_securityID_fkey" FOREIGN KEY ("securityID") REFERENCES "ServiceRequest"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SanitationService" ADD CONSTRAINT "SanitationService_sanitationID_fkey" FOREIGN KEY ("sanitationID") REFERENCES "ServiceRequest"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomScheduling" ADD CONSTRAINT "RoomScheduling_reservationID_fkey" FOREIGN KEY ("reservationID") REFERENCES "ServiceRequest"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceDelivery" ADD CONSTRAINT "DeviceDelivery_deliveryID_fkey" FOREIGN KEY ("deliveryID") REFERENCES "ServiceRequest"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;
