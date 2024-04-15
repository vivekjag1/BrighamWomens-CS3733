import React, { useEffect, useState } from "react";
import { Node } from "database";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function MapEditButton({ selectedNode }: { selectedNode: Node | null }) {
  // State to manage input values
  const [nodeName, setNodeName] = useState("");
  const [nodeXCoord, setNodeXCoord] = useState("");
  const [nodeYCoord, setNodeYCoord] = useState("");

  // When selectedNode changes, update the input states
  useEffect(() => {
    if (selectedNode) {
      setNodeName(selectedNode.shortName);
      setNodeXCoord(selectedNode.xcoord.toString());
      setNodeYCoord(selectedNode.ycoord.toString());
    }
  }, [selectedNode]);

  // Handler for form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Submit logic goes here
    console.log({
      nodeName,
      nodeXCoord,
      nodeYCoord,
    });
    // For example, you could call an API to update the node details
  };

  // Update state when input values change
  const handleNodeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(event.target.value);
  };

  const handleNodeXCoordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNodeXCoord(event.target.value);
  };

  const handleNodeYCoordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNodeYCoord(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "17.5vw",
        height: "98vh",
        p: 5,
        bgcolor: "#D9D9D9",
        borderRadius: "lg",
        boxShadow: "0 0 4px 2px rgba(0,0,0,0.25)",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column", gap: "6" }}
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", color: "#013b96" }}
        >
          Edit Map
        </Typography>
        <Typography variant="body1" sx={{ mb: 5 }}>
          Click on the node you wish to modify.
        </Typography>

        {selectedNode && (
          <>
            <TextField
              label="Node Name"
              variant="outlined"
              value={nodeName}
              onChange={handleNodeNameChange}
              sx={{ mb: 5 }}
            />

            <TextField
              label="X Coordinate"
              variant="outlined"
              value={nodeXCoord}
              onChange={handleNodeXCoordChange}
              sx={{ mb: 5 }}
            />
            <TextField
              label="Y Coordinate"
              variant="outlined"
              value={nodeYCoord}
              onChange={handleNodeYCoordChange}
              sx={{ mb: 5 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </>
        )}
      </form>
    </Box>
  );
}

export default MapEditButton;
