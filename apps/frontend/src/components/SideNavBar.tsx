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

function SideNavBar() {
  // const { isAuthenticated } = useAuth0();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { logout } = useAuth0();

  const [activePage, setActivePage] = useState(useLocation().pathname);

  const handleLogout = () => {
    // logout({returnTo: window.location.origin} );
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  interface NavbarItemProps {
    to: string;
    activePage: string;
    setActivePage: (page: string) => void;
    Icon: React.ElementType;
    label: string;
    labelLight?: string;
    collapsed: boolean;
  }

  const NavbarItem: React.FC<NavbarItemProps> = ({
    to,
    activePage,
    setActivePage,
    Icon,
    label,
    labelLight,
    collapsed,
  }) => {
    return (
      <div className="pt-[0.8rem] pb-[0.8rem] ml-[1.5rem] mr-[1.5rem] relative parent items-center">
        <Link
          to={to}
          className="inline-block"
          onClick={() => setActivePage(to)}
        >
          <div className="flex flex-row text-white items-center justify-center">
            <Icon sx={{ marginRight: "0.4rem", fontSize: "32px" }} />
            <h2
              style={{
                opacity: collapsed ? 0 : 100,
                fontWeight: 500,
              }}
              className="text-lg whitespace-nowrap"
            >
              {label}
            </h2>
            <span>&nbsp;</span> {/* Add space */}
            <h2
              style={{
                opacity: collapsed ? 0 : 1,
                fontWeight: 100,
              }}
              className="text-lg whitespace-nowrap"
            >
              {labelLight}
            </h2>
          </div>
          <span
            className={`flex child absolute bottom-[0.5rem] right-0 w-full h-0.5 bg-highlight transform hover:scale-x-1 transition-transform duration-300 ${activePage === to ? "scale-x-1" : "scale-x-0"}`}
            style={{ transformOrigin: "left" }}
          ></span>
        </Link>
      </div>
    );
  };

  return (
    <div>
      <div className="z-10">
        <div
          className={`shadow-lg h-screen bg-secondary flex flex-col space-y-8 transition-width ease-in-out duration-500 ${isCollapsed ? "w-[5rem]" : "w-[14rem]"}`}
        >
          <div className="flex flex-col justify-center">
            <Link to={paths.MAP} onClick={() => setActivePage(paths.MAP)}>
              <div className="flex mt-[2.5rem] ml-[0.93rem] text-white">
                <img className="h-[57px] pr-[0.7rem]" src={logo} alt="Logo" />
                <h2
                  style={{
                    fontWeight: 500,
                  }}
                  className={
                    isCollapsed
                      ? "hidden"
                      : "text-2xl whitespace-nowrap self-center"
                  }
                >
                  Kiosk
                </h2>
                <span>&nbsp;</span> {/* Add space */}
                <h2
                  style={{
                    fontWeight: 100,
                  }}
                  className={
                    isCollapsed
                      ? "hidden"
                      : "text-2xl whitespace-nowrap self-center"
                  }
                >
                  Menu
                </h2>
              </div>
              {/*<div className="mb-6">*/}
              {/*  <h1*/}
              {/*    className={*/}
              {/*      isCollapsed*/}
              {/*        ? "hidden"*/}
              {/*        : "text-xl font-bold text-white text-md whitespace-nowrap"*/}
              {/*    }*/}
              {/*  >*/}
              {/*    Hospital Kiosk*/}
              {/*  </h1>*/}
              {/*</div>*/}
            </Link>
          </div>

          <div className="">
            <NavbarItem
              to={paths.MAP}
              activePage={activePage}
              setActivePage={setActivePage}
              Icon={MapIcon}
              label="Map"
              collapsed={isCollapsed}
            />
            <NavbarItem
              to={paths.MAP_EDITOR}
              activePage={activePage}
              setActivePage={setActivePage}
              Icon={EditLocationAltIcon}
              label="Map"
              labelLight="Editor"
              collapsed={isCollapsed}
            />
            <NavbarItem
              to={paths.MAP_DATA}
              activePage={activePage}
              setActivePage={setActivePage}
              Icon={AddLocationAltIcon}
              label="Map"
              labelLight="Data"
              collapsed={isCollapsed}
            />
            <NavbarItem
              to={paths.SERVICES}
              activePage={activePage}
              setActivePage={setActivePage}
              Icon={VolunteerActivismIcon}
              label="Services"
              collapsed={isCollapsed}
            />
            <NavbarItem
              to={paths.SERVICES_DATA}
              activePage={activePage}
              setActivePage={setActivePage}
              Icon={TocIcon}
              label="Service"
              labelLight="Data"
              collapsed={isCollapsed}
            />

            <div className="m-[1.5rem] mr-[1.5rem] flex">
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
              className="fixed bottom-1 to m-[1.5rem]"
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
                      marginBottom: "10px",
                      fontSize: "30px",
                      color: "white",
                      transform: "scaleX(-1)",
                    }}
                  />
                  <h2
                    className={
                      isCollapsed
                        ? "hidden"
                        : "font-bold text-white text-md container whitespace-nowrap overflow-hidden pt-[3px]"
                    }
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

export default SideNavBar;
