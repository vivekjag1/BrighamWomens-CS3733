import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";

const styles = {
  backgroundColor: "#012D5A",
  color: "white",
  "&:hover": {
    backgroundColor: "#013B96",
  },
} as const;

export default function BasicTooltip(props: {
  onClicked: () => void;
  title: string;
  selected: boolean;
}) {
  return (
    <Tooltip TransitionComponent={Zoom} title={props.title} placement="right">
      <IconButton
        onClick={props.onClicked}
        style={{
          ...styles,
          backgroundColor: props.selected ? "#004dc9" : "#012D5A",
        }}
      >
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}
