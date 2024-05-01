import React, { useState } from "react";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import NodeDropdown from "../../components/NodeDropdown.tsx";
import EmployeeDropdown from "../../components/EmployeeDropdown.tsx";
import CustomTextField from "../../components/CustomTextField.tsx";
import CustomDatePicker from "../../components/CustomDatePicker.tsx";
import FormContainer from "../../components/FormContainer.tsx";
import CustomStatusDropdown from "../../components/CustomStatusDropdown.tsx";
import CustomPrioritySelector from "../../components/CustomPrioritySelector.tsx";
import { SanitationRequestObject } from "common/src/SanitationRequest.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import dayjs, { Dayjs } from "dayjs";
import { useToast } from "../../components/useToast.tsx";
import { MakeProtectedPostRequest } from "../../MakeProtectedPostRequest.ts";
import { useAuth0 } from "@auth0/auth0-react";
import giftPlaceholder from "../../../assets/hospitalsanitation.jpg";
import ButtonRed from "../../components/ButtonRed.tsx";
import ButtonBlue from "../../components/ButtonBlue.tsx";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

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
    assignedTo: "Unassigned",
  },
};

export function SanitationForm() {
  const { getAccessTokenSilently } = useAuth0();

  const [sanitationRequest, setSanitationRequest] =
    useState<SanitationRequestObject>(initialState);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const { showToast } = useToast();
  const isEmployeeDisabled = ["Unassigned"].includes(
    sanitationRequest.serviceRequest.status,
  );

  const validateForm = () => {
    const { status, assignedTo } = sanitationRequest.serviceRequest;
    const requiresEmployee = ["Assigned", "InProgress", "Closed"].includes(
      status,
    );

    return (
      sanitationRequest.sanitationType &&
      sanitationRequest.requiredEquipment &&
      sanitationRequest.serviceRequest.requestingUsername &&
      sanitationRequest.serviceRequest.location &&
      sanitationRequest.serviceRequest.priority &&
      (!requiresEmployee || (requiresEmployee && assignedTo))
    );
  };

  async function submit() {
    const token = await getAccessTokenSilently();
    if (validateForm()) {
      try {
        const response = await MakeProtectedPostRequest(
          APIEndpoints.sanitationRequest,
          sanitationRequest,
          token,
        );
        if (response.status === 200) {
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
    <div className="bg-offwhite">
      <FormContainer imgPath={giftPlaceholder} alt={"Sanitation Request"}>
        <div>
          <h1 className="text-center font-bold text-3xl text-secondary pt-4 pb-2">
            Sanitation Request
          </h1>
          <p className="text-center text-sm text-gray-500 pb-5">
            Made by Matthew and Sulaiman
          </p>
          <div className="h-auto flex justify-center items-center w-[30rem]">
            <form
              noValidate
              autoComplete="off"
              className="space-y-4 flex flex-col justify-center items-center"
            >
              <EmployeeDropdown
                value={sanitationRequest.serviceRequest.requestingUsername}
                sx={{ width: "25rem", padding: 0 }}
                label="Requesting Employee *"
                onChange={(newValue) =>
                  setSanitationRequest({
                    ...sanitationRequest,
                    serviceRequest: {
                      ...sanitationRequest.serviceRequest,
                      requestingUsername: newValue,
                    },
                  })
                }
                disabled={false}
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
                sx={{ fontFamily: "Poppins, sans-serif" }}
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
                sx={{ width: "25rem", fontFamily: "Poppins, sans-serif" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Service Type *"
                    InputLabelProps={{
                      style: {
                        color: "#a4aab5",
                        fontSize: ".9rem",
                        fontFamily: "Poppins, sans-serif",
                      },
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
                sx={{ width: "25rem", fontFamily: "Poppins, sans-serif" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Necessary Equipment *"
                    InputLabelProps={{
                      style: {
                        color: "#a4aab5",
                        fontSize: ".9rem",
                        fontFamily: "Poppins, sans-serif",
                      },
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
                  onChange={(e) => {
                    const newStatus = e.target.value
                      ? e.target.value.toString()
                      : "";
                    let newAssignedTo =
                      sanitationRequest.serviceRequest.assignedTo;

                    if (newStatus === "Unassigned") {
                      newAssignedTo = "Unassigned";
                    } else {
                      newAssignedTo = "";
                    }

                    setSanitationRequest({
                      ...sanitationRequest,
                      serviceRequest: {
                        ...sanitationRequest.serviceRequest,
                        status: newStatus,
                        assignedTo: newAssignedTo,
                      },
                    });
                  }}
                />
              </FormControl>

              <EmployeeDropdown
                value={sanitationRequest.serviceRequest.assignedTo}
                sx={{ width: "25rem", padding: 0 }}
                label="Assigned Employee *"
                // employees={employees}
                onChange={(newValue: string) => {
                  let newStatus = sanitationRequest.serviceRequest.status;

                  if (newValue && newStatus === "Unassigned") {
                    newStatus = "Assigned";
                  }

                  setSanitationRequest((sanitationRequest) => ({
                    ...sanitationRequest,
                    serviceRequest: {
                      ...sanitationRequest.serviceRequest,
                      assignedTo: newValue,
                      status: newStatus,
                    },
                  }));
                }}
                disabled={isEmployeeDisabled}
              />

              <FormControl
                component="fieldset"
                margin="normal"
                sx={{ width: "25rem", fontFamily: "Poppins, sans-serif" }}
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

              <div className="flex justify-around w-full mt-4">
                <ButtonRed
                  onClick={clear}
                  endIcon={<ClearIcon />}
                  style={{ width: "8rem" }}
                >
                  Clear
                </ButtonRed>
                <ButtonBlue
                  onClick={submit}
                  endIcon={<CheckIcon />}
                  style={{ width: "8rem" }}
                >
                  Submit
                </ButtonBlue>
              </div>
              <div className="text-center mt-4"></div>
            </form>
          </div>
        </div>
      </FormContainer>
    </div>
  );
}

export default SanitationForm;
