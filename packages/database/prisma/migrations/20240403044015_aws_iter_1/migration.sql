-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('MedicineDelivery');

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
    "edgeID" INTEGER NOT NULL,
    "startNodeID" TEXT NOT NULL,
    "endNodeID" TEXT NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("edgeID")
);

-- CreateTable
CREATE TABLE "ServiceRequest" (
    "serviceID" SERIAL NOT NULL,
    "type" "ServiceType" NOT NULL,
    "roomNum" INTEGER NOT NULL,
    "deliveryInstructions" TEXT,
    "requestingUsername" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,

    CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("serviceID")
);

-- CreateTable
CREATE TABLE "MedicineDelivery" (
    "medicineRequestID" INTEGER NOT NULL,
    "medicineName" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "userInstructions" TEXT,

    CONSTRAINT "MedicineDelivery_pkey" PRIMARY KEY ("medicineRequestID")
);

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_startNodeID_fkey" FOREIGN KEY ("startNodeID") REFERENCES "Node"("nodeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_endNodeID_fkey" FOREIGN KEY ("endNodeID") REFERENCES "Node"("nodeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineDelivery" ADD CONSTRAINT "MedicineDelivery_medicineRequestID_fkey" FOREIGN KEY ("medicineRequestID") REFERENCES "ServiceRequest"("serviceID") ON DELETE RESTRICT ON UPDATE CASCADE;
