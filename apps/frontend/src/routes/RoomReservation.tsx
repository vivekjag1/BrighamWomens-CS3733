import React from "react";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";

// import {TextField, Button} from '@mui/material';

export function RoomReservation() {
  const dummyArray: string[] = [];
  dummyArray.push("Hello");
  dummyArray.push("World");
  return (
    <div className="min-h-screen max-h-fit bg-gray-200 flex justify-center items-start pt-[2rem]">
      <Card
        className="drop-shadow-2xl mb-6"
        sx={{ borderRadius: "10px", width: "30rem" }}
      >
        <CardContent>
          <h1 className="text-center font-bold text-3xl text-secondary">
            Reserve a Room
          </h1>
          <div className=" h-auto flex justify-center items-center w-[30rem]">
            <form
              noValidate
              autoComplete="off"
              className="space-y-4 flex flex-col justify-center items-center"
            >
              <Autocomplete
                disablePortal
                id="node selection box"
                options={dummyArray}
                sx={{ width: "20rem" }}
                renderInput={(params) => (
                  <TextField {...params} label="Select a room" />
                )}
              />
              <TextField
                id="outlined-basic"
                label="Reservation Name"
                variant="outlined"
                sx={{ width: "20rem" }}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Reservation Start Time"
                    sx={{ width: "20rem" }}
                  />
                  <DateTimePicker
                    label="Reservation End Time"
                    sx={{ width: "20rem" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                id="outlined-basic"
                label="Reservation Purpose"
                multiline
                maxRows={4}
                variant="outlined"
                sx={{ width: "20rem" }}
              />
              <FormControl sx={{ width: "20rem" }}>
                <InputLabel id="status dropdown"> Status</InputLabel>
                <Select labelId="status" id="status" label="status">
                  <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                  <MenuItem value={"Assigned"}>Assigned</MenuItem>
                  <MenuItem value={"In Progress"}>In Progress</MenuItem>
                  <MenuItem value={"Closed"}>Closed</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ width: "25rem" }}>
                <FormLabel id="Priority-buttons"> Priority</FormLabel>

                <RadioGroup row aria-labelledby="priority" name="priority">
                  <FormControlLabel
                    value="low"
                    control={<Radio />}
                    label="Low"
                  />
                  <FormControlLabel
                    value="medium"
                    control={<Radio />}
                    label="Medium"
                  />
                  <FormControlLabel
                    value="high"
                    control={<Radio />}
                    label="High"
                  />
                  <FormControlLabel
                    value="emergency"
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
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#013B96",
                    width: "8rem",
                  }}
                >
                  Submit
                </Button>
              </div>
              {/*<Stack direction="row" justfyContent="center"*/}
              {/*<Button variant = "contained">Submit</Button>*/}
              {/* <Button variant = "contained">Submit</Button>*/}

              {/*</Stack>*/}

              {/*<TextField*/}
              {/*    label="Name"*/}
              {/*    variant="outlined"*/}
              {/*    fullWidth*/}
              {/*    className="mb-4"*/}
              {/*    required*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*    label="Email"*/}
              {/*    type="email"*/}
              {/*    variant="outlined"*/}
              {/*    fullWidth*/}
              {/*    className="mb-4"*/}
              {/*    required*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*    label="Message"*/}
              {/*    variant="outlined"*/}
              {/*    fullWidth*/}
              {/*    multiline*/}
              {/*    rows={4}*/}
              {/*    className="mb-6"*/}
              {/*    required*/}
              {/*/>*/}
              {/*<Button variant="contained" color="primary" type="submit">*/}
              {/*    Send*/}
              {/*</Button>*/}
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RoomReservation;
