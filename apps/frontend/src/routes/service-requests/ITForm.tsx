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
import { ITSupportObject } from "common/src/ITRequest.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import dayjs, { Dayjs } from "dayjs";
import { useToast } from "../../components/useToast.tsx";
import { MakeProtectedPostRequest } from "../../MakeProtectedPostRequest.ts";
import { useAuth0 } from "@auth0/auth0-react";
import IT_icon from "../../../assets/IT_icon.jpg";
import ButtonRed from "../../components/ButtonRed.tsx";
import ButtonBlue from "../../components/ButtonBlue.tsx";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

const initialState: ITSupportObject = {
  TypeofProblem: "",
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

export function ITForm(): JSX.Element {
  const { getAccessTokenSilently } = useAuth0();
  const [ITRequest, setITRequest] = useState<ITSupportObject>(initialState);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const { showToast } = useToast();
  const isEmployeeDisabled = ["Unassigned"].includes(
    ITRequest.serviceRequest.status,
  );

  const validateForm = () => {
    const { status, assignedTo } = ITRequest.serviceRequest;
    const requiresEmployee = ["Assigned", "InProgress", "Closed"].includes(
      status,
    );

    return (
      ITRequest.TypeofProblem &&
      ITRequest.serviceRequest.requestingUsername &&
      ITRequest.serviceRequest.location &&
      ITRequest.serviceRequest.priority &&
      (!requiresEmployee || (requiresEmployee && assignedTo))
    );
  };

  async function submit() {
    const token = await getAccessTokenSilently();
    if (validateForm()) {
      try {
        const response = await MakeProtectedPostRequest(
          APIEndpoints.ITPostRequests,
          ITRequest,
          token,
        );

        if (response.status === 200) {
          //alert("Sanitation Request sent!");
          showToast("IT Request sent!", "success");
          clear();
        } else {
          console.error("Submission failed with status:", response.status);
          //alert("Sanitation Request failed!");
          showToast("IT Request failed!", "error");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        //alert("Sanitation Request failed!");
        showToast("IT Request failed!", "error");
      }
    } else {
      //alert("You must fill out all the required information!");
      showToast("Fill out all the required information!", "warning");
    }
  }

  function clear() {
    setDate(dayjs());
    setITRequest(initialState);
  }

  return (
    <div className="bg-offwhite">
      <FormContainer imgPath={IT_icon} alt={"IT support"}>
        <div>
          <h1 className="text-center font-bold text-3xl text-secondary pt-4 pb-2">
            IT Request
          </h1>
          <p className="text-center text-sm text-gray-500 pb-5">
            Made by Sulaiman
          </p>
          <div className="h-auto flex justify-center items-center w-[30rem]">
            <form
              noValidate
              autoComplete="off"
              className="space-y-4 flex flex-col justify-center items-center"
            >
              <EmployeeDropdown
                value={ITRequest.serviceRequest.requestingUsername}
                sx={{ width: "25rem", padding: 0 }}
                label="Requesting Employee *"
                onChange={(newValue) =>
                  setITRequest({
                    ...ITRequest,
                    serviceRequest: {
                      ...ITRequest.serviceRequest,
                      requestingUsername: newValue,
                    },
                  })
                }
                disabled={false}
              />

              <NodeDropdown
                sx={{ width: "25rem", padding: 0 }}
                label="Location *"
                value={ITRequest.serviceRequest.location}
                onChange={(newValue: string) =>
                  setITRequest(() => ({
                    ...ITRequest,
                    serviceRequest: {
                      ...ITRequest.serviceRequest,
                      location: newValue,
                    },
                  }))
                }
              />

              <CustomDatePicker
                value={date}
                onChange={(newValue) => {
                  const isValid = newValue && dayjs(newValue).isValid();
                  setITRequest((currentITRequest) => ({
                    ...currentITRequest,
                    serviceRequest: {
                      ...currentITRequest.serviceRequest,
                      requestedTime: isValid ? newValue.toISOString() : "",
                    },
                  }));
                }}
              />

              <Autocomplete
                disablePortal
                id="combo-box-service"
                options={[
                  { label: "Software" },
                  { label: "Network" },
                  { label: "Hardware" },
                  { label: "Other" },
                ]}
                className="bg-gray-50"
                size="small"
                sx={{
                  "& .MuiAutocomplete-input": {
                    fontSize: ".8rem",
                    whiteSpace: "pre-wrap",
                    fontFamily: "Poppins, sans-serif",
                  },
                  width: "25rem",
                  fontFamily: "Poppins, sans-serif",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="IT Problem Type *"
                    InputLabelProps={{
                      style: {
                        color: "#a4aab5",
                        fontSize: ".9rem",
                        fontFamily: "Poppins,sans-serif",
                      },
                    }}
                  />
                )}
                value={
                  ITRequest.TypeofProblem
                    ? { label: ITRequest.TypeofProblem }
                    : null
                }
                onChange={(
                  event: React.SyntheticEvent<Element, Event>,
                  newValue: { label: string } | null,
                ) =>
                  setITRequest({
                    ...ITRequest,
                    TypeofProblem: newValue ? newValue.label : "",
                  })
                }
              />

              <CustomTextField
                value={ITRequest.serviceRequest.description}
                onChange={(e) =>
                  setITRequest({
                    ...ITRequest,
                    serviceRequest: {
                      ...ITRequest.serviceRequest,
                      description: e.target.value,
                    },
                  })
                }
                label="Description (optional)"
                multiline
                rows={3}
                size="small"
              />

              <FormControl sx={{ width: "25rem" }} size="small">
                <CustomStatusDropdown
                  value={ITRequest.serviceRequest.status}
                  onChange={(e) => {
                    const newStatus = e.target.value
                      ? e.target.value.toString()
                      : "";
                    let newAssignedTo = ITRequest.serviceRequest.assignedTo;

                    if (newStatus === "Unassigned") {
                      newAssignedTo = "Unassigned";
                    } else {
                      newAssignedTo = "";
                    }

                    setITRequest({
                      ...ITRequest,
                      serviceRequest: {
                        ...ITRequest.serviceRequest,
                        status: newStatus,
                        assignedTo: newAssignedTo,
                      },
                    });
                  }}
                />
              </FormControl>

              <EmployeeDropdown
                value={ITRequest.serviceRequest.assignedTo}
                sx={{ width: "25rem", padding: 0 }}
                label="Assigned Employee *"
                onChange={(newValue: string) => {
                  let newStatus = ITRequest.serviceRequest.status;

                  if (newValue && newStatus === "Unassigned") {
                    newStatus = "Assigned";
                  }

                  setITRequest((ITRequest) => ({
                    ...ITRequest,
                    serviceRequest: {
                      ...ITRequest.serviceRequest,
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
                sx={{ width: "25rem" }}
              >
                <CustomPrioritySelector
                  value={ITRequest.serviceRequest.priority}
                  onChange={(e) =>
                    setITRequest({
                      ...ITRequest,
                      serviceRequest: {
                        ...ITRequest.serviceRequest,
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

export default ITForm;
