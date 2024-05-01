import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import NodeDropdown from "../../components/NodeDropdown.tsx";
import EmployeeDropdown from "../../components/EmployeeDropdown.tsx";
import CustomTextField from "../../components/CustomTextField.tsx";
import CustomDatePicker from "../../components/CustomDatePicker.tsx";
import FormContainer from "../../components/FormContainer.tsx";
import CustomStatusDropdown from "../../components/CustomStatusDropdown.tsx";
import CustomPrioritySelector from "../../components/CustomPrioritySelector.tsx";
import { MedicalDeviceDelivery } from "common/src/MedicalDeviceDelivery.ts";
import dayjs, { Dayjs } from "dayjs";
import { APIEndpoints } from "common/src/APICommon.ts";
import { useToast } from "../../components/useToast.tsx";
import { MakeProtectedPostRequest } from "../../MakeProtectedPostRequest.ts";
import { useAuth0 } from "@auth0/auth0-react";
import giftPlaceholder from "../../../assets/medicaldevice.jpg";
import ButtonRed from "../../components/ButtonRed.tsx";
import ButtonBlue from "../../components/ButtonBlue.tsx";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

const initialState: MedicalDeviceDelivery = {
  deviceType: "",
  quantity: 1,
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

export function MedicalDeviceForm() {
  const { getAccessTokenSilently } = useAuth0();

  const [medicalDeviceDelivery, setMedicalDeviceDelivery] =
    useState<MedicalDeviceDelivery>(initialState);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const { showToast } = useToast();
  const isEmployeeDisabled = ["Unassigned"].includes(
    medicalDeviceDelivery.serviceRequest.status,
  );

  function clear() {
    setDate(dayjs());
    setMedicalDeviceDelivery(initialState);
  }

  const validateForm = () => {
    const { status, assignedTo } = medicalDeviceDelivery.serviceRequest;
    const requiresEmployee = ["Assigned", "InProgress", "Closed"].includes(
      status,
    );

    return (
      medicalDeviceDelivery.deviceType &&
      medicalDeviceDelivery.quantity &&
      medicalDeviceDelivery.serviceRequest.requestingUsername &&
      medicalDeviceDelivery.serviceRequest.location &&
      medicalDeviceDelivery.serviceRequest.priority &&
      (!requiresEmployee || (requiresEmployee && assignedTo))
    );
  };

  async function submit() {
    const token = await getAccessTokenSilently();

    if (validateForm()) {
      try {
        const response = await MakeProtectedPostRequest(
          APIEndpoints.deviceRequest,
          medicalDeviceDelivery,
          token,
        );

        if (response.status === 200) {
          showToast("Medical Device Request sent!", "success");
          clear();
        } else {
          console.error("Submission failed with status: ", response.status);
          showToast("Medical Device Request failed!", "error");
        }
      } catch (error) {
        console.error("Error submitting the form: ", error);
        showToast("Medical Device Request failed!", "error");
      }
    } else {
      showToast("Fill out all the required information!", "warning");
    }
  }

  return (
    <div className="bg-offwhite">
      <FormContainer imgPath={giftPlaceholder} alt={"Medical Device Delivery"}>
        <div>
          <h1 className="text-center font-bold text-3xl text-secondary pt-4 pb-2">
            Medicine Device Request
          </h1>
          <p className="text-center text-sm text-gray-500 pb-5">
            Made by Andy and Francesco
          </p>
          <div className="h-auto flex justify-center items-center w-[30rem]">
            <form
              noValidate
              autoComplete="off"
              className="space-y-4 flex flex-col justify-center items-center"
            >
              <EmployeeDropdown
                value={medicalDeviceDelivery.serviceRequest.requestingUsername}
                sx={{ width: "25rem", padding: 0 }}
                label="Requesting Employee *"
                onChange={(newValue) =>
                  setMedicalDeviceDelivery({
                    ...medicalDeviceDelivery,
                    serviceRequest: {
                      ...medicalDeviceDelivery.serviceRequest,
                      requestingUsername: newValue,
                    },
                  })
                }
                disabled={false}
              />

              <NodeDropdown
                value={medicalDeviceDelivery.serviceRequest.location}
                sx={{ width: "25rem", padding: 0 }}
                label="Location *"
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
                  const isValid = newValue && dayjs(newValue).isValid();
                  setMedicalDeviceDelivery(
                    (currentMedicalDeviceDelivery: MedicalDeviceDelivery) => ({
                      ...currentMedicalDeviceDelivery,
                      serviceRequest: {
                        ...currentMedicalDeviceDelivery.serviceRequest,
                        requestedTime: isValid ? newValue.toISOString() : "",
                      },
                    }),
                  );
                }}
              />

              <FormControl
                sx={{ width: "25rem", fontFamily: "Poppins, sans-serif" }}
                size="small"
              >
                <InputLabel
                  sx={{
                    color: "#a4aab5",
                    fontSize: ".9rem",
                    "& .MuiInputLabel-root.Mui-focused": {
                      fontFamily: "Poppins, sans-serif",
                    },
                  }}
                >
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
                  <MenuItem
                    value="stretcher"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Stretcher
                  </MenuItem>
                  <MenuItem
                    value="wheelchair"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Wheelchair
                  </MenuItem>
                  <MenuItem
                    value="crutches"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Crutches
                  </MenuItem>
                  <MenuItem
                    value="hospital bed"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Hospital Bed
                  </MenuItem>
                  <MenuItem
                    value="iv pump"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    IV Pump
                  </MenuItem>
                  <MenuItem
                    value="patient monitor"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Patient Monitor
                  </MenuItem>
                  <MenuItem
                    value="defibrillator"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Defibrillator
                  </MenuItem>
                  <MenuItem
                    value="anesthesia machine"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Anesthesia Machine
                  </MenuItem>
                  <MenuItem
                    value="ventilator"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Ventilator
                  </MenuItem>
                  <MenuItem
                    value="catheter"
                    sx={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Catheter
                  </MenuItem>
                </Select>
              </FormControl>

              <CustomTextField
                label="Quantity"
                type="number"
                value={medicalDeviceDelivery.quantity.toString()}
                InputProps={{
                  inputProps: { min: 1 },
                }}
                onChange={(e) =>
                  setMedicalDeviceDelivery({
                    ...medicalDeviceDelivery,
                    quantity:
                      e.target.value === "" ? 0 : parseInt(e.target.value, 10),
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
                  onChange={(e) => {
                    const newStatus = e.target.value
                      ? e.target.value.toString()
                      : "";
                    let newAssignedTo =
                      medicalDeviceDelivery.serviceRequest.assignedTo;

                    if (newStatus === "Unassigned") {
                      newAssignedTo = "Unassigned";
                    } else {
                      newAssignedTo = "";
                    }

                    setMedicalDeviceDelivery({
                      ...medicalDeviceDelivery,
                      serviceRequest: {
                        ...medicalDeviceDelivery.serviceRequest,
                        status: newStatus,
                        assignedTo: newAssignedTo,
                      },
                    });
                  }}
                />
              </FormControl>

              <EmployeeDropdown
                value={medicalDeviceDelivery.serviceRequest.assignedTo}
                sx={{ width: "25rem", padding: 0 }}
                label="Assigned Employee *"
                // employees={employees}
                onChange={(newValue: string) => {
                  let newStatus = medicalDeviceDelivery.serviceRequest.status;

                  if (newValue && newStatus === "Unassigned") {
                    newStatus = "Assigned";
                  }

                  setMedicalDeviceDelivery((medicalDeviceDelivery) => ({
                    ...medicalDeviceDelivery,
                    serviceRequest: {
                      ...medicalDeviceDelivery.serviceRequest,
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

export default MedicalDeviceForm;
