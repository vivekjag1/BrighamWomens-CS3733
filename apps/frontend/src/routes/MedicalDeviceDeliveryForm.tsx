import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import NodeDropdown from "../components/NodeDropdown.tsx";
import CustomTextField from "../components/CustomTextField.tsx";
import CustomDatePicker from "../components/CustomDatePicker.tsx";
import FormContainer from "../components/FormContainer.tsx";
import CustomStatusDropdown from "../components/CustomStatusDropdown.tsx";
import CustomPrioritySelector from "../components/CustomPrioritySelector.tsx";
import CustomClearButton from "../components/CustomClearButton.tsx";
import CustomSubmitButton from "../components/CustomSubmitButton.tsx";
import { MedicalDeviceDelivery } from "common/src/MedicalDeviceDelivery.ts";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { APIEndpoints } from "common/src/APICommon.ts";

const initialState: MedicalDeviceDelivery = {
  deviceType: "",
  quantity: 0,
  serviceRequest: {
    requestingUsername: "",
    location: "",
    priority: "",
    status: "Unassigned",
    description: "",
    requestedTime: dayjs().toISOString(),
  },
};

export function MedicalDeviceDeliveryForm() {
  const [medicalDeviceDelivery, setMedicalDeviceDelivery] =
    useState<MedicalDeviceDelivery>(initialState);
  const [date, setDate] = useState<Dayjs>(dayjs());

  function clear() {
    setDate(dayjs());
    setMedicalDeviceDelivery(initialState);
  }

  const validateForm = () => {
    const isValid =
      medicalDeviceDelivery.deviceType &&
      medicalDeviceDelivery.quantity &&
      medicalDeviceDelivery.serviceRequest.requestingUsername &&
      medicalDeviceDelivery.serviceRequest.location &&
      medicalDeviceDelivery.serviceRequest.priority;
    return isValid;
  };

  async function submit() {
    console.log(validateForm());
    if (validateForm()) {
      try {
        const response = await axios.post(
          APIEndpoints.medicalDeviceDelivery,
          medicalDeviceDelivery,
          {
            headers: { "Content-Type": "application/json" },
          },
        );

        if (response.status === 200) {
          console.log("Submission successful", response.data);
          alert("Medical device delivery form sent!");
          clear();
        } else {
          console.error("Submission failed with status: ", response.status);
          alert("Medical Device Request failed!");
        }
      } catch (error) {
        console.error("Error submitting the form: ", error);
        alert("Medical Device Request failed!");
      }
    } else {
      alert("You must fill out all the required information!");
    }
  }

  return (
    <FormContainer>
      <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
        Medicine Device Request
      </h1>
      <div className="h-auto flex justify-center items-center w-[30rem]">
        <form
          noValidate
          autoComplete="off"
          className="space-y-4 flex flex-col justify-center items-center"
        >
          <CustomTextField
            label="Requesting Username"
            value={medicalDeviceDelivery.serviceRequest.requestingUsername}
            onChange={(e) =>
              setMedicalDeviceDelivery({
                ...medicalDeviceDelivery,
                serviceRequest: {
                  ...medicalDeviceDelivery.serviceRequest,
                  requestingUsername: e.target.value,
                },
              })
            }
            required
          />

          <NodeDropdown
            value={medicalDeviceDelivery.serviceRequest.location}
            onChange={(newValue: string) => {
              setMedicalDeviceDelivery(
                (currentMedicalDeviceDelivery: MedicalDeviceDelivery) => ({
                  ...currentMedicalDeviceDelivery,
                  serviceRequest: {
                    ...currentMedicalDeviceDelivery.serviceRequest,
                    location: newValue,
                  },
                }),
              );
            }}
          />

          <CustomDatePicker
            value={date}
            onChange={(newValue) => {
              setMedicalDeviceDelivery(
                (currentMedicalDeviceDelivery: MedicalDeviceDelivery) => ({
                  ...currentMedicalDeviceDelivery,
                  serviceRequest: {
                    ...currentMedicalDeviceDelivery.serviceRequest,
                    requestedTime: newValue ? newValue.toISOString() : "",
                  },
                }),
              );
            }}
          />

          <FormControl sx={{ width: "25rem" }} size="small">
            <InputLabel sx={{ color: "#a4aab5", fontSize: ".9rem" }}>
              Device Type *
            </InputLabel>
            <Select
              name="device-type"
              className="bg-gray-50"
              label="Device Type *"
              sx={{ fontSize: ".9rem" }}
              value={medicalDeviceDelivery.deviceType}
              onChange={(e) =>
                setMedicalDeviceDelivery({
                  ...medicalDeviceDelivery,
                  deviceType: e.target.value,
                })
              }
              required
            >
              <MenuItem value="stretcher">Stretcher</MenuItem>
              <MenuItem value="wheelchair">Wheelchair</MenuItem>
              <MenuItem value="crutches">Crutches</MenuItem>
              <MenuItem value="hospital bed">Hospital Bed</MenuItem>
              <MenuItem value="iv pump">IV Pump</MenuItem>
              <MenuItem value="patient monitor">Patient Monitor</MenuItem>
              <MenuItem value="defibrillator">Defibrillator</MenuItem>
              <MenuItem value="anesthesia machine">Anesthesia Machine</MenuItem>
              <MenuItem value="ventilator">Ventilator</MenuItem>
              <MenuItem value="catheter">Catheter</MenuItem>
            </Select>
          </FormControl>

          <CustomTextField
            label="Quantity"
            type="number"
            InputProps={{
              inputProps: { min: 0 },
            }}
            onChange={(e) =>
              setMedicalDeviceDelivery({
                ...medicalDeviceDelivery,
                quantity: parseInt(e.target.value),
              })
            }
            required
          />

          <CustomTextField
            label="Description (optional)"
            multiline
            rows={3}
            size="small"
            onChange={(e) =>
              setMedicalDeviceDelivery({
                ...medicalDeviceDelivery,
                serviceRequest: {
                  ...medicalDeviceDelivery.serviceRequest,
                  description: e.target.value,
                },
              })
            }
          />

          <FormControl sx={{ width: "25rem" }} size="small">
            <CustomStatusDropdown
              value={medicalDeviceDelivery.serviceRequest.status}
              onChange={(e) =>
                setMedicalDeviceDelivery({
                  ...medicalDeviceDelivery,
                  serviceRequest: {
                    ...medicalDeviceDelivery.serviceRequest,
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
              value={medicalDeviceDelivery.serviceRequest.priority}
              onChange={(e) =>
                setMedicalDeviceDelivery({
                  ...medicalDeviceDelivery,
                  serviceRequest: {
                    ...medicalDeviceDelivery.serviceRequest,
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
          <div className="text-center mt-4">
            <p>Made by Andy Truong and Francesco Di Mise</p>
          </div>
        </form>
      </div>
    </FormContainer>
  );
}

export default MedicalDeviceDeliveryForm;
