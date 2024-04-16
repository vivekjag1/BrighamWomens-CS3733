import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  // const defaultInputProps = {
  //     style: { fontSize: '.9rem' },
  // };
  //
  // const defaultInputLabelProps = {
  //     style: { color: '#a4aab5', fontSize: '.9rem' },
  // };

  // const inputProps = { ...defaultInputProps, ...props.InputProps };
  // const inputLabelProps = { ...defaultInputLabelProps, ...props.InputLabelProps };

  return (
    <TextField
      variant="outlined"
      fullWidth
      sx={{ width: "25rem", fontFamily: "Poppins, sans-serif" }}
      className="bg-gray-50"
      InputProps={{
        style: { fontSize: ".9rem", fontFamily: "Poppins, sans-serif" },
      }}
      InputLabelProps={{
        style: {
          color: "#a4aab5",
          fontSize: ".9rem",
          fontFamily: "Poppins, sans-serif",
        },
      }}
      size="small"
      {...props}
    />
  );
};

export default CustomTextField;
