import React from "react";
import { ArrowUpward } from "@mui/icons-material";

interface Props {
  isStartNode: boolean; // Prop to identify if it's the start node
}

const startIcon: React.FC<Props> = ({ isStartNode }) => {
  return (
    <div>
      {isStartNode ? (
        <ArrowUpward /> // Display ArrowUpward icon for the start node
      ) : (
        <div>Standard Node</div> // Display standard content for other nodes
      )}
    </div>
  );
};

export default startIcon;
