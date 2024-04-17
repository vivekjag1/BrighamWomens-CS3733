import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const styles = {
  backgroundColor: "#012D5A",
  width: "4vw",
  padding: ".5rem 3rem",
  "&:hover": {
    backgroundColor: "#013B96",
  },
} as const;

function CustomButton(props: { text: string; onClick: () => void }) {
  return (
    <Button
      variant="contained"
      sx={styles}
      onClick={props.onClick}
      endIcon={<CheckIcon />}
    >
      {props.text}
    </Button>
  );
}

export default CustomButton;
