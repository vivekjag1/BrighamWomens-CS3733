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

export function SecurityRequest() {
  // const emptyForm = {
  //   request: {
  //     serviceID: "",
  //     type: "",
  //     roomNum: "",
  //     deliveryInstructions: "",
  //     requestingUsername: "",
  //     timeStamp: "",
  //     location: ""
  //   },
  //   securityType: "",
  //   numGuards:0
  // };
  //
  // const [formData, setFormData] =
  //   useState<SecurityRequestFields>(emptyForm);
  //
  // function clear() {
  //   setFormData(emptyForm);
  // }

  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      <Card sx={{ borderRadius: "10px" }}>
        <CardContent>
          <h1 className="text-center font-bold">Security Request</h1>
          <div className="w-120 h-auto flex justify-center items-center">
            <form noValidate autoComplete="off" className="space-y-4">
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                size="small"
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
                size="small"
                className="bg-gray-50"
                InputProps={{ style: { fontSize: ".9rem" } }}
                InputLabelProps={{
                  style: { color: "#a4aab5", fontSize: ".9rem" },
                }}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                helperText="Optional"
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
                      label="Basic date time picker"
                      className="bg-gray-50"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div>
                <InputLabel id="demo-simple-select-label">
                  Security Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  fullWidth
                  size="small"
                  className="bg-gray-50"
                >
                  <MenuItem value={10}>Monitor</MenuItem>
                  <MenuItem value={20}>Escort</MenuItem>
                  <MenuItem value={30}>Patrol</MenuItem>
                </Select>
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
              <div>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Status"
                  fullWidth
                  size="small"
                  className="bg-gray-50"
                >
                  <MenuItem value={10}>New </MenuItem>
                  <MenuItem value={20}>In Progress</MenuItem>
                  <MenuItem value={30}>Complete</MenuItem>
                </Select>
              </div>
              <FormControl>
                <FormLabel id="priority-radio button group">Priority</FormLabel>
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

              <div className="flex justify-end gap-8">
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
  );
}

export default SecurityRequest;
