import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logo from "../../assets/bwh-logo-shield.png";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import MapIcon from "@mui/icons-material/Map";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TocIcon from "@mui/icons-material/Toc";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/animatedLine.css";
import paths from "../paths/paths.tsx";
import CollapseImg from "../../assets/collapse.svg";
interface navBarProps {
  currentPage: string;
}
function NavBar(props: navBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  //used for delaying the hide of the navBar links
  const [isHidingNavBarInfo, setIsHidingNavBarInfo] = useState(false);
  const handleSetIsCollapsed = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setIsHidingNavBarInfo(false);
    } else {
      setIsCollapsed(true);
      setTimeout(() => {
        setIsHidingNavBarInfo(true);
      }, 350);
    }
  };

  const { logout } = useAuth0();

  const [activePage, setActivePage] = useState(useLocation().pathname);

  useEffect(() => {
    setActivePage(location.pathname);
    console.log("inside use effect");
    console.log(props.currentPage);
    // if(props.currentPage && props.currentPage != activePage){
    //  // setActivePage(props.currentPage);
    //
    // }
  }, [activePage, props.currentPage]);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
    setActivePage(window.location.origin);
  };

  interface NavbarItemProps {
    to: string;
    activePage: string;
    setActivePage: (page: string) => void;
    Icon: React.ElementType;
    label: string;
    labelLight?: string;
    collapsed: boolean;
    callback?: () => void;
  }

  const NavbarItem: React.FC<NavbarItemProps> = ({
    to,
    activePage,
    setActivePage,
    Icon,
    label,
    labelLight,
    collapsed,
    callback,
  }) => {
    return (
      <div className="pt-[0.8rem] pb-[0.8rem] ml-[1.5rem] mr-[1.5rem] relative parent items-center overflow-hidden">
        <Link
          to={to}
          className="inline-block"
          onClick={() => {
            setActivePage(to);
            if (callback != undefined) callback();
          }}
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
    <div className="z-10">
      <div
        className={`shadow-lg h-screen relative bg-secondary flex flex-col space-y-[2rem] transition-width ease-in-out duration-500 z-10 ${isCollapsed ? " w-[5rem]" : "w-[14rem]"}`}
      >
        {/* Header image */}
        <div className="flex flex-col justify-center overflow-hidden">
          <Link to={paths.MAP} onClick={() => setActivePage(paths.MAP)}>
            <div className="flex mt-[2.5rem] ml-[0.93rem] text-white">
              <img className="h-[57px] pr-[0.7rem]" src={logo} alt="Logo" />
              <h2
                style={{
                  fontWeight: 500,
                }}
                className={
                  isHidingNavBarInfo
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
                  isHidingNavBarInfo
                    ? "hidden"
                    : "text-2xl whitespace-nowrap self-center"
                }
              >
                Menu
              </h2>
            </div>
          </Link>
        </div>

        {/* Navbar items */}
        <div className="flex flex-col gap-[0.7rem]">
          <NavbarItem
            to={paths.MAP}
            activePage={activePage}
            setActivePage={setActivePage}
            Icon={MapIcon}
            label="Map"
            collapsed={isHidingNavBarInfo}
          />
          <NavbarItem
            to={paths.MAP_EDITOR}
            activePage={activePage}
            setActivePage={setActivePage}
            Icon={EditLocationAltIcon}
            label="Map"
            labelLight="Editor"
            collapsed={isHidingNavBarInfo}
          />
          <NavbarItem
            to={paths.MAP_DATA}
            activePage={activePage}
            setActivePage={setActivePage}
            Icon={AddLocationAltIcon}
            label="Map"
            labelLight="Data"
            collapsed={isHidingNavBarInfo}
          />
          <NavbarItem
            to={paths.SERVICES}
            activePage={activePage}
            setActivePage={setActivePage}
            Icon={VolunteerActivismIcon}
            label="Services"
            collapsed={isHidingNavBarInfo}
          />
          <NavbarItem
            to={paths.SERVICES_DATA}
            activePage={activePage}
            setActivePage={setActivePage}
            Icon={TocIcon}
            label="Service"
            labelLight="Data"
            collapsed={isHidingNavBarInfo}
          />
        </div>

        {/* Sign out */}
        <div className="relative flex flex-col flex-grow justify-end">
          <div className="flex flex-col">
            <NavbarItem
              to={paths.LOGIN}
              activePage={activePage}
              setActivePage={setActivePage}
              Icon={LogoutIcon}
              label={"Sign out"}
              collapsed={isHidingNavBarInfo}
              callback={handleLogout}
            />
          </div>
        </div>
        {/* Collapse Button */}
        <div className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-[-12px]">
          <img
            src={CollapseImg}
            className={`cursor-pointer w-7 duration-500 ${isCollapsed ? "" : "rotate-180"}`}
            onClick={handleSetIsCollapsed}
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
