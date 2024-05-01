import React, { useEffect, useRef } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { SxProps, Theme } from "@mui/material";

interface NodeParamProps {
  value: string | number | undefined;
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
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event.target.value);
  };

  // Removes focus when deselected
  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        handleBlur();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // Empty dependency array ensures that this effect only runs once on component mount

  return (
    <TextField
      inputRef={inputRef}
      value={value ? value : ""}
      onChange={handleChange}
      // onBlur={handleBlur}
      label={label}
      sx={sx}
      className={`bg-gray-50 ${className}`}
      size="small"
      InputProps={{
        style: { fontFamily: "Poppins, sans-serif" },
      }}
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
