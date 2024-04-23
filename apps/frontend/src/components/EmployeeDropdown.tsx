import React from "react";
import Autocomplete /*, { createFilterOptions }*/ from "@mui/material/Autocomplete";
import { Box, SxProps, Theme } from "@mui/material";
import { TextField } from "@mui/material";
import { useEmployees } from "./useEmployees.ts";
// import {EmployeeType} from "common/src/EmployeeType.ts";

interface EmployeeDropdownProps {
  value: string;
  onChange: (newValue: string) => void;
  label?: string;
  sx?: SxProps<Theme>;
  className?: string;
  disabled: boolean;
  disableClearable?: boolean;
  // employees: EmployeeType[];
}

const EmployeeDropdown = ({
  value,
  onChange,
  label,
  sx,
  className,
  disabled,
  disableClearable,
  // employees,
}: EmployeeDropdownProps) => {
  // const [employees, setEmployees] = useState<EmployeeType[]>([]);
  // setEmployees(useEmployees);
  const employees = useEmployees();

  console.log("employee list: ", employees);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: { label: string } | null,
  ) => {
    onChange(newValue ? newValue.label : "");
  };

  const options = employees.map((employee) => ({
    label: employee.name,
    profilePicture: employee.profilePicture,
  }));

  // const selectedValue = options.find((option) => option.label === value)
  //   ? { label: value }
  //   : null;

  const selectedValue =
    value === "Unassigned"
      ? { label: "Unassigned" }
      : value
        ? options.find((option) => option.label === value) || null
        : null;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-location"
      options={options}
      getOptionLabel={(option) => option.label}
      ListboxProps={{
        style: {
          maxHeight: "15rem",
          overflowY: "auto",
        },
      }}
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
      hidden={disabled}
      disableClearable={disableClearable}
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
      renderOption={(props, option) => {
        const employee = employees.find(
          (employee) => employee.name === option.label,
        );

        return (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {employee && employee.profilePicture && (
              <img
                className="w-10 h-10 rounded-full"
                loading="lazy"
                src={`../../assets/employees/${employee.profilePicture}.jpeg`}
                alt={`${option.label} profile`}
              />
            )}
            {option.label}
          </Box>
        );
      }}
    />
  );
};

export default EmployeeDropdown;
