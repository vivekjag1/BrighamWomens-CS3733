import Select, { SelectProps } from "@mui/material/Select";
import { MenuItem, InputLabel } from "@mui/material";

const CustomStatusDropdown: React.FC<SelectProps> = (props) => {
  return (
    <>
      <InputLabel sx={{ color: "#a4aab5", fontSize: ".9rem" }}>
        Status *
      </InputLabel>
      <Select
        name="status"
        className="bg-gray-50"
        sx={{ fontSize: ".9rem" }}
        label="Status *"
        {...props}
      >
        <MenuItem value="Unassigned">Unassigned</MenuItem>
        <MenuItem value="Assigned">Assigned</MenuItem>
        <MenuItem value="InProgress">InProgress</MenuItem>
        <MenuItem value="Closed">Closed</MenuItem>
      </Select>
    </>
  );
};

export default CustomStatusDropdown;
