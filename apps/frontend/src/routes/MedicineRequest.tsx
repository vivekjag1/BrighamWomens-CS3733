import { TextField, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
function MedicineRequest() {
  return (
    <div>
      <form>
        <h2>Medicine Request</h2>
        <TextField variant="outlined" />
        <TextField variant="outlined" />
        <TextField variant="outlined" />
        <IconButton type="submit">
          <ArrowForwardIcon />
        </IconButton>
      </form>
    </div>
  );
}

export default MedicineRequest;
