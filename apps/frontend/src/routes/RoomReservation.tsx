import React, { useState } from "react";
import { TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormControl from "@mui/material/FormControl";
import NodeDropdown from "../components/NodeDropdown.tsx";
import CustomTextField from "../components/CustomTextField.tsx";
import CustomStatusDropdown from "../components/CustomStatusDropdown.tsx";
import CustomPrioritySelector from "../components/CustomPrioritySelector.tsx";
import CustomClearButton from "../components/CustomClearButton.tsx";
import CustomSubmitButton from "../components/CustomSubmitButton.tsx";
import FormContainer from "../components/FormContainer.tsx";

// import {TextField, Button} from '@mui/material';

export function RoomReservation() {
  const dummyArray: string[] = [];
  dummyArray.push("Hello");
  dummyArray.push("World");
  const [nodeHolder, setNodeHolder] = useState<string>("");

  return (
    <FormContainer>
      <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
        Reserve a Room
      </h1>
      <div className="h-auto flex justify-center items-center w-[30rem]">
        <form
          noValidate
          autoComplete="off"
          className="space-y-4 flex flex-col justify-center items-center"
        >
          <NodeDropdown
            value={nodeHolder}
            sx={{ width: "25rem", padding: 0 }}
            label="Location *"
            onChange={(newValue: string) => {
              setNodeHolder(newValue);
            }}
          />

          <TextField
            id="outlined-basic"
            label="Reservation Name"
            variant="outlined"
            sx={{ width: "25rem" }}
            className="bg-gray-50"
            InputProps={{ style: { fontSize: ".9rem" } }}
            InputLabelProps={{
              style: { color: "#a4aab5", fontSize: ".9rem" },
            }}
            size="small"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DateTimePicker"]}
              sx={{ width: "25rem", padding: 0, margin: 0 }}
            >
              <DateTimePicker
                label="Reservation Start Time"
                className="bg-gray-50"
                sx={{ width: "25rem", padding: 0 }}
              />
              <DateTimePicker
                label="Reservation End Time"
                className="bg-gray-50"
                sx={{ width: "25rem", padding: 0, margin: 0 }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            id="outlined-basic"
            label="Reservation Purpose"
            multiline
            maxRows={4}
            variant="outlined"
            sx={{ width: "25rem" }}
            className="bg-gray-50"
            InputProps={{ style: { fontSize: ".9rem" } }}
            InputLabelProps={{
              style: { color: "#a4aab5", fontSize: ".9rem" },
            }}
            size="small"
          />

          <CustomTextField
            label="Description (optional)"
            multiline
            rows={3}
            size="small"
          />

          <FormControl sx={{ width: "25rem" }} size="small">
            <CustomStatusDropdown />
          </FormControl>

          <FormControl
            component="fieldset"
            margin="normal"
            sx={{ width: "25rem" }}
          >
            <CustomPrioritySelector />
          </FormControl>

          <div className="flex justify-between w-full mt-4 px-10">
            <CustomClearButton>Clear</CustomClearButton>

            <CustomSubmitButton>Submit</CustomSubmitButton>
          </div>
          <div className="text-center">
            <p>Made by Vivek Jagadeesh, Taeha Song and Mohamed Adem Djadid</p>
          </div>
        </form>
      </div>
    </FormContainer>
  );
}

export default RoomReservation;
