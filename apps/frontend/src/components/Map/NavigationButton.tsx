import Button from "@mui/material/Button";
import NavigationIcon from "@mui/icons-material/Navigation";
import { DesignSystem } from "../../common/StylingCommon.ts";

function NavigationButton() {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={navigationButtonStyles}
      endIcon={<NavigationIcon />}
    >
      GO
    </Button>
  );
}

const navigationButtonStyles = {
  backgroundColor: DesignSystem.primaryColor,
} as const;

export default NavigationButton;
