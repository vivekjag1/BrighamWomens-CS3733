// import React, { useState } from 'react';
import { Select, MenuItem, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import NodeDropdown from "../components/NodeDropdown.tsx";
import { useState } from "react";
import CustomTextField from "../components/CustomTextField.tsx";
import CustomDatePicker from "../components/CustomDatePicker.tsx";
import FormContainer from "../components/FormContainer.tsx";
import CustomStatusDropdown from "../components/CustomStatusDropdown.tsx";
import CustomPrioritySelector from "../components/CustomPrioritySelector.tsx";
import CustomClearButton from "../components/CustomClearButton.tsx";
import CustomSubmitButton from "../components/CustomSubmitButton.tsx";
//import Autocomplete from "@mui/material/Autocomplete";

export function SecurityRequest() {
  const [nodeHolder, setNodeHolder] = useState<string>("");

  return (
    <FormContainer>
      <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
        Security Request
      </h1>
      <div className="h-auto flex justify-center items-center w-[30rem]">
        <form
          noValidate
          autoComplete="off"
          className="space-y-4 flex flex-col justify-center items-center"
        >
          <CustomTextField label="Requesting Username" required />

          <NodeDropdown
            value={nodeHolder}
            onChange={(newValue: string) => {
              setNodeHolder(newValue);
            }}
          />

          <CustomDatePicker />

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

          <CustomTextField
            label="Number of Personnel"
            type="number"
            InputProps={{
              inputProps: { min: 0 },
            }}
            required
          />

          <CustomTextField
            label="Description (optional)"
            multiline
            rows={3}
            size="small"
          />

          <FormControl sx={{ width: "25rem" }} size="small">
            <CustomStatusDropdown />
          </FormControl>

          <FormControl
            component="fieldset"
            margin="normal"
            sx={{ width: "25rem" }}
          >
            <CustomPrioritySelector />
          </FormControl>

          <div className="flex justify-between w-full mt-4">
            <CustomClearButton>Clear</CustomClearButton>

            <CustomSubmitButton>Submit</CustomSubmitButton>
          </div>
          <div className="text-center mt-4">
            <p>Made by Daniel Gorbunov and Colin Masucci</p>
          </div>
        </form>
      </div>
    </FormContainer>
  );
}

export default SecurityRequest;
