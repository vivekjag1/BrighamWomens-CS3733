import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { MenuItem, SxProps, Theme } from "@mui/material";
import { TextField } from "@mui/material";

interface CustomDropdownProps {
  value: string;
  onChange: (newValue: string) => void;
  options: string[];
  label?: string;
  sx?: SxProps<Theme>;
  className?: string;
  disabled?: boolean;
  freeSolo?: boolean;
}

const CustomDropdown = ({
  value,
  onChange,
  options,
  label,
  sx,
  className,
  disabled,
}: CustomDropdownProps) => {
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: { label: string } | null,
  ) => {
    onChange(newValue ? newValue.label : "");
  };

  const selectedValue = options.find((option) => option === value)
    ? { label: value }
    : null;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-location"
      options={options.map((option) => ({ label: option }))}
      sx={{
        ...sx,
        "& .MuiAutocomplete-input": {
          fontSize: ".8rem",
          whiteSpace: "pre-wrap",
          fontFamily: "Poppins, sans-serif",
          height: "1.4rem",
        }, // smaller, wrap, poppins font
      }}
      className={className}
      value={selectedValue}
      onChange={handleChange}
      disabled={disabled}
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

export default CustomDropdown;
