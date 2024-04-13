import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import logo from "../../assets/bwh-logo-shield.png";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import MapIcon from "@mui/icons-material/Map";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TocIcon from "@mui/icons-material/Toc";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
//import IconButton from "@mui/material/IconButton";
import KeyboardTabRoundedIcon from "@mui/icons-material/KeyboardTabRounded";
import StartRoundedIcon from "@mui/icons-material/StartRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/animatedLine.css";
import paths from "../paths/paths.tsx";

function SideNavBarV1() {
  const { isAuthenticated } = useAuth0();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { logout } = useAuth0();

  const [activePage, setActivePage] = useState(useLocation().pathname);

  const handleLogout = () => {
    // logout({returnTo: window.location.origin} );
    logout().then().catch(console.error);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  console.log(isAuthenticated);
  return (
    <div>
      <div className=" z-10">
        <div
          className={`shadow-lg h-screen bg-secondary flex flex-col space-y-8 transition-width ease-in-out duration-500 ${isCollapsed ? "w-[5rem]" : "w-[11rem]"}`}
        >
          <div className=" flex flex-row self-center">
            <Link to={paths.HOME}>
              <div className="shadow-lg rounded-lg bg-white mb-10 mt-10 w-[60px] h-[60px] flex justify-center items-center">
                <img className="h-[40px]" src={logo} alt="Logo" />
              </div>
            </Link>
          </div>

          <div className="">
            <div className="ml-[1.5rem] mr-[1.5rem] relative parent">
              <Link
                to={paths.HOME}
                className="inline-block"
                onClick={() => setActivePage(paths.HOME)}
              >
                <div className={`flex flex-row text-white`}>
                  <MapIcon
                    sx={{
                      marginRight: "5px",
                      marginTop: "-3px",
                      fontSize: "30px",
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
                <span
                  className={`child absolute bottom-0 right-0 w-full h-0.5 bg-highlight transform hover:scale-x-1 transition-transform duration-300 ${activePage == paths.HOME ? "scale-x-1" : "scale-x-0"}`}
                  style={{
                    transformOrigin: "left",
                  }}
                ></span>
              </Link>
            </div>

            <div className="m-[1.5rem] mr-[1.5rem] relative parent">
              <Link
                to={paths.SERVICES}
                className="inline-block"
                onClick={() => setActivePage(paths.SERVICES)}
              >
                <div className={`flex flex-row text-white`}>
                  <VolunteerActivismIcon
                    sx={{
                      marginRight: "5px",
                      marginTop: "-3px",
                      fontSize: "30px",
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
                  <span
                    className={`child absolute bottom-0 right-0 w-full h-0.5 bg-highlight transform hover:scale-x-1 transition-transform duration-300 ${activePage == paths.SERVICES ? "scale-x-1" : "scale-x-0"}`}
                    style={{
                      transformOrigin: "left",
                    }}
                  ></span>
                </div>
              </Link>
            </div>
            <div className="m-[1.5rem] mr-[1.5rem] relative parent">
              <Link
                to={paths.SERVICES_DATA}
                className="inline-block"
                onClick={() => setActivePage(paths.SERVICES_DATA)}
              >
                <div className={`flex flex-row text-white`}>
                  <TocIcon
                    sx={{
                      marginRight: "5px",
                      marginTop: "-3px",
                      fontSize: "30px",
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
                  <span
                    className={`child absolute bottom-0 right-0 w-full h-0.5 bg-highlight transform hover:scale-x-1 transition-transform duration-300 ${activePage == paths.SERVICES_DATA ? "scale-x-1" : "scale-x-0"}`}
                    style={{
                      transformOrigin: "left",
                    }}
                  ></span>
                </div>
              </Link>
            </div>
            <div className="m-[1.5rem] mr-[1.5rem] relative parent">
              <Link
                to={paths.MAP_DATA}
                className="inline-block"
                onClick={() => setActivePage(paths.MAP_DATA)}
              >
                <div className={`flex flex-row text-white`}>
                  <AddLocationAltIcon
                    sx={{
                      marginRight: "5px",
                      marginTop: "-3px",
                      fontSize: "30px",
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
                  <span
                    className={`child absolute bottom-0 right-0 w-full h-0.5 bg-highlight
                   transform hover:scale-x-1 transition-transform duration-300 ${activePage == paths.MAP_DATA ? "scale-x-1" : "scale-x-0"}`}
                    style={{
                      transformOrigin: "left",
                    }}
                  ></span>
                </div>
              </Link>
            </div>
            <div className="m-[1.5rem] mr-[1.5rem] relative parent">
              <Link
                to={paths.MAP_EDITOR}
                className="inline-block"
                onClick={() => setActivePage(paths.MAP_EDITOR)}
              >
                <div className={`flex flex-row text-white`}>
                  <EditLocationAltIcon
                    sx={{
                      marginRight: "5px",
                      marginTop: "-3px",
                      fontSize: "30px",
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
                  <span
                    className={`child absolute bottom-0 right-0 w-full h-0.5 bg-highlight transform hover:scale-x-1 transition-transform duration-300 ${activePage == paths.MAP_EDITOR ? "scale-x-1" : "scale-x-0"}`}
                    style={{
                      transformOrigin: "left",
                    }}
                  ></span>
                </div>
              </Link>
            </div>
            <div className="m-[1.5rem] flex">
              <div
                style={{ cursor: "pointer" }}
                className="flex flex-row"
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
            {/*Logout button */}
            <div
              className="absolute bottom-1 to m-[1.5rem]"
              onClick={handleLogout}
            >
              <Link to={paths.LOGIN}>
                {" "}
                {/* enter link to button here to log out*/}
                <div
                  className="flex flex-row" /*onMouseEnter={toggleHover} onMouseLeave={toggleHover}*/
                >
                  <LogoutIcon
                    sx={{
                      marginRight: "5px",
                      marginTop: "140px",
                      fontSize: "30px",
                      color: "white",
                      transform: "scaleX(-1)",
                    }}
                  />
                  <h2
                    className={
                      isCollapsed
                        ? "hidden"
                        : "font-bold text-white text-md container whitespace-nowrap overflow-hidden"
                    }
                    style={{ marginTop: "143px" }}
                  >
                    Logout
                  </h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNavBarV1;
