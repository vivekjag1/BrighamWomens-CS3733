import Select, { SelectProps } from "@mui/material/Select";
import { MenuItem, InputLabel } from "@mui/material";

const CustomStatusDropdown: React.FC<SelectProps> = (props) => {
  return (
    <>
      <InputLabel
        sx={{
          color: "#a4aab5",
          fontSize: ".9rem",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Status *
      </InputLabel>
      <Select
        name="status"
        className="bg-gray-50"
        sx={{ fontSize: ".9rem", fontFamily: "Poppins, sans-serif" }}
        label="Status *"
        {...props}
      >
        <MenuItem
          value="Unassigned"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Unassigned
        </MenuItem>
        <MenuItem
          value="Assigned"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Assigned
        </MenuItem>
        <MenuItem
          value="InProgress"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          InProgress
        </MenuItem>
        <MenuItem value="Closed" style={{ fontFamily: "Poppins, sans-serif" }}>
          Closed
        </MenuItem>
      </Select>
    </>
  );
};

export default CustomStatusDropdown;
