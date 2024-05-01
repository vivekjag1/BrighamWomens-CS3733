import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../../assets/bwh-logo-shield.png";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import MapIcon from "@mui/icons-material/Map";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TocIcon from "@mui/icons-material/Toc";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useAuth0 } from "@auth0/auth0-react";
import paths from "../common/paths.tsx";
import CollapseImg from "../../assets/collapse.svg";
import "../animations/yellow-underline.css";
import { checkAuth } from "../checkAdminStatus.ts";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import andyImage from "../../assets/employees/atruong.jpeg";
import vivekImage from "../../assets/employees/vjagadeesh.jpeg";
import ademImage from "../../assets/employees/mdjadid.jpeg";
import suliImage from "../../assets/employees/smoukheiber.jpeg";
import frankyImage from "../../assets/employees/fmise.jpeg";
import colinImage from "../../assets/employees/cmasucci.jpeg";
import griffinImage from "../../assets/employees/gbrown.jpeg";
import taehaImage from "../../assets/employees/tsong.jpeg";
import mattImage from "../../assets/employees/mbrown.jpeg";
import danielImage from "../../assets/employees/dgorbunov.jpeg";
import defaultPhoto from "../../assets/employees/default-photo.jpeg";
import { ButtonStyling } from "../common/StylingCommon.ts";
import { AnimatePresence, motion } from "framer-motion";

const definedEmployees = [
  { name: "dgorbunov", imageSrc: danielImage },
  { name: "mbrown", imageSrc: mattImage },
  { name: "atruong", imageSrc: andyImage },
  { name: "vjagadeesh", imageSrc: vivekImage },
  { name: "mdjadid", imageSrc: ademImage },
  { name: "smoukheiber", imageSrc: suliImage },
  { name: "fmise", imageSrc: frankyImage },
  { name: "cmasucci", imageSrc: colinImage },
  { name: "gbrown", imageSrc: griffinImage },
  { name: "tsong", imageSrc: taehaImage },
  { name: "default", imageSrc: defaultPhoto },
];

function NavBar() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const { user } = useAuth0();
  const [isCollapsed, setIsCollapsed] = useState(false);
  //used for delaying the hide of the navBar links
  const [isHidingNavBarInfo, setIsHidingNavBarInfo] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [authorizedStatus, setStatus] = useState<boolean>(false);
  const [pictureURL, setPictureURL] = React.useState<string>("");

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        if (user?.name?.split(" ")[0] == "Admin") {
          setPictureURL(defaultPhoto);
          return;
        }
        const token = await getAccessTokenSilently();
        const userData = {
          userName: user!.name,
        };
        const fetchUser = await MakeProtectedPostRequest(
          APIEndpoints.fetchUser,
          userData,
          token,
        );

        const empName = definedEmployees.find(
          (employee) => employee.name.trim() === fetchUser.data.userName,
        );

        setPictureURL(empName!.imageSrc);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchProfilePicture();
  }, [getAccessTokenSilently, user]);

  const handleSetIsCollapsed = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setIsHidingNavBarInfo(false);
    } else {
      setIsCollapsed(true);
      setShowProfileMenu(false);
      setTimeout(() => {
        setIsHidingNavBarInfo(true);
      }, 350);
    }
  };

  const { logout } = useAuth0();
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  function toggleProfileView() {
    if (!isCollapsed) {
      setShowProfileMenu(!showProfileMenu);
    }
  }

  useEffect(() => {
    const checkRole = async () => {
      const token = await getAccessTokenSilently();
      const result = await checkAuth(token, "mapdata");
      setStatus(result!);
    };
    checkRole().then();
  }, [getAccessTokenSilently, activePage]);

  interface NavbarItemProps {
    to: string;
    setActivePage: (page: string) => void;
    Icon: React.ElementType;
    label: string;
    labelLight?: string;
    collapsed: boolean;
    callback?: () => void;
  }

  const NavbarItem: React.FC<NavbarItemProps> = ({
    to,
    setActivePage,
    Icon,
    label,
    labelLight,
    collapsed,
    callback,
  }) => {
    return (
      <div className="pt-[0.8rem] pb-[0.8rem] ml-[1.5rem] mr-[1.5rem] relative animate-underline-yellow items-center overflow-hidden">
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
            className={`flex child absolute bottom-[0.5rem] right-0 w-full h-0.5 bg-highlight transform hover:scale-x-1 transition-transform duration-300 ${location.pathname == to ? "scale-x-1" : "scale-x-0"}`}
            style={{ transformOrigin: "center" }}
          ></span>
        </Link>
      </div>
    );
  };

  function UserProfileItem(props: { collapsed: boolean }) {
    return (
      <div className=" relative mb-[1rem] mr-[1.5rem] ml-[1rem]  items-center ">
        <AnimatePresence>
          {showProfileMenu && !isCollapsed && (
            <motion.div className="absolute bottom-[3rem] left-[50%] translate-x-[-50%] mb-[1rem]">
              <motion.div
                className="flex flex-col gap-2 bg-[#eaeaea] p-3 rounded-xl"
                key="profileOption"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1, transformOrigin: "bottom" }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.1, delay: 0.3 }}
              >
                <Link to={paths.PROFILE}>
                  <Button
                    sx={profileButtonStyles}
                    onClick={toggleProfileView}
                    startIcon={<PersonIcon />}
                  >
                    Profile
                  </Button>
                </Link>
                <Button
                  sx={logoutButtonStyles}
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                >
                  Log Out
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div>
          <div
            className="overflow-hidden flex flex-row text-white items-center z-[100] bg-secondary cursor-pointer "
            onClick={toggleProfileView}
          >
            {isAuthenticated ? (
              <div className="flex flex-row items-center ">
                <img
                  className="w-[2.5rem] h-[2.5rem] object-cover rounded-full mr-4 z-[100]"
                  src={pictureURL}
                  alt="user profile picture"
                />
                <h2
                  style={{
                    opacity: props.collapsed ? 0 : 100,
                    fontWeight: 500,
                  }}
                  className="text-lg whitespace-nowrap z-[100]  "
                >
                  {user?.name?.split(" ")[0]}
                </h2>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="z-10 bg-offwhite">
      <div
        className={`shadow-lg h-screen relative bg-secondary flex flex-col space-y-[2rem] transition-width ease-in-out duration-500 z-10 ${isCollapsed ? " w-[5rem]" : "w-[14rem]"}`}
        style={{
          borderTopRightRadius: "10px", // Adjust the value as needed
          borderBottomRightRadius: "10px", // Adjust the value as needed
        }}
      >
        {/* Header image */}
        <div className="flex flex-col justify-center overflow-hidden">
          <Link to={paths.HERO} onClick={() => setActivePage(paths.HERO)}>
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
                Kiosk Menu
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
              ></h2>
            </div>
          </Link>
        </div>
        {/* Navbar items */}
        <div className="flex flex-col gap-[0.7rem]">
          <NavbarItem
            to={paths.HOME}
            setActivePage={setActivePage}
            Icon={MapIcon}
            label="Map"
            collapsed={isHidingNavBarInfo}
          />
          {isAuthenticated && (
            <>
              <NavbarItem
                to={paths.MAP_EDITOR}
                setActivePage={setActivePage}
                Icon={EditLocationAltIcon}
                label="Map Editor"
                labelLight=""
                collapsed={isHidingNavBarInfo}
              />
              <NavbarItem
                to={paths.MAP_DATA}
                setActivePage={setActivePage}
                Icon={AddLocationAltIcon}
                label="Map Data"
                labelLight=""
                collapsed={isHidingNavBarInfo}
              />
              <NavbarItem
                to={paths.SERVICES}
                setActivePage={setActivePage}
                Icon={VolunteerActivismIcon}
                label="Services"
                collapsed={isHidingNavBarInfo}
              />
              <NavbarItem
                to={paths.SERVICE_LOG}
                setActivePage={setActivePage}
                Icon={TocIcon}
                label="Service Log"
                labelLight=""
                collapsed={isHidingNavBarInfo}
              />
              <NavbarItem
                to={paths.EMPLOYEE_LOG}
                setActivePage={setActivePage}
                Icon={AssignmentIndIcon}
                label="Employee Log"
                labelLight=""
                collapsed={isHidingNavBarInfo}
              />
            </>
          )}
        </div>

        {/* Sign out */}
        {isAuthenticated ? (
          <div className="relative flex flex-col flex-grow justify-end">
            <div className="flex flex-col">
              <UserProfileItem collapsed={isHidingNavBarInfo} />
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col flex-grow justify-end">
            <div className="flex flex-col">
              <UserProfileItem collapsed={isHidingNavBarInfo} />
            </div>
          </div>
        )}
        {!isAuthenticated ? (
          <div className="relative flex flex-col flex-grow justify-end">
            <div className="flex flex-col">
              <NavbarItem
                to={paths.MAP_DATA}
                setActivePage={setActivePage}
                Icon={LoginIcon}
                label={"Sign in"}
                collapsed={isHidingNavBarInfo}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

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

const profileButtonStyles = {
  color: "white",
  backgroundColor: ButtonStyling.blueButton,
  width: "180px",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: ButtonStyling.blueButtonHover,
  },
  fontFamily: "Poppins, sans-serif",
} as const;

const logoutButtonStyles = {
  color: "white",
  backgroundColor: ButtonStyling.redButton,
  width: "180px",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: ButtonStyling.redButtonHover,
  },
  fontFamily: "Poppins, sans-serif",
} as const;

export default NavBar;
