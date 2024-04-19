import Autocomplete from "@mui/material/Autocomplete";
import { MenuItem, SxProps, TextField, Theme } from "@mui/material";
import { SyntheticEvent } from "react";
import { PathAlgorithm } from "common/src/Path.ts";

interface DropdownProps {
  value: string;
  onChange: (newValue: string) => void;
  label?: string;
  sx?: SxProps<Theme>;
  className?: string;
}

const algorithms: PathAlgorithm[] = ["A-Star", "BFS", "DFS", "Dijkstra"];

const PathAlgorithmDropdown = ({
  value,
  onChange,
  label,
  sx,
  className,
}: DropdownProps) => {
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | null,
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-location"
      options={algorithms}
      sx={{
        ...sx,
        "& .MuiAutocomplete-input": {
          fontSize: "0.8rem",
          whiteSpace: "pre-wrap",
          fontFamily: "Poppins, sans-serif",
        }, // smaller, wrap, poppins font
      }}
      className={className}
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          className={`bg-gray-50 ${className}`}
          size="small"
          InputLabelProps={{
            style: { color: "#a4aab5", fontSize: ".9rem" },
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
          {option}
        </MenuItem>
      )}
      // remove clear button (x)
      clearIcon={null}
    />
  );
};

export default PathAlgorithmDropdown;
