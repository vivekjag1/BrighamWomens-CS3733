import React from "react";
import Autocomplete /*, { createFilterOptions }*/ from "@mui/material/Autocomplete";
import { Avatar, Box, SxProps, Theme } from "@mui/material";
import { TextField } from "@mui/material";
import { useEmployees } from "./useEmployees.ts";
import mattImage from "../../assets/employees/mbrown.jpeg";
import andyImage from "../../assets/employees/atruong.jpeg";
import vivekImage from "../../assets/employees/vjagadeesh.jpeg";
import ademImage from "../../assets/employees/mdjadid.jpeg";
import suliImage from "../../assets/employees/smoukheiber.jpeg";
import frankyImage from "../../assets/employees/fmise.jpeg";
import colinImage from "../../assets/employees/cmasucci.jpeg";
import griffinImage from "../../assets/employees/gbrown.jpeg";
import taehaImage from "../../assets/employees/tsong.jpeg";
import danielImage from "../../assets/employees/dgorbunov.jpeg";
import josephImage from "../../assets/employees/jcardarelli.jpeg";
import wongImage from "../../assets/employees/wwong.jpg";
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

const definedEmployees = [
  { name: "Daniel Gorbunov ", imageSrc: danielImage },
  { name: "Matthew Brown", imageSrc: mattImage },
  { name: "Andy Truong", imageSrc: andyImage },
  { name: "Vivek Jagadeesh", imageSrc: vivekImage },
  { name: "Mohamed Adem Djadid", imageSrc: ademImage },
  { name: "Sulaiman Moukheiber ", imageSrc: suliImage },
  { name: "Francesco Di Mise", imageSrc: frankyImage },
  { name: "Colin Masucci", imageSrc: colinImage },
  { name: "Griffin Brown", imageSrc: griffinImage },
  { name: "Taeha Song", imageSrc: taehaImage },
  { name: "Joseph Cardarelli", imageSrc: josephImage },
  { name: "Wilson Wong", imageSrc: wongImage },
];

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

  function getEmployeeImageSrc(employeeName: string) {
    const employee = definedEmployees.find(
      (definedEmployee) => definedEmployee.name.trim() === employeeName.trim(),
    );
    return employee ? employee.imageSrc : undefined;
  }

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
            sx={{
              textAlign: "start",
              fontSize: ".9rem",
              // "& > img": { mr: 2, flexShrink: 0 },
            }}
            {...props}
          >
            {/*{employee && employee.profilePicture && (*/}
            {/*  <img*/}
            {/*    className="w-9 h-9 rounded-full"*/}
            {/*    loading="lazy"*/}
            {/*    src={`../../assets/employees/${employee.profilePicture}.jpeg`}*/}
            {/*    alt={`${option.label} profile`}*/}
            {/*  />*/}
            {/*)}*/}
            {employee && (
              <Avatar
                {...(getEmployeeImageSrc(employee.name)
                  ? { src: getEmployeeImageSrc(employee.name) }
                  : {})}
                alt={`${employee.name} image`}
                sx={{
                  marginRight: 1,
                }}
              >
                {employee.name.charAt(0)}
              </Avatar>
            )}
            {option.label}
          </Box>
        );
      }}
    />
  );
};

export default EmployeeDropdown;
