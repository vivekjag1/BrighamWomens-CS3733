import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { MenuItem, SxProps, Theme } from "@mui/material";
import { TextField } from "@mui/material";
import { useEmployees } from "./useEmployees.ts";

interface EmployeeDropdownProps {
  value: string;
  onChange: (newValue: string) => void;
  label?: string;
  sx?: SxProps<Theme>;
  className?: string;
}

const EmployeeDropdown = ({
  value,
  onChange,
  label,
  sx,
  className,
}: EmployeeDropdownProps) => {
  const employees = useEmployees();
  console.log("employee list: ", employees);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: { label: string } | null,
  ) => {
    onChange(newValue ? newValue.label : "");
  };

  const selectedValue = employees.find((employee) => employee.name === value)
    ? { label: value }
    : null;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-location"
      options={employees.map((employee) => ({ label: employee.name }))}
      sx={{
        ...sx,
        "& .MuiAutocomplete-input": {
          fontSize: ".8rem",
          whiteSpace: "pre-wrap",
          fontFamily: "Poppins, sans-serif",
        }, // smaller, wrap, poppins font
      }}
      className={className}
      value={selectedValue}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          className={`bg-gray-50 ${className}`}
          size="small"
          InputLabelProps={{
            style: {
              color: "#a4aab5",
              fontSize: ".9rem",
              fontFamily: "Poppins, sans-serif",
            },
          }}
        />
      )}
      // smaller, wrap, poppins font
      renderOption={(props, option) => (
        <MenuItem
          {...props}
          style={{
            fontSize: ".8rem",
            whiteSpace: "pre-wrap",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {option.label}
        </MenuItem>
      )}
    />
  );
};

export default EmployeeDropdown;
