/*
  Warnings:

  - You are about to drop the column `order` on the `FoodDeliveryService` table. All the data in the column will be lost.
  - Added the required column `protein` to the `FoodDeliveryService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `side` to the `FoodDeliveryService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodDeliveryService" DROP COLUMN "order",
ADD COLUMN     "protein" TEXT NOT NULL,
ADD COLUMN     "side" TEXT NOT NULL;
