import React, { useState } from "react";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import NodeDropdown from "../../components/NodeDropdown.tsx";
import EmployeeDropdown from "../../components/EmployeeDropdown.tsx";
import CustomTextField from "../../components/CustomTextField.tsx";
import CustomDatePicker from "../../components/CustomDatePicker.tsx";
import CustomStatusDropdown from "../../components/CustomStatusDropdown.tsx";
import { foodDeliveryService } from "common/src/foodDelivery.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import dayjs, { Dayjs } from "dayjs";
import { useToast } from "../../components/useToast.tsx";
import { MakeProtectedPostRequest } from "../../MakeProtectedPostRequest.ts";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonRed from "../../components/ButtonRed.tsx";
import ButtonBlue from "../../components/ButtonBlue.tsx";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import FormContainer from "../../components/FormContainer.tsx";
import FoodDeliveryIMG from "../../../assets/FoodDeliveryIMG.jpg";
import CustomPrioritySelector from "../../components/CustomPrioritySelector.tsx";

const initialState: foodDeliveryService = {
  protein: "",
  side: "",
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

export function FoodDeliveryserviceForm() {
  const { getAccessTokenSilently } = useAuth0();

  const [foodDeliveryserviceRequest, setfoodDeliveryserviceRequest] =
    useState<foodDeliveryService>(initialState);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const { showToast } = useToast();
  const isEmployeeDisabled = ["Unassigned"].includes(
    foodDeliveryserviceRequest.serviceRequest.status,
  );

  const validateForm = () => {
    const { status, assignedTo } = foodDeliveryserviceRequest.serviceRequest;
    const requiresEmployee = ["Assigned", "InProgress", "Closed"].includes(
      status,
    );
    // console.log(
    //   foodDeliveryserviceRequest.protein,
    //   foodDeliveryserviceRequest.side,
    //   foodDeliveryserviceRequest.serviceRequest.requestingUsername,
    //   foodDeliveryserviceRequest.serviceRequest.location,
    //   foodDeliveryserviceRequest.serviceRequest.priority,
    // );
    return (
      foodDeliveryserviceRequest.protein &&
      foodDeliveryserviceRequest.side &&
      foodDeliveryserviceRequest.serviceRequest.requestingUsername &&
      foodDeliveryserviceRequest.serviceRequest.location &&
      foodDeliveryserviceRequest.serviceRequest.priority &&
      (!requiresEmployee || (requiresEmployee && assignedTo))
    );
  };

  async function submit() {
    const token = await getAccessTokenSilently();
    if (validateForm()) {
      try {
        const response = await MakeProtectedPostRequest(
          APIEndpoints.foodDeliveryservicePostRequests,
          foodDeliveryserviceRequest,
          token,
        );
        if (response.status === 200) {
          //alert("fooddeliveryservice Request sent!");
          showToast("Food Delivery Service Request sent!", "success");
          clear();
        } else {
          console.error("Submission failed with status:", response.status);
          //alert("fooddeliveryservice Request failed!");
          showToast("Food Delivery Service Request failed!", "error");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        //alert("fooddeliveryservice Request failed!");
        showToast("Food Delivery Service Request failed!", "error");
      }
    } else {
      //alert("You must fill out all the required information!");
      showToast("Fill out all the required information!", "warning");
    }
  }

  function clear() {
    setDate(dayjs());
    setfoodDeliveryserviceRequest(initialState);
  }

  return (
    <div className="bg-offwhite">
      <FormContainer imgPath={FoodDeliveryIMG} alt={"Food Delivery"}>
        <div>
          <h1 className="text-center font-bold text-3xl text-secondary pt-4 pb-2">
            Food Delivery
          </h1>
          <p className="text-center text-sm text-gray-500 pb-5">Made by Adem</p>

          <div className="h-auto flex justify-center items-center w-[30rem]">
            <form
              noValidate
              autoComplete="off"
              className="space-y-4 flex flex-col justify-center items-center"
            >
              <EmployeeDropdown
                value={
                  foodDeliveryserviceRequest.serviceRequest.requestingUsername
                }
                sx={{ width: "25rem", padding: 0 }}
                label="Requesting Employee *"
                onChange={(newValue) =>
                  setfoodDeliveryserviceRequest({
                    ...foodDeliveryserviceRequest,
                    serviceRequest: {
                      ...foodDeliveryserviceRequest.serviceRequest,
                      requestingUsername: newValue,
                    },
                  })
                }
                disabled={false}
              />

              <NodeDropdown
                sx={{ width: "25rem", padding: 0 }}
                label="Location *"
                value={foodDeliveryserviceRequest.serviceRequest.location}
                onChange={(newValue: string) =>
                  setfoodDeliveryserviceRequest(() => ({
                    ...foodDeliveryserviceRequest,
                    serviceRequest: {
                      ...foodDeliveryserviceRequest.serviceRequest,
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
                  setfoodDeliveryserviceRequest(
                    (currentfoodDelveryRequest) => ({
                      ...currentfoodDelveryRequest,
                      serviceRequest: {
                        ...currentfoodDelveryRequest.serviceRequest,
                        requestedTime: isValid ? newValue.toISOString() : "",
                      },
                    }),
                  );
                }}
              />

              <Autocomplete
                disablePortal
                id="combo-box-service"
                options={[
                  { label: "Beef" },
                  { label: "Lamb" },
                  { label: "Chicken" },
                  { label: "Fish" },
                  { label: "Pork" },
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
                    label="Protein *"
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
                  foodDeliveryserviceRequest.protein
                    ? { label: foodDeliveryserviceRequest.protein }
                    : null
                }
                onChange={(
                  event: React.SyntheticEvent<Element, Event>,
                  newValue: { label: string } | null,
                ) =>
                  setfoodDeliveryserviceRequest({
                    ...foodDeliveryserviceRequest,
                    protein: newValue ? newValue.label : "",
                  })
                }
              />

              <Autocomplete
                disablePortal
                id="combo-box-equipment"
                options={[
                  { label: "Vegetables" },
                  { label: "Rice" },
                  { label: "Pasta" },
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
                    label="Side *"
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
                  foodDeliveryserviceRequest.side
                    ? { label: foodDeliveryserviceRequest.side }
                    : null
                }
                onChange={(
                  event: React.SyntheticEvent<Element, Event>,
                  newValue: { label: string } | null,
                ) =>
                  setfoodDeliveryserviceRequest({
                    ...foodDeliveryserviceRequest,
                    side: newValue ? newValue.label : "",
                  })
                }
              />

              <CustomTextField
                label="Additional Notes (optional)"
                multiline
                rows={3}
                value={foodDeliveryserviceRequest.serviceRequest.description}
                onChange={(e) =>
                  setfoodDeliveryserviceRequest({
                    ...foodDeliveryserviceRequest,
                    serviceRequest: {
                      ...foodDeliveryserviceRequest.serviceRequest,
                      description: e.target.value,
                    },
                  })
                }
                size="small"
              />

              <FormControl sx={{ width: "25rem" }} size="small">
                <CustomStatusDropdown
                  value={foodDeliveryserviceRequest.serviceRequest.status}
                  onChange={(e) => {
                    const newStatus = e.target.value
                      ? e.target.value.toString()
                      : "";
                    let newAssignedTo =
                      foodDeliveryserviceRequest.serviceRequest.assignedTo;

                    if (newStatus === "Unassigned") {
                      newAssignedTo = "Unassigned";
                    } else {
                      newAssignedTo = "";
                    }

                    setfoodDeliveryserviceRequest({
                      ...foodDeliveryserviceRequest,
                      serviceRequest: {
                        ...foodDeliveryserviceRequest.serviceRequest,
                        status: newStatus,
                        assignedTo: newAssignedTo,
                      },
                    });
                  }}
                />
              </FormControl>

              <EmployeeDropdown
                value={foodDeliveryserviceRequest.serviceRequest.assignedTo}
                sx={{ width: "25rem", padding: 0 }}
                label="Assigned Employee *"
                onChange={(newValue: string) => {
                  let newStatus =
                    foodDeliveryserviceRequest.serviceRequest.status;

                  if (newValue && newStatus === "Unassigned") {
                    newStatus = "Assigned";
                  }

                  setfoodDeliveryserviceRequest(() => ({
                    ...foodDeliveryserviceRequest,
                    serviceRequest: {
                      ...foodDeliveryserviceRequest.serviceRequest,
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
                  value={foodDeliveryserviceRequest.serviceRequest.priority}
                  onChange={(e) =>
                    setfoodDeliveryserviceRequest({
                      ...foodDeliveryserviceRequest,
                      serviceRequest: {
                        ...foodDeliveryserviceRequest.serviceRequest,
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

export default FoodDeliveryserviceForm;
