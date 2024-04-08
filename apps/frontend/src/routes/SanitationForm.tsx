import React from "react";
import {
  Card,
  CardContent,
  Checkbox,
  FormControl,
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
  InputLabel,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export function SanitationForm() {
  const selectedTags = ["Mop", "Broom"];
  const tagOptions = ["Mop", "Broom", "Toxic", "Biohazard"];

  return (
    <div className="min-h-screen max-h-fit bg-gray-200 flex justify-center items-start pt-[2rem]">
      <Card className="drop-shadow-2xl mb-6" sx={{ borderRadius: "10px" }}>
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
                className="mb-4"
                sx={{ width: "25rem" }}
                required
              />
              <Autocomplete
                disablePortal
                id="combo-box-location"
                options={[
                  { label: "BTM Conference" },
                  { label: "Nuero Waiting Room" },
                  { label: "Orthopedics and Rhemutalogy" },
                ]}
                sx={{ width: "25rem" }}
                renderInput={(params) => (
                  <TextField {...params} label="Location *" />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-service"
                options={[
                  { label: "Clean" },
                  { label: "Deep Clean" },
                  { label: "Hazardous" },
                  { label: "Toxic" },
                ]}
                sx={{ width: "25rem" }}
                renderInput={(params) => (
                  <TextField {...params} label="Service Type *" />
                )}
              />
              <FormControl sx={{ m: 1, width: "25rem" }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Necessary Equipment
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedTags}
                  input={<OutlinedInput label="Necessary Equipment" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {tagOptions.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      <Checkbox checked={selectedTags.indexOf(tag) > -1} />
                      <ListItemText primary={tag} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                className="mb-6"
                sx={{ width: "25rem" }}
              />
              <FormControl margin="normal" sx={{ width: "25rem" }}>
                <FormLabel>Status</FormLabel>
                <Select name="status" displayEmpty>
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
                <FormLabel>Priority</FormLabel>
                <RadioGroup row name="priority">
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
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SanitationForm;
