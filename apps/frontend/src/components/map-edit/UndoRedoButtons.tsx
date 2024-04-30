import { Button, ButtonGroup, Tooltip } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { ButtonStyling, DesignSystem } from "../../common/StylingCommon";

interface UndoRedoButtonProps {
  undo: () => void;
  redo: () => void;
}

function UndoRedoButtons(props: UndoRedoButtonProps) {
  return (
    <div>
      <ButtonGroup
        orientation="horizontal"
        variant="contained"
        size="medium"
        sx={buttonGroupStyles}
      >
        <Tooltip title="Undo" placement="top" arrow>
          <Button sx={buttonStyles} onClick={props.undo}>
            <UndoIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Redo" placement="top" arrow>
          <Button sx={buttonStyles} onClick={props.redo}>
            <RedoIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
}

const buttonGroupStyles = {
  borderRadius: "6px",
} as const;

const buttonStyles = {
  backgroundColor: DesignSystem.primaryColor,
  color: DesignSystem.white,
  width: "5.5vh",
  height: "5.5vh",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: ButtonStyling.blueButtonHover,
  },
} as const;

export default UndoRedoButtons;
