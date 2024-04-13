// import React, { useState } from 'react';
import { Select, MenuItem, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import NodeDropdown from "../components/NodeDropdown.tsx";
import { useState } from "react";
import CustomTextField from "../components/CustomTextField.tsx";
import CustomDatePicker from "../components/CustomDatePicker.tsx";
import FormContainer from "../components/FormContainer.tsx";
import CustomStatusDropdown from "../components/CustomStatusDropdown.tsx";
import CustomPrioritySelector from "../components/CustomPrioritySelector.tsx";
import CustomClearButton from "../components/CustomClearButton.tsx";
import CustomSubmitButton from "../components/CustomSubmitButton.tsx";
import { SecurityRequestType } from "common/src/SecurityRequestType.ts";
import dayjs, { Dayjs } from "dayjs";
import { APIEndpoints } from "common/src/APICommon.ts";
import axios from "axios";

const initialState: SecurityRequestType = {
  numberPeople: "",
  securityType: "",
  serviceRequest: {
    requestingUsername: "",
    location: "",
    priority: "",
    status: "Unassigned",
    description: "",
    requestedTime: dayjs().toISOString(),
  },
};

export function SecurityRequest() {
  const [securityRequestForm, setSecurityRequestForm] =
    useState<SecurityRequestType>(initialState);
  const [date, setDate] = useState<Dayjs>(dayjs());

  const validateForm = () => {
    return (
      securityRequestForm.numberPeople &&
      !isNaN(Number(securityRequestForm.numberPeople)) && // check if it can be converted to number
      securityRequestForm.securityType &&
      securityRequestForm.serviceRequest.requestingUsername &&
      securityRequestForm.serviceRequest.location &&
      securityRequestForm.serviceRequest.priority
    );
  };

  async function submit() {
    if (validateForm()) {
      try {
        const response = await axios.post(
          APIEndpoints.servicePostSecurityRequest,
          securityRequestForm,
          {
            headers: { "Content-Type": "application/json" },
          },
        );

        if (response.status === 200) {
          console.log("Submission successful", response.data);
          alert("Security request sent!");
          clear();
        } else {
          console.error("Submission failed with status:", response.status);
          alert("Security Request failed!");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("Security Request failed!");
      }
    } else {
      alert("You must fill out all the required information!");
    }
  }

  function clear() {
    setDate(dayjs());
    setSecurityRequestForm(initialState);
  }

  return (
    <FormContainer>
      <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
        Security Request
      </h1>
      <div className="h-auto flex justify-center items-center w-[30rem]">
        <form
          noValidate
          autoComplete="off"
          className="space-y-4 flex flex-col justify-center items-center"
        >
          <CustomTextField
            label="Requesting Username"
            value={securityRequestForm.serviceRequest.requestingUsername}
            onChange={(e) =>
              setSecurityRequestForm({
                ...securityRequestForm,
                serviceRequest: {
                  ...securityRequestForm.serviceRequest,
                  requestingUsername: e.target.value,
                },
              })
            }
            required
          />

          <NodeDropdown
            value={securityRequestForm.serviceRequest.location}
            onChange={(newValue: string) =>
              setSecurityRequestForm({
                ...securityRequestForm,
                serviceRequest: {
                  ...securityRequestForm.serviceRequest,
                  location: newValue,
                },
              })
            }
          />

          <CustomDatePicker
            value={date}
            onChange={(newValue) => {
              setSecurityRequestForm({
                ...securityRequestForm,
                serviceRequest: {
                  ...securityRequestForm.serviceRequest,
                  requestedTime: newValue ? newValue.toISOString() : "",
                },
              });
            }}
          />

          <FormControl sx={{ width: "25rem" }} size="small">
            <InputLabel sx={{ color: "#a4aab5", fontSize: ".9rem" }}>
              Security Type *
            </InputLabel>
            <Select
              name="security-type"
              value={securityRequestForm.securityType}
              className="bg-gray-50"
              label="Security Type *"
              sx={{ fontSize: ".9rem" }}
              onChange={(e) => {
                setSecurityRequestForm({
                  ...securityRequestForm,
                  securityType: e.target.value as string,
                });
              }}
            >
              <MenuItem value="Monitor">Monitor</MenuItem>
              <MenuItem value="Monitor">Escort</MenuItem>
              <MenuItem value="Monitor">Patrol</MenuItem>
            </Select>
          </FormControl>

          <CustomTextField
            label="Number of Personnel"
            value={securityRequestForm.numberPeople}
            type="number"
            InputProps={{
              inputProps: { min: 0 },
            }}
            onChange={(e) => {
              setSecurityRequestForm({
                ...securityRequestForm,
                numberPeople: e.target.value,
              });
            }}
            required
          />

          <CustomTextField
            label="Description (optional)"
            value={securityRequestForm.serviceRequest.description}
            multiline
            rows={3}
            size="small"
            onChange={(e) => {
              setSecurityRequestForm({
                ...securityRequestForm,
                serviceRequest: {
                  ...securityRequestForm.serviceRequest,
                  description: e.target.value,
                },
              });
            }}
          />

          <FormControl sx={{ width: "25rem" }} size="small">
            <CustomStatusDropdown
              value={securityRequestForm.serviceRequest.status}
              onChange={(e) =>
                setSecurityRequestForm({
                  ...securityRequestForm,
                  serviceRequest: {
                    ...securityRequestForm.serviceRequest,
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
              value={securityRequestForm.serviceRequest.priority}
              onChange={(e) =>
                setSecurityRequestForm({
                  ...securityRequestForm,
                  serviceRequest: {
                    ...securityRequestForm.serviceRequest,
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
            <p>Made by Daniel Gorbunov and Colin Masucci</p>
          </div>
        </form>
      </div>
    </FormContainer>
  );
}

export default SecurityRequest;
