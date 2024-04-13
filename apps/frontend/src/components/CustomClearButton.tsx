import Button, { ButtonProps } from "@mui/material/Button";

const CustomClearButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "#EA422D",
        color: "white",
        width: "8rem",
      }}
      {...props}
    />
  );
};

export default CustomClearButton;
