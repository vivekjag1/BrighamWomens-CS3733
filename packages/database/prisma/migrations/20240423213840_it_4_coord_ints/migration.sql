/*
  Warnings:

  - Changed the type of `xcoord` on the `Node` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ycoord` on the `Node` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
ALTER TYPE "ServiceType" ADD VALUE 'GiftDelivery';

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "employeeID" DROP DEFAULT;
DROP SEQUENCE "employee_employeeid_seq";

-- AlterTable
ALTER TABLE "Node" DROP COLUMN "xcoord",
ADD COLUMN     "xcoord" INTEGER NOT NULL,
DROP COLUMN "ycoord",
ADD COLUMN     "ycoord" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "GiftDelivery" (
    "giftID" INTEGER NOT NULL,
    "giftType" TEXT NOT NULL,
    "senderNote" TEXT NOT NULL,

    CONSTRAINT "GiftDelivery_pkey" PRIMARY KEY ("giftID")
);

-- AddForeignKey
ALTER TABLE "GiftDelivery" ADD CONSTRAINT "GiftDelivery_giftID_fkey" FOREIGN KEY ("giftID") REFERENCES "ServiceRequest"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;
