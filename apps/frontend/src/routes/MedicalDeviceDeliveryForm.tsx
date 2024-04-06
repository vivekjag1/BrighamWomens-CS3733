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
// import {TextField, Button} from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export function MedicalDeviceDeliveryForm() {
  return (
    <div>
      <div className="w-screen h-screen flex justify-center pt-12 bg-gray-200">
        <Card sx={{ borderRadius: "10px", width: "38vw", height: "85vh" }}>
          <CardContent sx={{ padding: "60px" }}>
            <div className="flex flex-col gap-6">
              <h1 className="text-center font-bold">Medical Device Request</h1>
              <form className="flex flex-col gap-6">
                <TextField variant="outlined" label="Employee Name" />
                <TextField variant="outlined" label="Location" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker label="Service Due Date" />
                </LocalizationProvider>
                <TextField
                  variant="outlined"
                  label="Description (optional)"
                  multiline
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
                <FormControl>
                  <InputLabel>Status</InputLabel>
                  <Select label="Status">
                    <MenuItem value="Unassigned">Unassigned</MenuItem>
                    <MenuItem value="Assignged">Assigned</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Priority</FormLabel>
                  <RadioGroup row>
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
                      value="Emegerency"
                      control={<Radio />}
                      label="Emergency"
                    />
                  </RadioGroup>
                </FormControl>
                <div className="flex justify-center gap-8 mb-[36px]">
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#F60000" }}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#003A96" }}
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
