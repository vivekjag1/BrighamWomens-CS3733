-- DropForeignKey
ALTER TABLE "DeviceDelivery" DROP CONSTRAINT "DeviceDelivery_deliveryID_fkey";

-- DropForeignKey
ALTER TABLE "GiftDelivery" DROP CONSTRAINT "GiftDelivery_giftID_fkey";

-- DropForeignKey
ALTER TABLE "MedicineDelivery" DROP CONSTRAINT "MedicineDelivery_medicineRequestID_fkey";

-- DropForeignKey
ALTER TABLE "RoomScheduling" DROP CONSTRAINT "RoomScheduling_reservationID_fkey";

-- DropForeignKey
ALTER TABLE "SanitationService" DROP CONSTRAINT "SanitationService_sanitationID_fkey";

-- DropForeignKey
ALTER TABLE "SecurityService" DROP CONSTRAINT "SecurityService_securityID_fkey";

-- AddForeignKey
ALTER TABLE "MedicineDelivery" ADD CONSTRAINT "MedicineDelivery_medicineRequestID_fkey" FOREIGN KEY ("medicineRequestID") REFERENCES "ServiceRequest"("serviceID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityService" ADD CONSTRAINT "SecurityService_securityID_fkey" FOREIGN KEY ("securityID") REFERENCES "ServiceRequest"("serviceID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SanitationService" ADD CONSTRAINT "SanitationService_sanitationID_fkey" FOREIGN KEY ("sanitationID") REFERENCES "ServiceRequest"("serviceID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomScheduling" ADD CONSTRAINT "RoomScheduling_reservationID_fkey" FOREIGN KEY ("reservationID") REFERENCES "ServiceRequest"("serviceID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceDelivery" ADD CONSTRAINT "DeviceDelivery_deliveryID_fkey" FOREIGN KEY ("deliveryID") REFERENCES "ServiceRequest"("serviceID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftDelivery" ADD CONSTRAINT "GiftDelivery_giftID_fkey" FOREIGN KEY ("giftID") REFERENCES "ServiceRequest"("serviceID") ON DELETE CASCADE ON UPDATE CASCADE;
