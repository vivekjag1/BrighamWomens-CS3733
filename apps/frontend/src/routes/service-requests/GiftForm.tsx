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
import { GiftDeliveryObject } from "common/src/GiftDelivery.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import dayjs, { Dayjs } from "dayjs";
import { useToast } from "../../components/useToast.tsx";
import { MakeProtectedPostRequest } from "../../MakeProtectedPostRequest.ts";
import { useAuth0 } from "@auth0/auth0-react";
import giftPlaceholder from "../../../assets/giftdelivery.jpg";
import ButtonRed from "../../components/ButtonRed.tsx";
import ButtonBlue from "../../components/ButtonBlue.tsx";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

const initialState: GiftDeliveryObject = {
  giftType: "",
  senderNote: "",
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

export function GiftForm(): JSX.Element {
  const { getAccessTokenSilently } = useAuth0();
  const [giftDeliveryRequest, setGiftDeliveryRequest] =
    useState<GiftDeliveryObject>(initialState);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const { showToast } = useToast();
  const isEmployeeDisabled = ["Unassigned"].includes(
    giftDeliveryRequest.serviceRequest.status,
  );

  const validateForm = () => {
    const { status, assignedTo } = giftDeliveryRequest.serviceRequest;
    const requiresEmployee = ["Assigned", "InProgress", "Closed"].includes(
      status,
    );

    return (
      giftDeliveryRequest.giftType &&
      giftDeliveryRequest.serviceRequest.requestingUsername &&
      giftDeliveryRequest.serviceRequest.location &&
      giftDeliveryRequest.serviceRequest.priority &&
      (!requiresEmployee || (requiresEmployee && assignedTo))
    );
  };

  async function submit() {
    const token = await getAccessTokenSilently();
    if (validateForm()) {
      try {
        const response = await MakeProtectedPostRequest(
          APIEndpoints.giftRequest,
          giftDeliveryRequest,
          token,
        );

        if (response.status === 200) {
          //alert("Sanitation Request sent!");
          showToast("Gift Request sent!", "success");
          clear();
        } else {
          console.error("Submission failed with status:", response.status);
          //alert("Sanitation Request failed!");
          showToast("Gift Request failed!", "error");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        //alert("Sanitation Request failed!");
        showToast("Gift Request failed!", "error");
      }
    } else {
      //alert("You must fill out all the required information!");
      showToast("Fill out all the required information!", "warning");
    }
  }

  function clear() {
    setDate(dayjs());
    setGiftDeliveryRequest(initialState);
  }

  return (
    <div className="bg-offwhite">
      <FormContainer imgPath={giftPlaceholder} alt={"Gift Delivery"}>
        <div>
          <h1 className="text-center font-bold text-3xl text-secondary pt-4 pb-2">
            Gift Delivery Request
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
                value={giftDeliveryRequest.serviceRequest.requestingUsername}
                sx={{ width: "25rem", padding: 0 }}
                label="Requesting Employee *"
                onChange={(newValue) =>
                  setGiftDeliveryRequest({
                    ...giftDeliveryRequest,
                    serviceRequest: {
                      ...giftDeliveryRequest.serviceRequest,
                      requestingUsername: newValue,
                    },
                  })
                }
                disabled={false}
              />

              <NodeDropdown
                sx={{ width: "25rem", padding: 0 }}
                label="Location *"
                value={giftDeliveryRequest.serviceRequest.location}
                onChange={(newValue: string) =>
                  setGiftDeliveryRequest(() => ({
                    ...giftDeliveryRequest,
                    serviceRequest: {
                      ...giftDeliveryRequest.serviceRequest,
                      location: newValue,
                    },
                  }))
                }
              />

              <CustomDatePicker
                value={date}
                onChange={(newValue) => {
                  const isValid = newValue && dayjs(newValue).isValid();
                  setGiftDeliveryRequest((currentgiftDeliveryRequest) => ({
                    ...currentgiftDeliveryRequest,
                    serviceRequest: {
                      ...currentgiftDeliveryRequest.serviceRequest,
                      requestedTime: isValid ? newValue.toISOString() : "",
                    },
                  }));
                }}
              />

              <Autocomplete
                disablePortal
                id="combo-box-service"
                options={[
                  { label: "Flowers" },
                  { label: "Chocolate" },
                  { label: "Books and Magazines" },
                  { label: "Card" },
                ]}
                className="bg-gray-50"
                size="small"
                sx={{ width: "25rem" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Gift Type *"
                    InputLabelProps={{
                      style: { color: "#a4aab5", fontSize: ".9rem" },
                    }}
                  />
                )}
                value={
                  giftDeliveryRequest.giftType
                    ? { label: giftDeliveryRequest.giftType }
                    : null
                }
                onChange={(
                  event: React.SyntheticEvent<Element, Event>,
                  newValue: { label: string } | null,
                ) =>
                  setGiftDeliveryRequest({
                    ...giftDeliveryRequest,
                    giftType: newValue ? newValue.label : "",
                  })
                }
              />
              <CustomTextField
                value={giftDeliveryRequest.senderNote}
                onChange={(e) =>
                  setGiftDeliveryRequest({
                    ...giftDeliveryRequest,
                    senderNote: e.target.value,
                  })
                }
                label="Note (optional)"
                multiline
                rows={3}
                size="small"
              />

              <FormControl sx={{ width: "25rem" }} size="small">
                <CustomStatusDropdown
                  value={giftDeliveryRequest.serviceRequest.status}
                  onChange={(e) => {
                    const newStatus = e.target.value
                      ? e.target.value.toString()
                      : "";
                    let newAssignedTo =
                      giftDeliveryRequest.serviceRequest.assignedTo;

                    if (newStatus === "Unassigned") {
                      newAssignedTo = "Unassigned";
                    } else {
                      newAssignedTo = "";
                    }

                    setGiftDeliveryRequest({
                      ...giftDeliveryRequest,
                      serviceRequest: {
                        ...giftDeliveryRequest.serviceRequest,
                        status: newStatus,
                        assignedTo: newAssignedTo,
                      },
                    });
                  }}
                />
              </FormControl>

              <EmployeeDropdown
                value={giftDeliveryRequest.serviceRequest.assignedTo}
                sx={{ width: "25rem", padding: 0 }}
                label="Assigned Employee *"
                onChange={(newValue: string) => {
                  let newStatus = giftDeliveryRequest.serviceRequest.status;

                  if (newValue && newStatus === "Unassigned") {
                    newStatus = "Assigned";
                  }

                  setGiftDeliveryRequest((giftDeliveryRequest) => ({
                    ...giftDeliveryRequest,
                    serviceRequest: {
                      ...giftDeliveryRequest.serviceRequest,
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
                  value={giftDeliveryRequest.serviceRequest.priority}
                  onChange={(e) =>
                    setGiftDeliveryRequest({
                      ...giftDeliveryRequest,
                      serviceRequest: {
                        ...giftDeliveryRequest.serviceRequest,
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

export default GiftForm;
