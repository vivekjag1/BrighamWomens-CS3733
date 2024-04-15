import { RadioGroupProps } from "@mui/material/RadioGroup";
import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const CustomPrioritySelector: React.FC<RadioGroupProps> = (props) => {
  return (
    <>
      <FormLabel sx={{ fontSize: ".9rem", fontFamily: "Poppins, sans-serif" }}>
        Priority *
      </FormLabel>
      <RadioGroup row name="priority" sx={{ marginLeft: ".1rem" }} {...props}>
        <FormControlLabel
          value="Low"
          control={<Radio />}
          label="Low"
          sx={{
            "& .MuiTypography-root": {
              fontFamily: "Poppins, sans-serif",
              fontSize: ".933rem",
            },
          }}
        />
        <FormControlLabel
          value="Medium"
          control={<Radio />}
          label="Medium"
          sx={{
            "& .MuiTypography-root": {
              fontFamily: "Poppins, sans-serif",
              fontSize: ".933rem",
            },
          }}
        />
        <FormControlLabel
          value="High"
          control={<Radio />}
          label="High"
          sx={{
            "& .MuiTypography-root": {
              fontFamily: "Poppins, sans-serif",
              fontSize: ".933rem",
            },
          }}
        />
        <FormControlLabel
          value="Emergency"
          control={<Radio />}
          label="Emergency"
          sx={{
            "& .MuiTypography-root": {
              fontFamily: "Poppins, sans-serif",
              fontSize: ".933rem",
            },
          }}
        />
      </RadioGroup>
    </>
  );
};

export default CustomPrioritySelector;
