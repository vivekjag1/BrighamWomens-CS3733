import { Button } from "@mui/material";

const styles = {
  backgroundColor: "#012D5A",
  width: "4vw",
  "&:hover": {
    backgroundColor: "#013B96",
  },
} as const;

function CustomButton(props: { text: string }) {
  return (
    <Button variant="contained" sx={styles}>
      {props.text}
    </Button>
  );
}

export default CustomButton;
