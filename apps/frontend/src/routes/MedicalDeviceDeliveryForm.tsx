import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import NodeDropdown from "../components/NodeDropdown.tsx";
export function MedicalDeviceDeliveryForm() {
  const [nodeHolder, setNodeHolder] = useState<string>("");

  return (
    <div className=" h-screen ">
      <div className="w-full h-screen bg-gray-200 pt-[3rem] flex justify-center">
        <div>
          <Card className="drop-shadow-2xl" sx={{ borderRadius: "10px" }}>
            <CardContent>
              <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
                Medical Device Request
              </h1>
              <div className="h-auto flex justify-center items-center w-[30rem]">
                <form
                  noValidate
                  autoComplete="off"
                  className="space-y-4 flex flex-col justify-center items-center"
                >
                  <TextField
                    variant="outlined"
                    label="Employee Name"
                    fullWidth
                    sx={{ width: "25rem" }}
                    className="bg-gray-50"
                    InputProps={{ style: { fontSize: ".9rem" } }}
                    InputLabelProps={{
                      style: { color: "#a4aab5", fontSize: ".9rem" },
                    }}
                    size="small"
                    required
                  />
                  <NodeDropdown
                    value={nodeHolder}
                    onChange={(newValue: string) => {
                      setNodeHolder(newValue);
                    }}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DateTimePicker"]}
                      sx={{ width: "25rem", paddingBottom: ".3rem" }}
                    >
                      <DateTimePicker
                        label="Service Time *"
                        className="bg-gray-50"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <FormControl sx={{ width: "25rem" }} size="small">
                    <InputLabel sx={{ color: "#a4aab5", fontSize: ".9rem" }}>
                      Device Type *
                    </InputLabel>
                    <Select
                      name="device-type"
                      className="bg-gray-50"
                      label="Device Type *"
                      sx={{ fontSize: ".9rem" }}
                    >
                      <MenuItem value="stretcher">Stretcher</MenuItem>
                      <MenuItem value="wheelchair">Wheelchair</MenuItem>
                      <MenuItem value="crutches">Crutches</MenuItem>
                      <MenuItem value="hospital bed">Hospital Bed</MenuItem>
                      <MenuItem value="iv pump">IV Pump</MenuItem>
                      <MenuItem value="patient monitor">
                        Patient Monitor
                      </MenuItem>
                      <MenuItem value="defibrillator">Defibrillator</MenuItem>
                      <MenuItem value="anesthesia machine">
                        Anesthesia Machine
                      </MenuItem>
                      <MenuItem value="ventilator">Ventilator</MenuItem>
                      <MenuItem value="catheter">Catheter</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Quantity"
                    type="number"
                    fullWidth
                    size="small"
                    className="bg-gray-50"
                    InputProps={{
                      inputProps: { min: 0 },
                      style: { fontSize: ".9rem" },
                    }}
                    InputLabelProps={{
                      style: { color: "#a4aab5", fontSize: ".9rem" },
                    }}
                    required
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
                  <div className="flex justify-center gap-8">
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
                      style={{ backgroundColor: "#012D5A", width: "8rem" }}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
          <div className="text-center mt-4">
            <p>Made by Andy Truong and Francesco Di Mise</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalDeviceDeliveryForm;
