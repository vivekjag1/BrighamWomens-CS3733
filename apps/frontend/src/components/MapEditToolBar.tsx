import * as React from "react";
import TimelineIcon from "@mui/icons-material/Timeline";
import AddLocationRoundedIcon from "@mui/icons-material/AddLocationRounded";
import OpenWithRoundedIcon from "@mui/icons-material/OpenWithRounded";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";
import { MapContext } from "../routes/MapEdit.tsx";
import { useContext } from "react";
import { DesignSystem } from "../common/StylingCommon.ts";
import AdsClickIcon from "@mui/icons-material/AdsClick";

const ToggleButtonStyles = {
  color: DesignSystem.white,
  fontFamily: DesignSystem.fontFamily,
  fontSize: "1.10rem",
  fontWeight: "normal",
  height: "6vh",
  width: "6vh",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: DesignSystem.accentColor,
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: DesignSystem.accentColor,
    color: "#FFFFFF",
  },
} as const;

const ToggleButtonGroupStyles = {
  backgroundColor: DesignSystem.primaryColor,
  borderRadius: "10px",
} as const;

export default function ToggleButtons(props: {
  SelectNode: () => void;
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

  const selectedAction = useContext(MapContext).selectedAction;

  return (
    <div>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        sx={ToggleButtonGroupStyles}
      >
        <Tooltip
          TransitionComponent={Zoom}
          title="Select Node"
          placement="bottom"
          arrow
        >
          <ToggleButton
            value="select"
            aria-label="left aligned"
            onClick={props.SelectNode}
            selected={selectedAction.toString() == "SelectNode"}
            sx={ToggleButtonStyles}
          >
            <AdsClickIcon />
          </ToggleButton>
        </Tooltip>
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
            selected={selectedAction.toString() == "MoveNode"}
            sx={ToggleButtonStyles}
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
            selected={selectedAction.toString() == "CreateNode"}
            sx={ToggleButtonStyles}
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
            selected={selectedAction.toString() == "CreateEdge"}
            sx={ToggleButtonStyles}
          >
            <TimelineIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </div>
  );
}
