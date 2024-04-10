import React from "react";
import { Node } from "database";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function MapEditButton({ selectedNode }: { selectedNode: Node | null }) {
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
      <form style={{ display: "flex", flexDirection: "column", gap: "6" }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", color: "Black" }}
        >
          Edit Map
        </Typography>
        <Typography variant="body1">
          Click on the node you wish to modify.
        </Typography>
        {selectedNode && (
          <>
            <TextField
              label="Node Name"
              variant="outlined"
              value={selectedNode.shortName} // Assuming the node object has a 'name' property
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              label="X Coordinate"
              variant="outlined"
              value={selectedNode.xcoord}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Y Coordinate"
              variant="outlined"
              value={selectedNode.ycoord}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 2 }}
            />
          </>
        )}
      </form>
    </Box>
  );
}

export default MapEditButton;
