import React from "react";
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
export function MedicalDeviceDeliveryForm() {
  return (
    <div className="w-95vw h-screen overflow-y-scroll">
      <div className="w-full min-h-screen max-h-fit bg-gray-200 flex justify-center items-start pt-[2rem]">
        <Card className="drop-shadow-2xl mb-6" sx={{ borderRadius: "10px" }}>
          <CardContent>
            <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
              {" "}
              Medical Device Request
            </h1>
            <div className="h-auto flex justify-center items-center w-[30rem] ">
              <form
                noValidate
                autoComplete="off"
                className="flex flex-col gap-6"
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
                />
                <TextField
                  variant="outlined"
                  label="Location"
                  fullWidth
                  sx={{ width: "25rem" }}
                  className="bg-gray-50"
                  size="small"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker label="Service Due Date" />
                </LocalizationProvider>
                <TextField
                  label="Description (optional)"
                  variant="outlined"
                  fullWidth
                  sx={{ width: "25rem" }}
                  className="bg-gray-50"
                  size="small"
                />
                <FormControl>
                  <InputLabel>Device Type</InputLabel>
                  <Select label="Device-Type">
                    <MenuItem value="stretcher">Stretcher</MenuItem>
                    <MenuItem value="wheelchair">Wheelchair</MenuItem>
                    <MenuItem value="crutches">Crutches</MenuItem>
                    <MenuItem value="hospital bed">Hospital Bed</MenuItem>
                    <MenuItem value="iv pump">IV Pump</MenuItem>
                    <MenuItem value="patient monitor">Patient Monitor</MenuItem>
                    <MenuItem value="defibrillator">Defibrillator</MenuItem>
                    <MenuItem value="anesthesia machine">
                      Anesthesia Machine
                    </MenuItem>
                    <MenuItem value="ventilator">Ventilator</MenuItem>
                    <MenuItem value="catheter">Catheter</MenuItem>
                  </Select>
                </FormControl>
                <TextField label="Quantity" type="number" />
                <FormControl sx={{ width: "25rem" }} size="small">
                  <FormLabel sx={{ fontSize: ".9rem" }}>Status</FormLabel>
                  <Select
                    name="status"
                    className="bg-gray-50"
                    sx={{ fontSize: ".9rem" }}
                    displayEmpty
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
                  <RadioGroup row name="priority" sx={{ marginLeft: ".52rem" }}>
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
                    style={{ backgroundColor: "#013B96", width: "8rem" }}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MedicalDeviceDeliveryForm;
