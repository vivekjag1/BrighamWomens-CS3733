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
{
  /*=======*/
}
{
  /*import React, { useState } from "react";*/
}

{
  /*const MedicineDeliveryConfirmation = () => {*/
}
{
  /*  const [medication, setMedication] = useState("");*/
}
{
  /*  const [roomNumber, setRoomNumber] = useState("");*/
}
{
  /*  const [instructions, setInstructions] = useState("");*/
}

{
  /*  // Function to handle the form submission*/
}
{
  /*  const handleSubmit = (e: React.FormEvent) => {*/
}
{
  /*    e.preventDefault();*/
}
{
  /*    // Add form submission logic here*/
}
{
  /*  };*/
}

{
  /*  return (*/
}
{
  /*    <div className="flex flex-col h-screen">*/
}
{
  /*      /!* Existing Navbar component will be imported where this component is used *!/*/
}

{
  /*      <div className="flex-grow flex items-center justify-center p-4">*/
}
{
  /*        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">*/
}
{
  /*          <form onSubmit={handleSubmit}>*/
}
{
  /*            <h1 className="text-xl font-semibold mb-6">*/
}
{
  /*              Medicine delivery confirmation*/
}
{
  /*            </h1>*/
}
{
  /*            <label*/
}
{
  /*              htmlFor="medication"*/
}
{
  /*              className="block text-sm font-medium mb-2"*/
}
{
  /*            >*/
}
{
  /*              Name of the medication:*/
}
{
  /*            </label>*/
}
{
  /*            <input*/
}
{
  /*              id="medication"*/
}
{
  /*              type="text"*/
}
{
  /*              value={medication}*/
}
{
  /*              onChange={(e) => setMedication(e.target.value)}*/
}
{
  /*              className="border-2 rounded-md p-2 mb-4 w-full"*/
}
{
  /*            />*/
}
{
  /*            <label*/
}
{
  /*              htmlFor="roomNumber"*/
}
{
  /*              className="block text-sm font-medium mb-2"*/
}
{
  /*            >*/
}
{
  /*              Room number:*/
}
{
  /*            </label>*/
}
{
  /*            <input*/
}
{
  /*              id="roomNumber"*/
}
{
  /*              type="text"*/
}
{
  /*              value={roomNumber}*/
}
{
  /*              onChange={(e) => setRoomNumber(e.target.value)}*/
}
{
  /*              className="border-2 rounded-md p-2 mb-4 w-full"*/
}
{
  /*            />*/
}
{
  /*            <label*/
}
{
  /*              htmlFor="instructions"*/
}
{
  /*              className="block text-sm font-medium mb-2"*/
}
{
  /*            >*/
}
{
  /*              Instructions:*/
}
{
  /*            </label>*/
}
{
  /*            <textarea*/
}
{
  /*              id="instructions"*/
}
{
  /*              value={instructions}*/
}
{
  /*              onChange={(e) => setInstructions(e.target.value)}*/
}
{
  /*              className="border-2 rounded-md p-2 mb-6 w-full"*/
}
{
  /*              rows={3}*/
}
{
  /*            ></textarea>*/
}
{
  /*            <button*/
}
{
  /*              type="submit"*/
}
{
  /*              className="bg-teal-500 text-white rounded px-4 py-2 hover:bg-teal-600"*/
}
{
  /*            >*/
}
{
  /*              Back*/
}
{
  /*            </button>*/
}
{
  /*          </form>*/
}
{
  /*        </div>*/
}
// {/*      </div>*/}
//
//     </div>
// {/*  );*/}
// {/*};*/}

export default MedicineConfirmation;
