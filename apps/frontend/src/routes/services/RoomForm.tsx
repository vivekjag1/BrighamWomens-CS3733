import React, { useState } from "react";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormControl from "@mui/material/FormControl";
import NodeDropdown from "../../components/NodeDropdown.tsx";
import EmployeeDropdown from "../../components/EmployeeDropdown.tsx";
import CustomTextField from "../../components/CustomTextField.tsx";
import CustomStatusDropdown from "../../components/CustomStatusDropdown.tsx";
import CustomPrioritySelector from "../../components/CustomPrioritySelector.tsx";
import CustomClearButton from "../../components/CustomClearButton.tsx";
import CustomSubmitButton from "../../components/CustomSubmitButton.tsx";
import FormContainer from "../../components/FormContainer.tsx";
import { RoomReservationType } from "common/src/RoomReservationType.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import dayjs, { Dayjs } from "dayjs";
import { useToast } from "../../components/useToast.tsx";
import { MakeProtectedPostRequest } from "../../MakeProtectedPostRequest.ts";
import { useAuth0 } from "@auth0/auth0-react";
import ServiceImages from "../../components/ServiceImages.tsx";
import giftPlaceholder from "../../../assets/gift-placeholder.jpg";

const initialState: RoomReservationType = {
  endTime: dayjs().toISOString(),
  reservationReason: "",
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
export function RoomForm() {
  const { getAccessTokenSilently } = useAuth0();

  const [roomReservation, setRoomReservation] =
    useState<RoomReservationType>(initialState);
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const { showToast } = useToast();
  const isEmployeeDisabled = ["Unassigned"].includes(
    roomReservation.serviceRequest.status,
  );

  const validateForm = () => {
    const { status, assignedTo } = roomReservation.serviceRequest;
    const requiresEmployee = ["Assigned", "InProgress", "Closed"].includes(
      status,
    );

    const isValid =
      roomReservation.reservationReason &&
      roomReservation.endTime &&
      roomReservation.serviceRequest.location &&
      roomReservation.serviceRequest.requestingUsername &&
      roomReservation.serviceRequest.requestedTime &&
      roomReservation.serviceRequest.priority &&
      (!requiresEmployee || (requiresEmployee && assignedTo));

    console.log(roomReservation);
    return isValid;
  };

  async function submit() {
    const token = await getAccessTokenSilently();

    if (validateForm()) {
      try {
        const response = await MakeProtectedPostRequest(
          APIEndpoints.roomReservation,
          roomReservation,
          token,
        );
        if (response.status === 200) {
          console.log("Submission successful");
          //alert("Room Reservation sent!");
          showToast("Room Reservation sent!", "success");
          clear();
        } else {
          console.error("Submission failed with status:", response.status);
          //alert("Room Reservation failed!");
        }
      } catch (error) {
        console.error("Error submitting the form!: ", error);
        //alert("Room Reservation Failed!");
        showToast("Room Reservation failed!", "error");
      }
    } else {
      //alert("You must fill out all the required information");
      showToast("Fill out all the required information!", "warning");
    }
  }
  function clear() {
    setStartDate(dayjs());
    setEndDate(dayjs());
    setRoomReservation(initialState);
  }
  return (
    <div className="bg-offwhite">
      <FormContainer>
        <div>
          <h1 className="text-center font-bold text-3xl text-secondary pt-4 pb-4">
            Reserve a Room
          </h1>
          <div className="h-auto flex justify-center items-center w-[30rem]">
            <form
              noValidate
              autoComplete="off"
              className="space-y-4 flex flex-col justify-center items-center"
            >
              <EmployeeDropdown
                value={roomReservation.serviceRequest.requestingUsername}
                sx={{ width: "25rem", padding: 0 }}
                label="Requesting Employee *"
                onChange={(newValue) =>
                  setRoomReservation({
                    ...roomReservation,
                    serviceRequest: {
                      ...roomReservation.serviceRequest,
                      requestingUsername: newValue,
                    },
                  })
                }
                disabled={false}
              />

              <NodeDropdown
                sx={{ width: "25rem", padding: 0 }}
                label="Location *"
                value={roomReservation.serviceRequest.location}
                onChange={(newValue: string) =>
                  setRoomReservation((roomReservation) => ({
                    ...roomReservation,
                    serviceRequest: {
                      ...roomReservation.serviceRequest,
                      location: newValue,
                    },
                  }))
                }
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={startDate}
                  onChange={(newValue) => {
                    const isValid = newValue && dayjs(newValue).isValid();
                    setRoomReservation((currentReservation) => ({
                      ...currentReservation,
                      serviceRequest: {
                        ...currentReservation.serviceRequest,
                        requestedTime: isValid ? newValue.toISOString() : "",
                      },
                    }));
                  }}
                  label="Reservation Start Time"
                  className="bg-gray-50"
                  sx={{
                    width: "25rem",
                    padding: 0,
                    "& .MuiInputLabel-root.Mui-focused": {
                      fontFamily: "Poppins, sans-serif",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontFamily: "Poppins, sans-serif",
                    },
                  }}
                />
                <DateTimePicker
                  value={endDate}
                  onChange={(newValue) => {
                    const isValid = newValue && dayjs(newValue).isValid();
                    setRoomReservation((currentReservation) => ({
                      ...currentReservation,
                      serviceRequest: {
                        ...currentReservation.serviceRequest,
                        endTime: isValid ? newValue.toISOString() : "",
                      },
                    }));
                  }}
                  label="Reservation End Time"
                  className="bg-gray-50"
                  sx={{
                    width: "25rem",
                    padding: 0,
                    "& .MuiInputLabel-root.Mui-focused": {
                      fontFamily: "Poppins, sans-serif",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontFamily: "Poppins, sans-serif",
                    },
                  }}
                />
              </LocalizationProvider>
              <TextField
                value={roomReservation.reservationReason}
                onChange={(e) =>
                  setRoomReservation({
                    ...roomReservation,
                    reservationReason: e.target.value,
                  })
                }
                id="outlined-basic"
                label="Reservation Purpose"
                multiline
                maxRows={4}
                variant="outlined"
                sx={{ width: "25rem", fontFamily: "Poppins, sans-serif" }}
                className="bg-gray-50"
                InputProps={{
                  style: {
                    fontSize: ".9rem",
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "#a4aab5",
                    fontSize: ".9rem",
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
                size="small"
              />

              <CustomTextField
                value={roomReservation.serviceRequest.description}
                onChange={(e) =>
                  setRoomReservation({
                    ...roomReservation,
                    serviceRequest: {
                      ...roomReservation.serviceRequest,
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
                  value={roomReservation.serviceRequest.status}
                  onChange={(e) => {
                    const newStatus = e.target.value
                      ? e.target.value.toString()
                      : "";
                    let newAssignedTo =
                      roomReservation.serviceRequest.assignedTo;

                    if (newStatus === "Unassigned") {
                      newAssignedTo = "Unassigned";
                    }

                    setRoomReservation({
                      ...roomReservation,
                      serviceRequest: {
                        ...roomReservation.serviceRequest,
                        status: newStatus,
                        assignedTo: newAssignedTo,
                      },
                    });
                  }}
                />
              </FormControl>

              <EmployeeDropdown
                value={roomReservation.serviceRequest.assignedTo}
                sx={{ width: "25rem", padding: 0 }}
                label="Assigned Employee *"
                // employees={employees}
                onChange={(newValue: string) => {
                  let newStatus = roomReservation.serviceRequest.status;

                  if (newValue && newStatus === "Unassigned") {
                    newStatus = "Assigned";
                  }

                  setRoomReservation((currentReservation) => ({
                    ...currentReservation,
                    serviceRequest: {
                      ...currentReservation.serviceRequest,
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
                  value={roomReservation.serviceRequest.priority}
                  onChange={(e) =>
                    setRoomReservation({
                      ...roomReservation,
                      serviceRequest: {
                        ...roomReservation.serviceRequest,
                        priority: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>

              <div className="flex justify-between w-full mt-4 px-10">
                <CustomClearButton onClick={clear}>Clear</CustomClearButton>

                <CustomSubmitButton onClick={submit}>Submit</CustomSubmitButton>
              </div>
              <div className="text-center">
                <p>Made by Vivek, Taeha, and Mohamed</p>
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

export default RoomForm;
