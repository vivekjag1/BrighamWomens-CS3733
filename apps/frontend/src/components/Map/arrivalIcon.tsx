import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Props {
  isStartNode: boolean; // Prop to identify if it's the start node
}

const arrivalIcon: React.FC<Props> = ({ isStartNode }) => {
  return (
    <div>
      {isStartNode ? (
        <ArrowDownwardIcon /> // Display ArrowUpward icon for the start node
      ) : (
        <div>Standard Node</div> // Display standard content for other nodes
      )}
    </div>
  );
};

export default arrivalIcon;
