import { useControls } from "react-zoom-pan-pinch";
import { Button, ButtonGroup } from "@mui/material";
import { DesignSystem } from "../../common/StylingCommon";

function ZoomControls() {
  const { zoomIn, zoomOut } = useControls();

  return (
    <ButtonGroup orientation="vertical" variant="contained" size="medium">
      <Button sx={buttonStyles} onClick={() => zoomIn()}>
        +
      </Button>
      <Button sx={buttonStyles} onClick={() => zoomOut()}>
        -
      </Button>
    </ButtonGroup>
  );
}

const buttonStyles = {
  backgroundColor: DesignSystem.primaryColor,
  color: DesignSystem.white,
  fontFamily: DesignSystem.fontFamily,
  width: "55px",
  height: "55px",
  "&:hover": {
    backgroundColor: DesignSystem.accentColor,
  },
} as const;
export default ZoomControls;
