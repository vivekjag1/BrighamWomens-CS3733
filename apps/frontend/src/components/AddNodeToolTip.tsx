import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const styles = {
  backgroundColor: "#012D5A",
  color: "white",
  "&:hover": {
    backgroundColor: "#013B96",
  },
} as const;

export default function BasicTooltip(props: { onClicked: () => void }) {
  return (
    <Tooltip title="Create Node">
      <IconButton onClick={props.onClicked} style={styles}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}
