import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import NodeDropdown from "../components/NodeDropdown.tsx";
import CustomTextField from "../components/CustomTextField.tsx";
import CustomDatePicker from "../components/CustomDatePicker.tsx";
import FormContainer from "../components/FormContainer.tsx";
import CustomStatusDropdown from "../components/CustomStatusDropdown.tsx";
import CustomPrioritySelector from "../components/CustomPrioritySelector.tsx";
import CustomClearButton from "../components/CustomClearButton.tsx";
import CustomSubmitButton from "../components/CustomSubmitButton.tsx";
export function MedicalDeviceDeliveryForm() {
  const [nodeHolder, setNodeHolder] = useState<string>("");

  return (
    <FormContainer>
      <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
        Medicine Device Request
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
              Device Type *
            </InputLabel>
            <Select
              name="device-type"
              className="bg-gray-50"
              label="Device Type *"
              sx={{ fontSize: ".9rem" }}
            >
              <MenuItem value="stretcher">Stretcher</MenuItem>
              <MenuItem value="wheelchair">Wheelchair</MenuItem>
              <MenuItem value="crutches">Crutches</MenuItem>
              <MenuItem value="hospital bed">Hospital Bed</MenuItem>
              <MenuItem value="iv pump">IV Pump</MenuItem>
              <MenuItem value="patient monitor">Patient Monitor</MenuItem>
              <MenuItem value="defibrillator">Defibrillator</MenuItem>
              <MenuItem value="anesthesia machine">Anesthesia Machine</MenuItem>
              <MenuItem value="ventilator">Ventilator</MenuItem>
              <MenuItem value="catheter">Catheter</MenuItem>
            </Select>
          </FormControl>

          <CustomTextField
            label="Quantity"
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
            <p>Made by Andy Truong and Francesco Di Mise</p>
          </div>
        </form>
      </div>
    </FormContainer>
  );
}

export default MedicalDeviceDeliveryForm;
