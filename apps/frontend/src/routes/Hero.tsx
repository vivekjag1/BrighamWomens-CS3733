import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner.tsx";
import paths from "../paths/paths.tsx";
import "../styles/Hero.css";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const bannerChildren: JSX.Element = (
  <p>
    *<span className="underline">Disclaimer</span>: This website is a term
    project exercise for WPI CS 3733 Software Engineering (Prof. Wong) and is to
    not be confused with the actual Brigham & Women's Hospital Website.
  </p>
);

function Hero() {
  const navigate = useNavigate();
  const [bannerOpen, setBannerOpen] = useState(true);

  return (
    <div>
      <div className="landing-page w-screen h-screen bg-no-repeat bg-cover bg-center">
        <AnimatePresence>
          {bannerOpen && (
            <div className="w-[80vw] absolute top-[1vh] left-[10vw] z-10">
              <Banner onClick={() => setBannerOpen(false)}>
                {bannerChildren}
              </Banner>
            </div>
          )}
        </AnimatePresence>
        <div
          onClick={() => navigate(paths.HOME)}
          className="opening-remarks w-screen h-screen flex flex-col justify-center items-center gap-8"
        >
          <p className="text-[3vw] font-semibold text-white">
            Welcome to Brigham and Women's Hospital
          </p>
          <p className="font-normal text-[2vw] text-white">
            Navigation made simple
          </p>
          <p className="font-light text-[2vw] text-white animate-pulse">
            Touch the screen to begin.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
