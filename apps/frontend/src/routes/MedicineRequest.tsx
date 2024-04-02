import React from "react";
// import {FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldVariants} from "@mui/material";
import { Button, TextField } from "@mui/material";

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

const MedicineRequest: React.FC = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        border: "2px solid rgba(0, 0, 0, 0.25)",
        borderRadius: "15px",
        boxShadow: "0 4px 10px 10px rgba(0, 0, 0, 0.25)",
        width: "1000px",
        height: "800px",
        position: "absolute",
        top: "60%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "left",
        padding: "50px",
      }}
    >
      <div>
        <label
          style={{
            color: "#013B96",

            fontWeight: 400,
            fontSize: "40px",
            lineHeight: "48px",
          }}
        >
          Medicine Request
        </label>
      </div>
      <div className="mb-4">
        <label> Name of the Patient</label>
      </div>
      {/*<TextField*/}
      {/*  id="medication"*/}
      {/*  label="Name of the Medication"*/}
      {/*  variant="outlined"*/}
      {/*  fullWidth*/}
      {/*  InputProps={{*/}
      {/*    style: { borderColor: "#D4B547" },*/}
      {/*  }}*/}
      {/*/>*/}
      <div style={{ display: "flex", gap: "50px" }}>
        <TextField
          id="filled-basic"
          label="First Name"
          variant="filled"
          sx={{ width: "200px" }}
        />

        <TextField
          id="filled-basic"
          label="Last Name"
          variant="filled"
          sx={{ width: "200px" }}
        />
      </div>

      <div className="mb-4">
        <br />
        <label> Date of Birth</label>
        {/*<TextField*/}
        {/*    id="roomNumber"*/}
        {/*    label="Room Number"*/}
        {/*    variant="outlined"*/}
        {/*    fullWidth*/}
        {/*    InputProps={{*/}
        {/*        className: "border-gold-500",*/}
        {/*    }}*/}
        {/*/>*/}

        {/*<DatePicker id="dob" label="Date of Birth" inputFormat="MM/DD/YYYY" renderInput={(params: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } & Omit<OutlinedTextFieldProps | FilledTextFieldProps | StandardTextFieldProps, "variant">) => <TextField {...params} />}*/}
        {/*/>*/}
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          defaultValue={dayjs("MM/DD/YYYY")}
          sx={{ width: "200px" }}
        />
      </LocalizationProvider>

      {/* Instruction */}
      <div className="mb-4">
        <br />
        <label> Medicine Information </label>
        {/*<TextField*/}
        {/*    id="instruction"*/}
        {/*    label="Instruction"*/}
        {/*    multiline*/}
        {/*    rows={4}*/}
        {/*    variant="outlined"*/}
        {/*    fullWidth*/}
        {/*    InputProps={{*/}
        {/*        className: "border-gold-500",*/}
        {/*    }}*/}
        {/*/>*/}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <TextField
            id="outlined-multiline-flexible"
            label="Name of Medication"
            multiline
            maxRows={4}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Dosage"
            multiline
            maxRows={4}
          />
        </div>

        <div className={"mb-4"}>
          <br />
          <label> Special Instruction </label>
        </div>

        <TextField
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
          id="outlined-multiline-flexible"
          label="Instruction"
          multiline
          maxRows={4}
        />
      </div>
      <Button
        variant="contained"
        style={{ backgroundColor: "#009CA6", color: "white" }}
        className="w-full"
      >
        Submit
      </Button>
    </div>
  );
};

export default MedicineRequest;
