import { useControls } from "react-zoom-pan-pinch";
import { Button, ButtonGroup } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ButtonStyling, DesignSystem } from "../../common/StylingCommon";

function ZoomControls() {
  const { zoomIn, zoomOut } = useControls();
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
        orientation="vertical"
        variant="contained"
        size="medium"
        sx={buttonGroupStyles}
      >
        <Button sx={buttonStyles} onClick={() => zoomIn()}>
          <AddIcon />
        </Button>
        <Button sx={buttonStyles} onClick={() => zoomOut()}>
          <RemoveIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default ZoomControls;
