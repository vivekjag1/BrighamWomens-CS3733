import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner/Banner.tsx";
import paths from "../common/paths.tsx";
import "../styles/Hero.css";

const bannerChildren: JSX.Element = (
  <p>
    <span className="font-bold">Disclaimer: </span>This is a project for WPI CS
    3733 Software Engineering (Prof. Wong) and is not the actual Brigham &
    Women's Hospital Website.
  </p>
);

function Hero() {
  const navigate = useNavigate();
  const [bannerOpen, setBannerOpen] = useState(true);

  return (
    <div>
      <div className="landing-page w-screen h-screen bg-no-repeat bg-cover bg-center">
        {bannerOpen && (
          <div className="absolute top-0 left-0 w-full flex justify-center items-center h-[15vh]">
            <Banner onClick={() => setBannerOpen(false)}>
              {bannerChildren}
            </Banner>
          </div>
        )}
        <div
          onClick={() => navigate(paths.HOME)}
          className="text-fade-in w-screen h-screen flex flex-col justify-center items-center gap-8"
        >
          <p className="text-[3vw] font-semibold text-white">
            Welcome to Brigham and Women's Hospital
          </p>
          <p className="font-light text-[2vw] text-white animate-pulse">
            Click Anywhere to Start
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
