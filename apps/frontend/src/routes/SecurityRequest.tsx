// import React, { useState } from 'react';
import { Card, CardContent, Select, MenuItem, InputLabel } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import {SecurityRequestFields} from "common/src/SecurityRequestFields.ts";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import NodeDropdown from "../components/NodeDropdown.tsx";
import { useState } from "react";
//import Autocomplete from "@mui/material/Autocomplete";

export function SecurityRequest() {
  const [nodeHolder, setNodeHolder] = useState<string>("");

  return (
    <div className="w-95vw h-screen overflow-y-scroll">
      <div className="w-full h-screen bg-gray-200 pt-[3rem] flex justify-center">
        <div>
          <Card className="drop-shadow-2xl" sx={{ borderRadius: "10px" }}>
            <CardContent>
              <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
                Security Request
              </h1>
              <div className="h-auto flex justify-center items-center w-[30rem]">
                <form
                  noValidate
                  autoComplete="off"
                  className="space-y-4 flex flex-col justify-center items-center"
                >
                  <TextField
                    label="Requesting Username"
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

                  {/*<Autocomplete*/}
                  {/*    disablePortal*/}
                  {/*    id="combo-box-location"*/}
                  {/*    options={[*/}
                  {/*        {label: "BTM Conference"},*/}
                  {/*        {label: "Nuero Waiting Room"},*/}
                  {/*        {label: "Orthopedics and Rhemutalogy"},*/}
                  {/*    ]}*/}
                  {/*    sx={{width: "25rem"}}*/}
                  {/*    className="bg-gray-50"*/}
                  {/*    size="small"*/}
                  {/*    renderInput={(params) => (*/}
                  {/*        <TextField {...params}*/}
                  {/*                   label="Location *"*/}
                  {/*                   InputLabelProps={{*/}
                  {/*                       style: {color: "#a4aab5", fontSize: ".9rem"},*/}
                  {/*                   }}*/}
                  {/*        />*/}
                  {/*    )}*/}
                  {/*/>*/}

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
                      Security Type *
                    </InputLabel>
                    <Select
                      name="security-type"
                      className="bg-gray-50"
                      label="Security Type *"
                      sx={{ fontSize: ".9rem" }}
                    >
                      <MenuItem value="Monitor">Monitor</MenuItem>
                      <MenuItem value="Monitor">Escort</MenuItem>
                      <MenuItem value="Monitor">Patrol</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Number of Personnel *"
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
                      style={{ backgroundColor: "#013B96", width: "8rem" }}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
          <div className="text-center mt-4">
            <p>Made by Daniel Gorbunov, Colin Masucci and Lily Jones</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityRequest;
