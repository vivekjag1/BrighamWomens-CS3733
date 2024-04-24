import { useControls } from "react-zoom-pan-pinch";
import { Button, ButtonGroup } from "@mui/material";
import { DesignSystem } from "../../common/StylingCommon";

function ZoomControls() {
  const { zoomIn, zoomOut } = useControls();
  const buttonGroupStyles = {
    borderRadius: "10px",
  } as const;

  const buttonStyles = {
    backgroundColor: DesignSystem.primaryColor,
    color: DesignSystem.white,
    fontFamily: DesignSystem.fontFamily,
    fontSize: "1.25rem",
    fontWeight: "normal",
    width: "5.5vh",
    height: "5.5vh",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: DesignSystem.accentColor,
    },
  } as const;

  return (
    <div
      className="fixed right-[2%] z-10"
      style={{ bottom: "calc(2% + 300px)" }}
    >
      <ButtonGroup
        orientation="vertical"
        variant="contained"
        size="medium"
        sx={buttonGroupStyles}
      >
        <Button sx={buttonStyles} onClick={() => zoomIn()}>
          +
        </Button>
        <Button sx={buttonStyles} onClick={() => zoomOut()}>
          -
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default ZoomControls;
