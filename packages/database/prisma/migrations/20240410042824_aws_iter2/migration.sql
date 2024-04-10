-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('MedicineDelivery', 'SecurityService', 'SanitationService', 'RoomScheduling', 'DeviceDelivery');

-- CreateTable
CREATE TABLE "Node" (
    "nodeID" TEXT NOT NULL,
    "xcoord" TEXT NOT NULL,
    "ycoord" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "nodeType" TEXT NOT NULL,
    "longName" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("nodeID")
);

-- CreateTable
CREATE TABLE "Edge" (
    "edgeID" TEXT NOT NULL,
    "startNodeID" TEXT NOT NULL,
    "endNodeID" TEXT NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("edgeID")
);

-- CreateTable
CREATE TABLE "ServiceRequest" (
    "serviceID" SERIAL NOT NULL,
    "type" "ServiceType" NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT,
    "requestingUsername" TEXT NOT NULL,
    "enteredTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestedTime" TIMESTAMP(3) NOT NULL,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "assignedTo" TEXT NOT NULL,

    CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("serviceID")
);

-- CreateTable
CREATE TABLE "MedicineDelivery" (
    "medicineRequestID" INTEGER NOT NULL,
    "medicineName" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,

    CONSTRAINT "MedicineDelivery_pkey" PRIMARY KEY ("medicineRequestID")
);

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
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_startNodeID_fkey" FOREIGN KEY ("startNodeID") REFERENCES "Node"("nodeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_endNodeID_fkey" FOREIGN KEY ("endNodeID") REFERENCES "Node"("nodeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineDelivery" ADD CONSTRAINT "MedicineDelivery_medicineRequestID_fkey" FOREIGN KEY ("medicineRequestID") REFERENCES "ServiceRequest"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityService" ADD CONSTRAINT "SecurityService_securityID_fkey" FOREIGN KEY ("securityID") REFERENCES "ServiceRequest"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SanitationService" ADD CONSTRAINT "SanitationService_sanitationID_fkey" FOREIGN KEY ("sanitationID") REFERENCES "ServiceRequest"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomScheduling" ADD CONSTRAINT "RoomScheduling_reservationID_fkey" FOREIGN KEY ("reservationID") REFERENCES "ServiceRequest"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceDelivery" ADD CONSTRAINT "DeviceDelivery_deliveryID_fkey" FOREIGN KEY ("deliveryID") REFERENCES "ServiceRequest"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;
