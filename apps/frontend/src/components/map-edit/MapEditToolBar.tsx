import * as React from "react";
import TimelineIcon from "@mui/icons-material/Timeline";
import AddLocationRoundedIcon from "@mui/icons-material/AddLocationRounded";
import OpenWithRoundedIcon from "@mui/icons-material/OpenWithRounded";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";
import { MapContext } from "../../routes/MapEdit.tsx";
import { useContext } from "react";
import { ButtonStyling, DesignSystem } from "../../common/StylingCommon.ts";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import DeleteIcon from "@mui/icons-material/Delete";

const ToggleButtonStyles = {
  color: DesignSystem.white,
  fontFamily: DesignSystem.fontFamily,
  fontSize: "1.10rem",
  fontWeight: "normal",
  height: "5.5vh",
  width: "5.5vh",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: ButtonStyling.blueButtonHover,
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: ButtonStyling.blueButtonClicked,
    color: "white",
  },
} as const;

const ToggleButtonGroupStyles = {
  backgroundColor: DesignSystem.primaryColor,
  borderRadius: "6px",
} as const;

export default function ToggleButtons(props: {
  SelectNode: () => void;
  MoveNode: () => void;
  CreateNode: () => void;
  CreateEdge: () => void;
  DeleteNode: () => void;
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
            sx={{
              ...ToggleButtonStyles,
              "&.MuiToggleButtonGroup-middleButton": {
                borderLeft: "1px solid #1565c0",
                borderRight: "1px solid #1565c0",
              },
            }}
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
            sx={{
              ...ToggleButtonStyles,
              "&.MuiToggleButtonGroup-middleButton": {
                borderLeft: "1px solid #1565c0",
                borderRight: "1px solid #1565c0",
              },
            }}
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
            sx={{
              ...ToggleButtonStyles,
              "&.MuiToggleButtonGroup-middleButton": {
                borderLeft: "1px solid #1565c0",
                borderRight: "1px solid #1565c0",
              },
            }}
          >
            <TimelineIcon />
          </ToggleButton>
        </Tooltip>
        <Tooltip
          TransitionComponent={Zoom}
          title="Delete Node or Edge"
          placement="bottom"
          arrow
        >
          <ToggleButton
            value="deleteNode"
            aria-label="right aligned"
            onClick={props.DeleteNode}
            selected={selectedAction.toString() == "DeleteNode"}
            sx={ToggleButtonStyles}
          >
            <DeleteIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </div>
  );
}
