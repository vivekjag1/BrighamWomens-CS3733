import React, { useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  TextField,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NodeDropdown from "../components/NodeDropdown.tsx";

export function SanitationForm() {
  const [nodeHolder, setNodeHolder] = useState<string>("");

  return (
    <div className="h-screen ">
      <div className="w-full h-screen bg-gray-200 pt-[4rem] flex justify-center">
        <div>
          <Card className="drop-shadow-2xl" sx={{ borderRadius: "10px" }}>
            <CardContent>
              <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
                Sanitation Services
              </h1>
              <div className="h-auto flex justify-center items-center w-[30rem]">
                <form
                  noValidate
                  autoComplete="off"
                  className="space-y-4 flex flex-col justify-center items-center"
                >
                  <TextField
                    label="Employee Name"
                    variant="outlined"
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
                      sx={{ width: "25rem", paddingBottom: ".2rem" }}
                    >
                      <DateTimePicker
                        label="Service Time *"
                        className="bg-gray-50"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <Autocomplete
                    disablePortal
                    id="combo-box-service"
                    options={[
                      { label: "Clean" },
                      { label: "Deep Clean" },
                      { label: "Hazardous" },
                      { label: "Toxic" },
                    ]}
                    className="bg-gray-50"
                    size="small"
                    sx={{ width: "25rem" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Service Type *"
                        InputLabelProps={{
                          style: { color: "#a4aab5", fontSize: ".9rem" },
                        }}
                      />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-equipment"
                    options={[
                      { label: "Mop" },
                      { label: "Broom" },
                      { label: "Vacuum" },
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
                    sx={{ width: "25rem" }}
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
            <p>Made by Matthew Brown and Sulaiman Moukheiber</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SanitationForm;
