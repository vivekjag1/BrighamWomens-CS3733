import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { SxProps, Theme } from "@mui/material";

interface NodeParamProps {
  value: string | undefined;
  onChange?: (newValue: string) => void;
  label?: string;
  sx?: SxProps<Theme>;
  className?: string;
  editable: boolean;
  props?: TextFieldProps;
}

const NodeParam = ({
  value,
  onChange,
  label,
  sx,
  className,
  editable,
  props,
}: NodeParamProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <TextField
      value={value ? value : ""}
      onChange={handleChange}
      label={label}
      sx={sx}
      className={`bg-gray-50 ${className}`}
      size="small"
      InputLabelProps={{
        style: {
          color: "#a4aab5",
          fontSize: ".9rem",
          fontFamily: "Poppins, sans-serif",
        },
      }}
      disabled={!editable}
      fullWidth
      {...props}
    />
  );
};

export default NodeParam;
