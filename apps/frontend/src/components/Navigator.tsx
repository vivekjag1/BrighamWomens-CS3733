import { IconButton, TextField } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import PlaceIcon from "@mui/icons-material/Place";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const textFieldStyles = {
  width: "15vw",
} as const;

const buttonStyles = {
  height: "4vh",
} as const;

function Navigator() {
  return (
    <div>
      <div className="border-2 border-solid border-black w-[23vw] flex gap-5 p-4">
        <div className="flex flex-col justify-center gap-3 ml-3">
          <NavigationIcon />
          <MoreVertIcon />
          <PlaceIcon />
        </div>
        <div className="flex flex-col gap-3">
          <TextField variant="outlined" label="Start" sx={textFieldStyles} />
          <TextField
            variant="outlined"
            label="Destination"
            sx={textFieldStyles}
          />
        </div>
        <div className="min-h-full flex flex-col justify-center">
          <IconButton sx={buttonStyles}>
            <SwapVertIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Navigator;
