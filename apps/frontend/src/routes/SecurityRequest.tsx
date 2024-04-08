// import React, { useState } from 'react';
import { Card, CardContent, Select, MenuItem } from "@mui/material";
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

export function SecurityRequest() {
  return (
    <div className="w-94vw h-screen overflow-y-scroll">
      <div className="w-full h-screen max-h-fit bg-gray-200 flex justify-center pt-[2rem]">
        <Card className="drop-shadow-2xl mb-6" sx={{ borderRadius: "10px" }}>
          <CardContent>
            <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
              Security Request
            </h1>
            <div className="h-auto flex justify-center items-center w-[30rem]">
              <form
                noValidate
                autoComplete="off"
                className="flex flex-col gap-6"
              >
                <TextField
                  label="Location"
                  variant="outlined"
                  fullWidth
                  sx={{ width: "25rem" }}
                  className="bg-gray-50"
                  InputProps={{ style: { fontSize: ".9rem" } }}
                  InputLabelProps={{
                    style: { color: "#a4aab5", fontSize: ".9rem" },
                  }}
                  // onChange={(e) => setFormData({
                  //   ...formData,
                  //   request: Object.assign(formData.request, {roomNum:"2"}),
                  // )}
                />
                <TextField
                  label="Requester"
                  variant="outlined"
                  fullWidth
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
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="Service time"
                        className="bg-gray-50"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div>
                  <FormControl sx={{ width: "25rem" }} size="small">
                    <FormLabel sx={{ fontSize: ".9rem" }}>
                      Security Type *
                    </FormLabel>
                    <Select
                      name="security-type"
                      className="bg-gray-50"
                      sx={{ fontSize: ".9rem" }}
                      displayEmpty
                    >
                      <MenuItem value="Monitor">Monitor</MenuItem>
                      <MenuItem value="Monitor">Escort</MenuItem>
                      <MenuItem value="Monitor">Patrol</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <TextField
                  label="Number of Personnel"
                  type="number"
                  fullWidth
                  size="small"
                  className="bg-gray-50"
                  InputProps={{ style: { fontSize: ".9rem" } }}
                  InputLabelProps={{
                    style: { color: "#a4aab5", fontSize: ".9rem" },
                  }}
                />
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

                <FormControl>
                  <FormLabel id="priority-radio button group">
                    Priority
                  </FormLabel>
                  <RadioGroup
                    row
                    // aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
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
                    // onClick={clear}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="contained"
                    style={{ width: "8rem" }}
                    // onClick={submit}
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

export default SecurityRequest;
