import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  InputLabel,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormControl from "@mui/material/FormControl";
//import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import NodeDropdown from "../components/NodeDropdown.tsx";

// import {TextField, Button} from '@mui/material';

export function RoomReservation() {
  const dummyArray: string[] = [];
  dummyArray.push("Hello");
  dummyArray.push("World");
  const [nodeHolder, setNodeHolder] = useState<string>("");

  return (
    <div className="h-screen">
      <div className="w-full h-screen bg-gray-200 pt-[3rem] flex justify-center">
        <div>
          <Card className="drop-shadow-2xl" sx={{ borderRadius: "10px" }}>
            <CardContent>
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
                  <TextField
                    label="Description (optional)"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    className="bg-gray-50"
                    InputProps={{ style: { fontSize: ".9rem" } }}
                    InputLabelProps={{
                      style: { color: "#a4aab5", fontSize: ".9rem" },
                    }}
                  />
                  <FormControl sx={{ width: "25rem" }} size="small">
                    <InputLabel sx={{ color: "#a4aab5", fontSize: ".9rem" }}>
                      Status *
                    </InputLabel>
                    <Select
                      name="status"
                      className="bg-gray-50"
                      sx={{ fontSize: ".9rem" }}
                      label="Status *"
                    >
                      <MenuItem value="Unassigned">Unassigned</MenuItem>
                      <MenuItem value="Assigned">Assigned</MenuItem>
                      <MenuItem value="InProgress">InProgress</MenuItem>
                      <MenuItem value="Closed">Closed</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    component="fieldset"
                    margin="normal"
                    sx={{ width: "25rem" }}
                  >
                    <FormLabel sx={{ fontSize: ".9rem" }}>Priority *</FormLabel>
                    <RadioGroup
                      row
                      name="priority"
                      sx={{ marginLeft: ".52rem" }}
                    >
                      <FormControlLabel
                        value="Low"
                        control={<Radio />}
                        label="Low"
                      />
                      <FormControlLabel
                        value="Medium"
                        control={<Radio />}
                        label="Medium"
                      />
                      <FormControlLabel
                        value="High"
                        control={<Radio />}
                        label="High"
                      />
                      <FormControlLabel
                        value="Emergency"
                        control={<Radio />}
                        label="Emergency"
                      />
                    </RadioGroup>
                  </FormControl>
                  <div className="flex justify-between w-full mt-4">
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#EA422D",
                        color: "white",
                        width: "8rem",
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      variant="contained"
                      className="justify-end"
                      style={{ backgroundColor: "secondary", width: "8rem" }}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
          <div className="text-center mt-4">
            <p>Made by Vivek Jagadeesh, Taeha Song and Mohamed Adem Djadid</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomReservation;
