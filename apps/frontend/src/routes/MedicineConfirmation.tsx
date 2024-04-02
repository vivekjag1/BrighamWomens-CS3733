import React from "react";
import { Button } from "@mui/material";

const MedicineConfirmation: React.FC = () => {
  return (
    <div
      style={{
        border: "2px solid rgba(0, 0, 0, 0.25)",
        borderRadius: "15px",
        boxShadow: "0 4px 10px 10px rgba(0, 0, 0, 0.25)",
        width: "590px",
        height: "590px",
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
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: "40px",
            lineHeight: "48px",
          }}
        >
          <h1 style={{ fontStyle: "Inter", textAlign: "center" }}>
            {" "}
            Medicine Confirmation{" "}
          </h1>
        </label>
        <br />
      </div>
      <div className="mb-4">
        <label> Name of the Medication</label>
        <br />
        <br />
      </div>

      <div className="mb-4">
        <label> Room Number</label>
        <br />
        <br />
      </div>

      {/* Instruction */}
      <div className="mb-4">
        <label> Instruction </label>
        <br />
        <br />
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

export default MedicineConfirmation;
