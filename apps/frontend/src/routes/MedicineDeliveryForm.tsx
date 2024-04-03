import { useState } from "react";
import axios from "axios";
import { MedicineDeliveryObject } from "common/src/MedicineDelivery.ts";
import { APIEndpoints } from "common/src/api.ts";
import { Button } from "@mui/material";
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
      <div className="grid grid-cols-1 gap-6">
        <input
          type="text"
          name="medicineName"
          value={medicineDelivery.medicineName}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              medicineName: e.target.value,
            })
          }
          placeholder="Medicine Name"
          className="input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        />
        <input
          type="text"
          name="dosage"
          value={medicineDelivery.dosage}
          onChange={(e) =>
            setMedicineDelivery({ ...medicineDelivery, dosage: e.target.value })
          }
          placeholder="Dosage"
          className="input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        />
        <input
          type="text"
          name="patientName"
          value={medicineDelivery.patientName}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              patientName: e.target.value,
            })
          }
          placeholder="Patient Name"
          className="input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        />
        <textarea
          name="userInstructions"
          value={medicineDelivery.userInstructions}
          onChange={(e) =>
            setMedicineDelivery({
              ...medicineDelivery,
              userInstructions: e.target.value,
            })
          }
          placeholder="User Instructions (Optional)"
          className="textarea textarea-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        ></textarea>
        <input
          type="text"
          name="roomNum"
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
          placeholder="Room Number"
          className="input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        />
        <textarea
          name="deliveryInstructions"
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
          placeholder="Delivery Instructions (Optional)"
          className="textarea textarea-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        ></textarea>
        <input
          type="text"
          name="requestingUsername"
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
          placeholder="Requesting Username"
          className="input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        />
        <input
          type="text"
          name="location"
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
          placeholder="Location"
          className="input input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
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
