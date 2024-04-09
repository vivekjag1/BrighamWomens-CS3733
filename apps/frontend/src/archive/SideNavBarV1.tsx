import React, { useState } from "react";
import logo from "../../assets/bwh-logo-naked.svg";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import MapIcon from "@mui/icons-material/Map";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TocIcon from "@mui/icons-material/Toc";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
//import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import KeyboardTabRoundedIcon from "@mui/icons-material/KeyboardTabRounded";
import StartRoundedIcon from "@mui/icons-material/StartRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth0 } from "@auth0/auth0-react";
//import * as auth0 from '@auth0/auth0-react';

const insertLineBreaks = (text: string) => {
  const words = text.split(" ");
  const newText: Array<string | JSX.Element> = [];
  for (let i = 0; i < words.length; i += 2) {
    newText.push(words.slice(i, i + 2).join(" "));
    if (i + 2 < words.length) {
      newText.push((<br key={i.toString()} />) as JSX.Element);
    }
  }
  return newText;
};

function SideNavBarV1() {
  const { isAuthenticated } = useAuth0();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { logout } = useAuth0();

  const handleLogout = () => {
    // logout({returnTo: window.location.origin} );
    logout().then().catch(console.error);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <></>;
  } else {
    return (
      <div>
        <div className="w-5vw"></div>
        <div className="absolute z-10">
          <div
            className={`shadow-lg h-screen bg-secondary flex flex-col justify-content-start items-center space-y-8 transition-width ease-in-out duration-200 ${isCollapsed ? "w-[5vw]" : "w-[250px]"}`}
          >
            <div className="flex flex-row justify-content-start">
              <Link to="/home">
                <div className="shadow-lg rounded-full bg-white mb-10 mt-10 w-60px h-60px flex justify-center items-center">
                  <img className="h-40px" src={logo} alt="Logo" />
                </div>
              </Link>
              <h2
                className={
                  isCollapsed
                    ? "hidden"
                    : "p-5 font-bold text-white text-md flex items-center max-w-30 whitespace-nowrap overflow-hidden"
                }
              >
                {insertLineBreaks("Brigham and Women's Hospital")}
              </h2>
            </div>

            <div className="m-4">
              <Link to="/home">
                <div className="flex flex-row whitespace-pre-wrap">
                  <MapIcon
                    sx={{
                      marginRight: "5px",
                      marginTop: "-3px",
                      fontSize: "30px",
                      color: "white",
                    }}
                  />
                  <h2
                    className={
                      isCollapsed
                        ? "hidden"
                        : "font-bold text-white text-md whitespace-nowrap"
                    }
                  >
                    Map
                  </h2>
                </div>
              </Link>
            </div>
            <div className="m-4">
              <Link to="/services">
                <div
                  className="flex flex-row justify-content-start" /*onMouseEnter={toggleHover} onMouseLeave={toggleHover}*/
                >
                  <VolunteerActivismIcon
                    sx={{
                      marginRight: "5px",
                      marginTop: "-3px",
                      fontSize: "30px",
                      color: "white",
                    }}
                  />
                  <h2
                    className={
                      isCollapsed
                        ? "hidden"
                        : "font-bold text-white text-md whitespace-nowrap"
                    }
                  >
                    Services
                  </h2>
                </div>
              </Link>
            </div>
            <div className="m-4">
              <Link to="/data">
                <div className="flex flex-row justify-content-start">
                  <AddLocationAltIcon
                    sx={{
                      marginRight: "5px",
                      marginTop: "-3px",
                      fontSize: "30px",
                      color: "white",
                    }}
                  />
                  <h2
                    className={
                      isCollapsed
                        ? "hidden"
                        : "font-bold text-white text-md whitespace-nowrap overflow-hidden"
                    }
                  >
                    Map Data
                  </h2>
                </div>
              </Link>
            </div>
            <div className="m-4">
              <Link to="/services/data">
                <div
                  className="flex flex-row justify-content-start" /*onMouseEnter={toggleHover} onMouseLeave={toggleHover}*/
                >
                  <TocIcon
                    sx={{
                      marginRight: "5px",
                      marginTop: "-3px",
                      fontSize: "30px",
                      color: "white",
                    }}
                  />
                  <h2
                    className={
                      isCollapsed
                        ? "hidden"
                        : "font-bold text-white text-md container whitespace-nowrap overflow-hidden"
                    }
                  >
                    Service Data
                  </h2>
                </div>
              </Link>
            </div>
            <div className="m-4">
              <Link to="/edit">
                <div
                  className="flex flex-row justify-content-start" /*onMouseEnter={toggleHover} onMouseLeave={toggleHover}*/
                >
                  <EditLocationAltIcon
                    sx={{
                      marginRight: "5px",
                      marginTop: "-3px",
                      fontSize: "30px",
                      color: "white",
                    }}
                  />
                  <h2
                    className={
                      isCollapsed
                        ? "hidden"
                        : "font-bold text-white text-md container whitespace-nowrap overflow-hidden"
                    }
                  >
                    Edit Map
                  </h2>
                </div>
              </Link>
            </div>
            {/*Logout button */}
            <div className="m-4" onClick={handleLogout}>
              <Link to="/">
                {" "}
                {/* enter link to button here to log out*/}
                <div
                  className="flex flex-row justify-content-start" /*onMouseEnter={toggleHover} onMouseLeave={toggleHover}*/
                >
                  <LogoutIcon
                    sx={{
                      marginRight: "5px",
                      marginTop: "-3px",
                      fontSize: "30px",
                      color: "white",
                    }}
                  />
                  <h2
                    className={
                      isCollapsed
                        ? "hidden"
                        : "font-bold text-white text-md container whitespace-nowrap overflow-hidden"
                    }
                  >
                    Logout
                  </h2>
                </div>
              </Link>
            </div>
            <div className="m-4">
              <div
                style={{ cursor: "pointer" }}
                className="flex flex-row justify-content-start"
                onClick={toggleCollapse}
              >
                <div className={isCollapsed ? "" : "hidden"}>
                  <StartRoundedIcon
                    sx={{
                      marginRight: "5px",
                      marginTop: "-3px",
                      fontSize: "30px",
                      color: "white",
                    }}
                  />
                </div>
                <div className={isCollapsed ? "hidden" : ""}>
                  <KeyboardTabRoundedIcon
                    sx={{
                      marginRight: "5px",
                      marginTop: "-3px",
                      transform: "scaleX(-1)",
                      fontSize: "30px",
                      color: "white",
                    }}
                  />
                </div>
                <h2
                  className={
                    isCollapsed ? "hidden" : "font-bold text-white text-md"
                  }
                >
                  Collapse
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideNavBarV1;
