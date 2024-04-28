import { Button, ButtonGroup } from "@mui/material";
import { ButtonStyling, DesignSystem } from "../../common/StylingCommon";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

function UndoRedoButton(props: { undo: () => void; redo: () => void }) {
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

  return (
    <div>
      <ButtonGroup
        orientation="horizontal"
        variant="contained"
        size="medium"
        sx={buttonGroupStyles}
      >
        <Button sx={buttonStyles} onClick={props.undo}>
          <UndoIcon />
        </Button>
        <Button sx={buttonStyles} onClick={props.redo}>
          <RedoIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default UndoRedoButton;
