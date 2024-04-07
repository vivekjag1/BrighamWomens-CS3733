import { useState } from "react";
import axios from "axios";
import { MedicineDeliveryObject } from "common/src/MedicineDelivery.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import { Button, TextField } from "@mui/material";
//import {ServiceRequest} from "common/src/ServiceRequest.ts";

const initialState: MedicineDeliveryObject = {
  medicineName: "",
  dosage: "",
  patientName: "",
  serviceRequest: {
    requestingUsername: "",
    location: "",
    priority: "Low",
    status: "Unassigned",
    description: "",
  },
};
export function MedicineDeliveryForm() {
  const [medicineDelivery, setMedicineDelivery] =
    useState<MedicineDeliveryObject>(initialState);

  const validateForm = () => {
    const isValid =
      medicineDelivery.medicineName &&
      medicineDelivery.dosage &&
      medicineDelivery.patientName &&
      medicineDelivery.serviceRequest.requestingUsername &&
      medicineDelivery.serviceRequest.location;
    return isValid;
  };

  async function submit() {
    console.log(medicineDelivery);
    // const formData = new FormData();
    //
    // formData.append('medicineDelivery.medicineName', medicineDelivery.medicineName);
    // formData.append('medicineDelivery.dosage', medicineDelivery.dosage);
    // formData.append('medicineDelivery.patientName', medicineDelivery.patientName);
    // formData.append('medicineDelivery.userInstructions', medicineDelivery.userInstructions);
    //
    // formData.append('medicineDelivery.request.roomNum', medicineDelivery.request.roomNum);
    // formData.append('medicineDelivery.request.deliveryInstructions', medicineDelivery.request.deliveryInstructions);
    // formData.append('medicineDelivery.request.requestingUsername', medicineDelivery.request.requestingUsername);
    // formData.append('medicineDelivery.request.location', medicineDelivery.request.location);

    if (validateForm()) {
      try {
        // const response = await axios.post('/api/service', formData, {
        //     headers: { 'Content-Type': 'multipart/form-data' },
        // });
        const response = await axios.post(
          APIEndpoints.servicePostRequests,
          medicineDelivery,
          {
            headers: { "Content-Type": "application/json" },
          },
        );

        if (response.status === 200) {
          console.log("Submission successful", response.data);
          alert("Medicine Request sent!");
          clear();
        } else {
          console.error("Submission failed with status:", response.status);
          alert("Medicine Request failed!");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("Medicine Request failed! Room Number must be a number.");
      }
    } else {
      alert("You must fill out all the required information!");
    }
  }

  function clear() {
    setMedicineDelivery(initialState);
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-xl font-semibold mb-4">
        Medicine Service Request Form
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <TextField
          label="Medicine Name"
          name="medicineName"
          variant="outlined"
          size="small"
          fullWidth
          value={medicineDelivery.medicineName}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              medicineName: e.target.value,
            })
          }
          required
        />

        <TextField
          label="Dosage"
          name="dosage"
          variant="outlined"
          size="small"
          fullWidth
          value={medicineDelivery.dosage}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              dosage: e.target.value,
            })
          }
          required
        />

        {/* Patient Name */}
        <TextField
          label="Patient Name"
          name="patientName"
          variant="outlined"
          size="small"
          fullWidth
          value={medicineDelivery.patientName}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              patientName: e.target.value,
            })
          }
          required
        />

        <TextField
          label="Description (Optional)"
          name="description"
          variant="outlined"
          size="small"
          fullWidth
          multiline
          rows={4}
          value={medicineDelivery.serviceRequest.description}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              serviceRequest: {
                ...medicineDelivery.serviceRequest,
                description: e.target.value,
              },
            })
          }
        />

        {/* Requesting Username */}
        <TextField
          label="Requesting Username"
          name="requestingUsername"
          variant="outlined"
          size="small"
          fullWidth
          value={medicineDelivery.serviceRequest.requestingUsername}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              serviceRequest: {
                ...medicineDelivery.serviceRequest,
                requestingUsername: e.target.value,
              },
            })
          }
          required
        />

        <TextField
          label="Location"
          name="location"
          variant="outlined"
          size="small"
          fullWidth
          value={medicineDelivery.serviceRequest.location}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              serviceRequest: {
                ...medicineDelivery.serviceRequest,
                location: e.target.value,
              },
            })
          }
          required
        />

        <div className="flex justify-end gap-8">
          <Button
            variant="contained"
            onClick={clear}
            style={{
              backgroundColor: "#EA422D",
              color: "white",
              width: "8rem",
            }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={submit}
            style={{ width: "8rem" }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MedicineDeliveryForm;
