import { Link } from "react-router-dom";
import bwhLogoSemiNaked from "../../assets/bwh-logo-semi-naked.svg";
import bwhExteriorDefault from "../../assets/bwh-exterior-default.png";
import { TextField, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import paths from "../paths/paths.tsx";

function Login() {
  return (
    <div>
      <div className="w-screen h-screen flex flex-row">
        <form className="w-[50vw] flex flex-col justify-center items-start px-[10vw] gap-[4vh]">
          <img
            className="w-[500px] h-[60px]"
            src={bwhLogoSemiNaked}
            alt="Brigham and Women's Hospital Logo"
          />
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
          <Link to={paths.HOME}>
            <IconButton
              size="small"
              sx={{
                width: "65px",
                height: "65px",
                backgroundColor: "rgb(0, 156, 166)",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "hsl(184, 90%, 33%)",
                },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Link>
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
