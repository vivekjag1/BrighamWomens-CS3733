import { Button } from "@mui/material";
import { DesignSystem } from "../../common/StylingCommon";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

function QRCodeButton(props: {
  setDisplayQRCode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <Button sx={buttonStyles} onClick={() => props.setDisplayQRCode(true)}>
        <QrCodeScannerIcon
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Button>
    </div>
  );
}

const buttonStyles = {
  minWidth: "0vh",
  width: "6vh",
  height: "6vh",
  backgroundColor: DesignSystem.primaryColor,
  color: DesignSystem.white,
  borderRadius: "8px",
  transition: "transform 0.1s linear",
  "&.MuiButton-root:hover": {
    backgroundColor: DesignSystem.accentColor,
    transform: "scale(1.1)",
  },
  "&.MuiButton-root:active": {
    transform: "scale(0.8)",
  },
} as const;

export default QRCodeButton;
