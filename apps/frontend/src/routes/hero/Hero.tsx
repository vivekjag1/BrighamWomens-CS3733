import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Banner from "../../components/banner/Banner.tsx";
import Tooltip from "@mui/material/Tooltip";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import paths from "../../common/paths.tsx";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(getDateTime);
  const [bannerOpen, setBannerOpen] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(getDateTime);
    }, 1000);

    const timeoutId = setTimeout(() => {
      setBannerOpen(false);
    }, 7500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  const dateSplit = dateTime.split(" at ");
  const date = dateSplit[0];
  const time = dateSplit[1];

  function getDateTime(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      weekday: "long",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleString("en-US", options);
  }

  const bannerElement = (
    <AnimatePresence>
      {bannerOpen && (
        <motion.div
          key="banner"
          className="absolute top-0 left-0 w-full flex justify-center items-center h-[15vw]"
        >
          <Banner>{bannerChildren}</Banner>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex w-screen h-screen">
      {bannerElement}
      <div className="h-screen w-[65%] relative hero-hospital-image">
        <div className="h-full w-full flex items-center">
          <div className="flex flex-col absolute left-[2%] animate-abracadabra">
            <h2 className="text-[6vw] text-white font-bold">Welcome</h2>
            <h2 className="text-[1.8vw] text-white font-extralight relative mt-[-1rem]">
              Brigham and Women's Hospital
            </h2>
          </div>
          <div className="absolute top-[2%] left-[2%] flex flex-row gap-2 items-baseline">
            <h2 className="text-white text-[1.75vw] font-medium">{time}</h2>
            <h2 className="text-white text-[1.25vw] font-thin">{date}</h2>
          </div>
        </div>
        <div className="h-full flex items-end absolute bottom-[2%] left-[2%]">
          <div className="flex gap-[3vh]">
            <div
              className="text-white cursor-pointer animate-underline-white"
              onClick={() => navigate(paths.PROFILE)}
            >
              <Tooltip title="Login" placement="top" arrow>
                <LoginIcon sx={iconStyles} />
              </Tooltip>
            </div>
            <div
              className="text-white cursor-pointer animate-underline-white"
              onClick={() => navigate(paths.ABOUT)}
            >
              <Tooltip title="About" placement="top" arrow>
                <InfoIcon sx={iconStyles} />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-screen w-[35%] relative hero-map-image cursor-pointer border-l-2 border-solid border-secondary"
        onClick={() => navigate(paths.HOME)}
      >
        <div className="h-full w-full flex items-center">
          <div className="flex flex-col absolute left-[3%] animate-abracadabra hook">
            <h2 className="text-[3.5vw] text-white font-medium">
              Find Your Way
            </h2>
            <h2 className="text-[1.75vw] text-white font-extralight self-start mt-[-0.2rem]">
              Click to Enter
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

const iconStyles = {
  fontSize: "2.5rem",
} as const;

const bannerChildren: JSX.Element = (
  <p className="text-[0.8vw]">
    <span className="font-bold">Disclaimer: </span>This is a project for WPI CS
    3733 Software Engineering (Prof. Wong) and is not the actual Brigham &
    Women's Hospital Website.
  </p>
);

export default Hero;
