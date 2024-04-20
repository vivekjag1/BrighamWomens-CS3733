// import React, { useState } from 'react';
import { Select, MenuItem, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import NodeDropdown from "../../components/NodeDropdown.tsx";
import { useState } from "react";
import CustomTextField from "../../components/CustomTextField.tsx";
import CustomDatePicker from "../../components/CustomDatePicker.tsx";
import FormContainer from "../../components/FormContainer.tsx";
import CustomStatusDropdown from "../../components/CustomStatusDropdown.tsx";
import CustomPrioritySelector from "../../components/CustomPrioritySelector.tsx";
import CustomClearButton from "../../components/CustomClearButton.tsx";
import CustomSubmitButton from "../../components/CustomSubmitButton.tsx";
import { SecurityRequestType } from "common/src/SecurityRequestType.ts";
import dayjs, { Dayjs } from "dayjs";
import { APIEndpoints } from "common/src/APICommon.ts";
import { useToast } from "../../components/useToast.tsx";
import { MakeProtectedPostRequest } from "../../MakeProtectedPostRequest.ts";
import { useAuth0 } from "@auth0/auth0-react";
import ServiceImages from "../../components/ServiceImages.tsx";
import giftPlaceholder from "../../../assets/gift-placeholder.jpg";

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

export function SecurityForm() {
  const [securityRequestForm, setSecurityRequestForm] =
    useState<SecurityRequestType>(initialState);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const { showToast } = useToast();
  const { getAccessTokenSilently } = useAuth0();

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
    const token = await getAccessTokenSilently();
    if (validateForm()) {
      try {
        const response = await MakeProtectedPostRequest(
          APIEndpoints.servicePostSecurityRequest,
          securityRequestForm,
          token,
        );
        if (response.status === 200) {
          console.log("Submission successful", response.data);
          showToast("Security Request sent!", "success");
          clear();
        } else {
          console.error("Submission failed with status:", response.status);
          showToast("Security Request failed!", "error");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        showToast("Security Request failed!", "error");
      }
    } else {
      showToast("Fill out all the required information!", "warning");
    }
  }

  function clear() {
    setDate(dayjs());
    setSecurityRequestForm(initialState);
  }

  return (
    <div className="bg-offwhite">
      <FormContainer>
        <div>
          <h1 className="text-center font-bold text-3xl text-secondary pt-4 pb-4">
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
                sx={{ width: "25rem", padding: 0 }}
                label="Location *"
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
                  const isValid = newValue && dayjs(newValue).isValid();
                  setSecurityRequestForm({
                    ...securityRequestForm,
                    serviceRequest: {
                      ...securityRequestForm.serviceRequest,
                      requestedTime: isValid ? newValue.toISOString() : "",
                    },
                  });
                }}
              />

              <FormControl sx={{ width: "25rem" }} size="small">
                <InputLabel
                  sx={{
                    color: "#a4aab5",
                    fontSize: ".9rem",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Security Type *
                </InputLabel>
                <Select
                  name="security-type"
                  value={securityRequestForm.securityType}
                  className="bg-gray-50"
                  label="Security Type *"
                  sx={{ fontSize: ".9rem", fontFamily: "Poppins, sans-serif" }}
                  onChange={(e) => {
                    setSecurityRequestForm({
                      ...securityRequestForm,
                      securityType: e.target.value as string,
                    });
                  }}
                >
                  <MenuItem
                    value="Monitor"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Monitor
                  </MenuItem>
                  <MenuItem
                    value="Escort"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Escort
                  </MenuItem>
                  <MenuItem
                    value="Patrol"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Patrol
                  </MenuItem>
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
                <p>Made by Daniel and Colin</p>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[40rem]">
          <ServiceImages imgPath={giftPlaceholder} alt="present picture" />
        </div>
      </FormContainer>
    </div>
  );
}

export default SecurityForm;
