import React, { useState } from "react";
import { FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import NodeDropdown from "../components/NodeDropdown.tsx";
import CustomTextField from "../components/CustomTextField.tsx";
import CustomDatePicker from "../components/CustomDatePicker.tsx";
import FormContainer from "../components/FormContainer.tsx";
import CustomStatusDropdown from "../components/CustomStatusDropdown.tsx";
import CustomPrioritySelector from "../components/CustomPrioritySelector.tsx";
import CustomClearButton from "../components/CustomClearButton.tsx";
import CustomSubmitButton from "../components/CustomSubmitButton.tsx";

export function SanitationForm() {
  const [nodeHolder, setNodeHolder] = useState<string>("");

  return (
    <FormContainer>
      <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
        Sanitation Request
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
            <p>Made by Matthew Brown and Sulaiman Moukheiber</p>
          </div>
        </form>
      </div>
    </FormContainer>
  );
}

export default SanitationForm;
