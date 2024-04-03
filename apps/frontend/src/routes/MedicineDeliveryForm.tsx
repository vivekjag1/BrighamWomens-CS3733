import { useState } from "react";
import axios from "axios";
import { MedicineDeliveryObject } from "common/src/MedicineDelivery.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import { Button, TextField } from "@mui/material";
//import {ServiceRequest} from "common/src/ServiceRequest.ts";

export function MedicineDeliveryForm() {
  const [medicineDelivery, setMedicineDelivery] =
    useState<MedicineDeliveryObject>({
      medicineName: "",
      dosage: "",
      patientName: "",
      userInstructions: "",
      request: {
        roomNum: "",
        deliveryInstructions: "",
        requestingUsername: "",
        location: "",
      },
    });

  const validateForm = () => {
    const isValid =
      medicineDelivery.medicineName &&
      medicineDelivery.dosage &&
      medicineDelivery.patientName &&
      medicineDelivery.request.roomNum &&
      medicineDelivery.request.requestingUsername &&
      medicineDelivery.request.location;
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
      if (!isNaN(Number(medicineDelivery.request.roomNum))) {
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
        alert("Room Number is invalid!");
      }
    } else {
      alert("You must fill out all the required information!");
    }
  }

  function clear() {
    setMedicineDelivery({
      medicineName: "",
      dosage: "",
      patientName: "",
      userInstructions: "",
      request: {
        roomNum: "",
        deliveryInstructions: "",
        requestingUsername: "",
        location: "",
      },
    });
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-xl font-semibold mb-4">
        Medicine Service Request Form
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <TextField
          type="text"
          label="Medicine Name"
          name="medicineName"
          variant="outlined"
          size="small"
          fullWidth
          className="bg-gray-50"
          InputProps={{ style: { fontSize: ".9rem" } }}
          InputLabelProps={{ style: { color: "#a4aab5", fontSize: ".9rem" } }}
          value={medicineDelivery.medicineName}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              medicineName: e.target.value,
            })
          }
        />
        <TextField
          type="text"
          label="Dosage"
          name="dosage"
          variant="outlined"
          size="small"
          fullWidth
          className="bg-gray-50"
          InputProps={{ style: { fontSize: ".9rem" } }}
          InputLabelProps={{ style: { color: "#a4aab5", fontSize: ".9rem" } }}
          value={medicineDelivery.dosage}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              dosage: e.target.value,
            })
          }
        />
        <TextField
          type="text"
          label="Patient Name"
          name="patientName"
          variant="outlined"
          size="small"
          fullWidth
          className="bg-gray-50"
          InputProps={{ style: { fontSize: ".9rem" } }}
          InputLabelProps={{ style: { color: "#a4aab5", fontSize: ".9rem" } }}
          value={medicineDelivery.patientName}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              patientName: e.target.value,
            })
          }
        />
        <TextField
          label="User Instructions (Optional)"
          name="userInstructions"
          variant="outlined"
          size="small"
          fullWidth
          multiline
          rows={4}
          className="bg-gray-50"
          InputProps={{ style: { fontSize: ".9rem" } }}
          InputLabelProps={{ style: { color: "#a4aab5", fontSize: ".9rem" } }}
          value={medicineDelivery.userInstructions}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              userInstructions: e.target.value,
            })
          }
        />
        <TextField
          type="text"
          label="Room Number"
          name="roomNum"
          variant="outlined"
          size="small"
          fullWidth
          className="bg-gray-50"
          InputProps={{ style: { fontSize: ".9rem" } }}
          InputLabelProps={{ style: { color: "#a4aab5", fontSize: ".9rem" } }}
          value={medicineDelivery.request.roomNum}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              request: {
                ...medicineDelivery.request,
                roomNum: e.target.value,
              },
            })
          }
        />
        <TextField
          label="Delivery Instructions (Optional)"
          name="deliveryInstructions"
          variant="outlined"
          size="small"
          fullWidth
          multiline
          rows={4}
          className="bg-gray-50"
          InputProps={{ style: { fontSize: ".9rem" } }}
          InputLabelProps={{ style: { color: "#a4aab5", fontSize: ".9rem" } }}
          value={medicineDelivery.request.deliveryInstructions}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              request: {
                ...medicineDelivery.request,
                deliveryInstructions: e.target.value,
              },
            })
          }
        />
        <TextField
          type="text"
          label="Requesting Username"
          name="requestingUsername"
          variant="outlined"
          size="small"
          fullWidth
          className="bg-gray-50"
          InputProps={{ style: { fontSize: ".9rem" } }}
          InputLabelProps={{ style: { color: "#a4aab5", fontSize: ".9rem" } }}
          value={medicineDelivery.request.requestingUsername}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              request: {
                ...medicineDelivery.request,
                requestingUsername: e.target.value,
              },
            })
          }
        />
        <TextField
          type="text"
          label="Location"
          name="location"
          variant="outlined"
          size="small"
          fullWidth
          className="bg-gray-50"
          InputProps={{ style: { fontSize: ".9rem" } }}
          InputLabelProps={{ style: { color: "#a4aab5", fontSize: ".9rem" } }}
          value={medicineDelivery.request.location}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              request: {
                ...medicineDelivery.request,
                location: e.target.value,
              },
            })
          }
        />
        <div className="flex justify-end gap-8">
          <Button
            variant="contained"
            style={{
              backgroundColor: "#EA422D",
              color: "white",
              width: "8rem",
            }}
            onClick={clear}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            style={{ width: "8rem" }}
            onClick={submit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MedicineDeliveryForm;
