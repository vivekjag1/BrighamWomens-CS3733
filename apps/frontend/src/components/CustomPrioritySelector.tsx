import { RadioGroupProps } from "@mui/material/RadioGroup";
import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const CustomPrioritySelector: React.FC<RadioGroupProps> = (props) => {
  return (
    <>
      <FormLabel sx={{ fontSize: ".9rem" }}>Priority *</FormLabel>
      <RadioGroup row name="priority" sx={{ marginLeft: ".52rem" }} {...props}>
        <FormControlLabel value="Low" control={<Radio />} label="Low" />
        <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
        <FormControlLabel value="High" control={<Radio />} label="High" />
        <FormControlLabel
          value="Emergency"
          control={<Radio />}
          label="Emergency"
        />
      </RadioGroup>
    </>
  );
};

export default CustomPrioritySelector;
