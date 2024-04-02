export type MedicineDeliveryObject = {
  medicineName: string;
  dosage: string;
  patientName: string;
  userInstructions: string;
  request: {
    roomNum: string;
    deliveryInstructions: string;
    requestingUsername: string;
    location: string;
  };
};
