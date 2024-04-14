import React, { useState } from "react";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import NodeDropdown from "../components/NodeDropdown.tsx";
import CustomTextField from "../components/CustomTextField.tsx";
import CustomDatePicker from "../components/CustomDatePicker.tsx";
import FormContainer from "../components/FormContainer.tsx";
import CustomStatusDropdown from "../components/CustomStatusDropdown.tsx";
import CustomPrioritySelector from "../components/CustomPrioritySelector.tsx";
import CustomClearButton from "../components/CustomClearButton.tsx";
import CustomSubmitButton from "../components/CustomSubmitButton.tsx";
import { SanitationRequestObject } from "common/src/SanitationRequest.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { useToast } from "../components/useToast.tsx";

const initialState: SanitationRequestObject = {
  sanitationType: "",
  requiredEquipment: "",
  serviceRequest: {
    requestingUsername: "",
    location: "",
    priority: "",
    status: "Unassigned",
    description: "",
    requestedTime: dayjs().toISOString(),
  },
};

export function SanitationForm() {
  const [sanitationRequest, setSanitationRequest] =
    useState<SanitationRequestObject>(initialState);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const { showToast } = useToast();

  const validateForm = () => {
    const isValid =
      sanitationRequest.sanitationType &&
      sanitationRequest.requiredEquipment &&
      sanitationRequest.serviceRequest.requestingUsername &&
      sanitationRequest.serviceRequest.location &&
      sanitationRequest.serviceRequest.priority;
    return isValid;
  };

  async function submit() {
    if (validateForm()) {
      try {
        const response = await axios.post(
          APIEndpoints.sanitationPostRequests,
          sanitationRequest,
          {
            headers: { "Content-Type": "application/json" },
          },
        );

        if (response.status === 200) {
          console.log("Submission successful", response.data);
          //alert("Sanitation Request sent!");
          showToast("Sanitation Request sent!", "success");
          clear();
        } else {
          console.error("Submission failed with status:", response.status);
          //alert("Sanitation Request failed!");
          showToast("Sanitation Request failed!", "error");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        //alert("Sanitation Request failed!");
        showToast("Sanitation Request failed!", "error");
      }
    } else {
      //alert("You must fill out all the required information!");
      showToast("Fill out all the required information!", "warning");
    }
  }

  function clear() {
    setDate(dayjs());
    setSanitationRequest(initialState);
  }

  return (
    <FormContainer>
      <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
        Sanitation Request
      </h1>
      <div className="h-auto flex justify-center items-center w-[30rem]">
        <form
          noValidate
          autoComplete="off"
          className="space-y-4 flex flex-col justify-center items-center"
        >
          <CustomTextField
            label="Requesting Username"
            value={sanitationRequest.serviceRequest.requestingUsername}
            onChange={(e) =>
              setSanitationRequest({
                ...sanitationRequest,
                serviceRequest: {
                  ...sanitationRequest.serviceRequest,
                  requestingUsername: e.target.value,
                },
              })
            }
            required
          />

          <NodeDropdown
            sx={{ width: "25rem", padding: 0 }}
            label="Location *"
            value={sanitationRequest.serviceRequest.location}
            onChange={(newValue: string) =>
              setSanitationRequest(() => ({
                ...sanitationRequest,
                serviceRequest: {
                  ...sanitationRequest.serviceRequest,
                  location: newValue,
                },
              }))
            }
          />

          <CustomDatePicker
            value={date}
            onChange={(newValue) => {
              const isValid = newValue && dayjs(newValue).isValid();
              setSanitationRequest((currentSanitationRequest) => ({
                ...currentSanitationRequest,
                serviceRequest: {
                  ...currentSanitationRequest.serviceRequest,
                  requestedTime: isValid ? newValue.toISOString() : "",
                },
              }));
            }}
          />

          <Autocomplete
            disablePortal
            id="combo-box-service"
            options={[
              { label: "Clean" },
              { label: "Deep Clean" },
              { label: "Hazardous" },
              { label: "Toxic" },
            ]}
            className="bg-gray-50"
            size="small"
            sx={{ width: "25rem" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Service Type *"
                InputLabelProps={{
                  style: { color: "#a4aab5", fontSize: ".9rem" },
                }}
              />
            )}
            value={
              sanitationRequest.sanitationType
                ? { label: sanitationRequest.sanitationType }
                : null
            }
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              newValue: { label: string } | null,
            ) =>
              setSanitationRequest({
                ...sanitationRequest,
                sanitationType: newValue ? newValue.label : "",
              })
            }
          />

          <Autocomplete
            disablePortal
            id="combo-box-equipment"
            options={[
              { label: "Mop" },
              { label: "Broom" },
              { label: "Dust Pan" },
            ]}
            className="bg-gray-50"
            size="small"
            sx={{ width: "25rem" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Necessary Equipment *"
                InputLabelProps={{
                  style: { color: "#a4aab5", fontSize: ".9rem" },
                }}
              />
            )}
            value={
              sanitationRequest.requiredEquipment
                ? { label: sanitationRequest.requiredEquipment }
                : null
            }
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              newValue: { label: string } | null,
            ) =>
              setSanitationRequest({
                ...sanitationRequest,
                requiredEquipment: newValue ? newValue.label : "",
              })
            }
          />

          <CustomTextField
            label="Description (optional)"
            multiline
            rows={3}
            value={sanitationRequest.serviceRequest.description}
            onChange={(e) =>
              setSanitationRequest({
                ...sanitationRequest,
                serviceRequest: {
                  ...sanitationRequest.serviceRequest,
                  description: e.target.value,
                },
              })
            }
            size="small"
          />

          <FormControl sx={{ width: "25rem" }} size="small">
            <CustomStatusDropdown
              value={sanitationRequest.serviceRequest.status}
              onChange={(e) =>
                setSanitationRequest({
                  ...sanitationRequest,
                  serviceRequest: {
                    ...sanitationRequest.serviceRequest,
                    status: e.target.value as string,
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
              value={sanitationRequest.serviceRequest.priority}
              onChange={(e) =>
                setSanitationRequest({
                  ...sanitationRequest,
                  serviceRequest: {
                    ...sanitationRequest.serviceRequest,
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
            <p>Made by Matthew Brown and Sulaiman Moukheiber</p>
          </div>
        </form>
      </div>
    </FormContainer>
  );
}

export default SanitationForm;
