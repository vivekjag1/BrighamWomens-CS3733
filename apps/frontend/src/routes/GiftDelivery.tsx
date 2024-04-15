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
import { GiftDeliveryRequestObject } from "common/src/giftDeliveryRequest.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import dayjs, { Dayjs } from "dayjs";
import { useToast } from "../components/useToast.tsx";
import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
import { useAuth0 } from "@auth0/auth0-react";

const initialState: GiftDeliveryRequestObject = {
  sanitationTypeGift: "",
  requiredEquipmentGift: "",
  serviceRequest: {
    requestingUsername: "",
    location: "",
    priority: "",
    status: "Unassigned",
    description: "",
    requestedTime: dayjs().toISOString(),
  },
};

export function GiftDelivery(): JSX.Element {
  const { getAccessTokenSilently } = useAuth0();
  const [giftDeliveryRequest, setGiftDeliveryRequest] =
    useState<GiftDeliveryRequestObject>(initialState);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const { showToast } = useToast();

  const validateForm = () => {
    return (
      giftDeliveryRequest.sanitationTypeGift &&
      giftDeliveryRequest.requiredEquipmentGift &&
      giftDeliveryRequest.serviceRequest.requestingUsername &&
      giftDeliveryRequest.serviceRequest.location &&
      giftDeliveryRequest.serviceRequest.priority
    );
  };

  async function submit() {
    const token = await getAccessTokenSilently();
    if (validateForm()) {
      try {
        const response = await MakeProtectedPostRequest(
          APIEndpoints.sanitationPostRequests,
          giftDeliveryRequest,
          token,
        );

        if (response.status === 200) {
          console.log("Submission successful", response.data);
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
    <FormContainer>
      <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
        Gift Delivery Request
      </h1>
      <div className="h-auto flex justify-center items-center w-[30rem]">
        <form
          noValidate
          autoComplete="off"
          className="space-y-4 flex flex-col justify-center items-center"
        >
          <CustomTextField
            label="Requesting Username"
            value={giftDeliveryRequest.serviceRequest.requestingUsername}
            onChange={(e) =>
              setGiftDeliveryRequest({
                ...giftDeliveryRequest,
                serviceRequest: {
                  ...giftDeliveryRequest.serviceRequest,
                  requestingUsername: e.target.value,
                },
              })
            }
            required
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
              { label: "Wrapped" },
              { label: "Birthday" },
              { label: "Mothersday" },
              { label: "Fathersday" },
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
              giftDeliveryRequest.sanitationTypeGift
                ? { label: giftDeliveryRequest.sanitationTypeGift }
                : null
            }
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              newValue: { label: string } | null,
            ) =>
              setGiftDeliveryRequest({
                ...giftDeliveryRequest,
                sanitationTypeGift: newValue ? newValue.label : "",
              })
            }
          />

          <Autocomplete
            disablePortal
            id="combo-box-equipment"
            options={[
              { label: "Delicate" },
              { label: "Heavy" },
              { label: "Hazardous" },
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
              giftDeliveryRequest.requiredEquipmentGift
                ? { label: giftDeliveryRequest.requiredEquipmentGift }
                : null
            }
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              newValue: { label: string } | null,
            ) =>
              setGiftDeliveryRequest({
                ...giftDeliveryRequest,
                requiredEquipmentGift: newValue ? newValue.label : "",
              })
            }
          />
          <CustomTextField
            label="Sender Name"
            value={giftDeliveryRequest.serviceRequest.requestingUsername}
            onChange={(e) =>
              setGiftDeliveryRequest({
                ...giftDeliveryRequest,
                serviceRequest: {
                  ...giftDeliveryRequest.serviceRequest,
                  requestingUsername: e.target.value,
                },
              })
            }
            required
          />

          <CustomTextField
            value={giftDeliveryRequest.serviceRequest.description}
            onChange={(e) =>
              setGiftDeliveryRequest({
                ...giftDeliveryRequest,
                serviceRequest: {
                  ...giftDeliveryRequest.serviceRequest,
                  description: e.target.value,
                },
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
              onChange={(e) =>
                setGiftDeliveryRequest({
                  ...giftDeliveryRequest,
                  serviceRequest: {
                    ...giftDeliveryRequest.serviceRequest,
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

export default GiftDelivery;
