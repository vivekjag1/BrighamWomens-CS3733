// import React, { useState } from 'react';
import { Card, CardContent, Select, MenuItem, InputLabel } from "@mui/material";
import { TextField, Button } from "@mui/material";
// import {SecurityRequestFields} from "common/src/SecurityRequestFields.ts";
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
import UseNumberInput from "../components/NumberInput.tsx";

export function SecurityRequest() {
  // const [formData, setFormData] =
  //   useState<SecurityRequestFields>(
  //     //initialState?
  //   );

  //
  // const [error, setError] = useState(false);
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   setError(value === "");
  // };

  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      <Card sx={{ borderRadius: "10px" }}>
        <CardContent>
          <h1 className="text-center font-bold">Security Request</h1>
          <div className="w-96 h-auto flex justify-center items-center">
            <form noValidate autoComplete="off" className="space-y-4">
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                className="mb-4"
                // onChange={(e) => setFormData({
                //   ...formData,
                //   request: Object.assign(formData.request, {roomNum:"2"}),
                // )}
              />
              <TextField
                label="Requester"
                variant="outlined"
                fullWidth
                className="mb-4"
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                className="mb-6"
                helperText="Optional"
              />
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker label="Basic date time picker" />
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
                  // value={age}
                  label="Age"
                  fullWidth
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Monitor</MenuItem>
                  <MenuItem value={20}>Escort</MenuItem>
                  <MenuItem value={30}>Patrol</MenuItem>
                </Select>
              </div>
              <UseNumberInput></UseNumberInput>
              <div>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Status"
                  fullWidth
                  // onChange={handleChange}
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
