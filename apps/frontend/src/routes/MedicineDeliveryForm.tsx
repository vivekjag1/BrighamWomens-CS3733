import { useState } from "react";
import axios from "axios";
import { MedicineDeliveryObject } from "common/src/MedicineDelivery.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import { FormControl } from "@mui/material";
import NodeDropdown from "../components/NodeDropdown.tsx";
import dayjs, { Dayjs } from "dayjs";
import FormContainer from "../components/FormContainer.tsx";
import CustomTextField from "../components/CustomTextField.tsx";
import CustomSubmitButton from "../components/CustomSubmitButton.tsx";
import CustomClearButton from "../components/CustomClearButton.tsx";
import CustomStatusDropdown from "../components/CustomStatusDropdown.tsx";
import CustomPrioritySelector from "../components/CustomPrioritySelector.tsx";
import CustomDatePicker from "../components/CustomDatePicker.tsx";
import { useToast } from "../components/useToast.tsx";

const initialState: MedicineDeliveryObject = {
  medicineName: "",
  dosage: "",
  patientName: "",
  serviceRequest: {
    requestingUsername: "",
    location: "",
    priority: "",
    status: "Unassigned",
    description: "",
    requestedTime: dayjs().toISOString(),
  },
};

export function MedicineDeliveryForm() {
  const [medicineDelivery, setMedicineDelivery] =
    useState<MedicineDeliveryObject>(initialState);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const { showToast } = useToast();

  const validateForm = () => {
    const isValid =
      medicineDelivery.medicineName &&
      medicineDelivery.dosage &&
      medicineDelivery.patientName &&
      medicineDelivery.serviceRequest.location &&
      medicineDelivery.serviceRequest.requestingUsername &&
      medicineDelivery.serviceRequest.location &&
      medicineDelivery.serviceRequest.priority;
    return isValid;
  };

  async function submit() {
    if (validateForm()) {
      try {
        const response = await axios.post(
          APIEndpoints.servicePostRequests,
          medicineDelivery,
          {
            headers: { "Content-Type": "application/json" },
          },
        );

        if (response.status === 200) {
          console.log("Submission successful", response.data);
          // alert("Medicine Request sent!");
          showToast("Medicine Request sent!", "success");
          clear();
        } else {
          console.error("Submission failed with status:", response.status);
          //alert("Medicine Request failed!");
          showToast("Medicine Request failed!", "error");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        showToast("Medicine Request failed!", "error");
      }
    } else {
      //alert("You must fill out all the required information!");
      showToast("Fill out all the required information!", "warning");
    }
  }

  function clear() {
    setDate(dayjs());
    setMedicineDelivery(initialState);
  }

  return (
    <FormContainer>
      <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
        Medicine Service Request
      </h1>
      <div className="h-auto flex justify-center items-center w-[30rem]">
        <form
          noValidate
          autoComplete="off"
          className="space-y-4 flex flex-col justify-center items-center"
        >
          <CustomTextField
            label="Requesting Username"
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

          <NodeDropdown
            value={medicineDelivery.serviceRequest.location}
            sx={{ width: "25rem", padding: 0 }}
            label="Location *"
            onChange={(newValue: string) =>
              setMedicineDelivery((medicineDelivery) => ({
                ...medicineDelivery,
                serviceRequest: {
                  ...medicineDelivery.serviceRequest,
                  location: newValue,
                },
              }))
            }
          />

          <CustomDatePicker
            value={date}
            onChange={(newValue) => {
              setMedicineDelivery((currentMedicineDelivery) => ({
                ...currentMedicineDelivery,
                serviceRequest: {
                  ...currentMedicineDelivery.serviceRequest,
                  requestedTime: newValue ? newValue.toISOString() : "",
                },
              }));
            }}
          />

          <CustomTextField
            label="Medicine Name"
            value={medicineDelivery.medicineName}
            onChange={(e) =>
              setMedicineDelivery({
                ...medicineDelivery,
                medicineName: e.target.value,
              })
            }
            required
          />

          <CustomTextField
            label="Dosage"
            value={medicineDelivery.dosage}
            onChange={(e) =>
              setMedicineDelivery({
                ...medicineDelivery,
                dosage: e.target.value,
              })
            }
            required
          />

          <CustomTextField
            label="Patient Name"
            value={medicineDelivery.patientName}
            onChange={(e) =>
              setMedicineDelivery({
                ...medicineDelivery,
                patientName: e.target.value,
              })
            }
            required
          />

          <CustomTextField
            label="Description (Optional)"
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

          <FormControl sx={{ width: "25rem" }} size="small">
            <CustomStatusDropdown
              value={medicineDelivery.serviceRequest.status}
              onChange={(e) =>
                setMedicineDelivery({
                  ...medicineDelivery,
                  serviceRequest: {
                    ...medicineDelivery.serviceRequest,
                    status: e.target.value ? e.target.value.toString() : "",
                  },
                })
              }
            />
          </FormControl>

          <FormControl
            component="fieldset"
            margin="normal"
            sx={{ width: "25rem" }}
          >
            <CustomPrioritySelector
              value={medicineDelivery.serviceRequest.priority}
              onChange={(e) =>
                setMedicineDelivery({
                  ...medicineDelivery,
                  serviceRequest: {
                    ...medicineDelivery.serviceRequest,
                    priority: e.target.value,
                  },
                })
              }
            />
          </FormControl>
          <div className="flex justify-between w-full mt-4">
            <CustomClearButton onClick={clear}>Clear</CustomClearButton>

            <CustomSubmitButton onClick={submit}>Submit</CustomSubmitButton>
          </div>
        </form>
      </div>
    </FormContainer>
  );
}

export default MedicineDeliveryForm;
