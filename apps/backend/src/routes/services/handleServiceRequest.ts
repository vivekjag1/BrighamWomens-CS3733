import client from "../../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";
import { MedicineDeliveryObject } from "common/src/MedicineDelivery.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response): Promise<void> {
  const request: MedicineDeliveryObject = req.body;

  try {
    const createdMedicineDelivery = await client.medicineDelivery.create({
      data: {
        medicineName: request.medicineName,
        dosage: request.dosage,
        patientName: request.patientName,
        serviceRequest: {
          create: {
            type: "MedicineDelivery",
            requestingUsername: request.serviceRequest.requestingUsername,
            location: request.serviceRequest.location,
            description: request.serviceRequest.description,
            priority: request.serviceRequest.priority,
            status: request.serviceRequest.status,
            requestedTime: request.serviceRequest.requestedTime,
            assignedTo: request.serviceRequest.assignedTo,
          },
        },
      },
    });

    res.status(200).json({
      message: "Medicine delivery created successfully",
      data: createdMedicineDelivery,
    });
  } catch (error) {
    console.error("Error creating medicine delivery:", error);
    res.status(400).json({ message: "Error creating medicine delivery" });
  }
});

router.get("/", async function (req: Request, res: Response): Promise<void> {
  const requests = await client.serviceRequest.findMany({
    include: {
      medicineDelivery: true,
      SecurityService: true,
      SanitationService: true,
      RoomScheduling: true,
      DeviceDelivery: true,
      GiftDelivery: true,
      ITRequest: true,
      FoodDeliveryService: true,
    },
  });
  res.json(requests);
});

router.patch("/", async (req, res) => {
  const { serviceID, status, assignedTo } = req.body;

  try {
    const updatedServiceRequest = await client.serviceRequest.update({
      where: { serviceID: serviceID },
      data: { status: status, assignedTo: assignedTo },
    });

    res.json({
      message: "Service request status updated successfully",
      updatedServiceRequest,
    });
  } catch (error) {
    console.error("Error updating service request status:", error);
    res.status(400).json({ message: "Error updating service request status" });
  }
});

router.delete("/", async (req, res) => {
  const { serviceID } = req.body.serviceID;
  try {
    await client.serviceRequest.delete({
      where: { serviceID: serviceID },
    });

    res.json({ message: "Service request deleted successfully" });
  } catch (error) {
    console.error("Error deleting service request:", error);
    res.status(400).json({ message: "Error deleting service request" });
  }
});

router.delete("/:serviceID", async (req, res) => {
  const serviceID = +req.params.serviceID;

  try {
    await client.serviceRequest.delete({
      where: { serviceID: serviceID },
    });

    res.json({ message: "Service request deleted successfully" });
  } catch (error) {
    console.error("Error deleting service request:", error);
    res.status(500).json({ message: "Error deleting service request" });
  }
});

export default router;
