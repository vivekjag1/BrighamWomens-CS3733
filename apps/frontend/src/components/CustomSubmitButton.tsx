import Button, { ButtonProps } from "@mui/material/Button";

const CustomSubmitButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      variant="contained"
      className="justify-end"
      style={{ backgroundColor: "#012D5A", width: "8rem" }}
      {...props}
    />
  );
};

export default CustomSubmitButton;
