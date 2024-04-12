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
      sx={{ width: "25rem" }}
      className="bg-gray-50"
      InputProps={{ style: { fontSize: ".9rem" } }}
      InputLabelProps={{
        style: { color: "#a4aab5", fontSize: ".9rem" },
      }}
      size="small"
      {...props}
    />
  );
};

export default CustomTextField;
