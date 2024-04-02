import React, { useState } from "react";

const MedicineDeliveryConfirmation = () => {
  const [medication, setMedication] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [instructions, setInstructions] = useState("");

  // Function to handle the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Existing Navbar component will be imported where this component is used */}

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <form onSubmit={handleSubmit}>
            <h1 className="text-xl font-semibold mb-6">
              Medicine delivery confirmation
            </h1>
            <label
              htmlFor="medication"
              className="block text-sm font-medium mb-2"
            >
              Name of the medication:
            </label>
            <input
              id="medication"
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              className="border-2 rounded-md p-2 mb-4 w-full"
            />
            <label
              htmlFor="roomNumber"
              className="block text-sm font-medium mb-2"
            >
              Room number:
            </label>
            <input
              id="roomNumber"
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="border-2 rounded-md p-2 mb-4 w-full"
            />
            <label
              htmlFor="instructions"
              className="block text-sm font-medium mb-2"
            >
              Instructions:
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="border-2 rounded-md p-2 mb-6 w-full"
              rows={3}
            ></textarea>
            <button
              type="submit"
              className="bg-teal-500 text-white rounded px-4 py-2 hover:bg-teal-600"
            >
              Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MedicineDeliveryConfirmation;
