import bwhLogoSemiNaked from "../../assets/bwh-logo-semi-naked.svg";
import bwhExteriorDefault from "../../assets/bwh-exterior-default.png";

import { TextField, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Login() {
  return (
    <div>
      <div className="w-screen h-screen flex flex-row">
        <form className="w-[50vw] flex flex-col justify-center items-start px-[10vw] gap-[4vh]">
          <img src={bwhLogoSemiNaked} alt="Brigham and Women's Hospital Logo" />
          <h2 className="font-semibold text-2xl">Sign in</h2>
          <TextField
            type="text"
            label="username"
            variant="outlined"
            size="medium"
            sx={{ width: "350px" }}
          />
          <TextField
            type="password"
            label="password"
            variant="outlined"
            size="medium"
            sx={{ width: "350px" }}
          />
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </form>
        <div>
          <img
            className="w-[60vw] h-full object-cover"
            src={bwhExteriorDefault}
            alt="Brigham and Women's Hospital Exterior"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
