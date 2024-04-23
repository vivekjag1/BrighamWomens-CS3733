import * as React from "react";
import TimelineIcon from "@mui/icons-material/Timeline";
import AddLocationRoundedIcon from "@mui/icons-material/AddLocationRounded";
import OpenWithRoundedIcon from "@mui/icons-material/OpenWithRounded";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";

export default function ToggleButtons(props: {
  MoveNode: () => void;
  CreateNode: () => void;
  CreateEdge: () => void;
}) {
  const [alignment, setAlignment] = React.useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <Tooltip
        TransitionComponent={Zoom}
        title="Move Node"
        placement="bottom"
        arrow
      >
        <ToggleButton
          value="move"
          aria-label="left aligned"
          onClick={props.MoveNode}
        >
          <OpenWithRoundedIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip
        TransitionComponent={Zoom}
        title="Create Node"
        placement="bottom"
        arrow
      >
        <ToggleButton
          value="createNode"
          aria-label="centered"
          onClick={props.CreateNode}
        >
          <AddLocationRoundedIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip
        TransitionComponent={Zoom}
        title="Create Edge"
        placement="bottom"
        arrow
      >
        <ToggleButton
          value="createEdge"
          aria-label="right aligned"
          onClick={props.CreateEdge}
        >
          <TimelineIcon />
        </ToggleButton>
      </Tooltip>
      {/*<ToggleButton value="justify" aria-label="justified" disabled>*/}
      {/*    <FormatAlignJustifyIcon />*/}
      {/*</ToggleButton>*/}
    </ToggleButtonGroup>
  );
}
