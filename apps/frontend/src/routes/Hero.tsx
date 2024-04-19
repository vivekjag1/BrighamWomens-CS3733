import React from "react";
import { useNavigate } from "react-router-dom";
import paths from "../paths/paths.tsx";
import "../styles/Hero.css";

function Hero() {
  const navigate = useNavigate();
  function handleClick() {
    navigate(paths.HOME);
  }

  return (
    <div>
      <div
        onClick={handleClick}
        className="landing-page w-screen h-screen bg-no-repeat bg-cover bg-center"
      >
        <div className="opening-remarks w-screen h-screen flex flex-col justify-center items-center gap-8">
          <label className="bg-white absolute top-[2vh] font-light text-[1vw] rounded-xl p-3 text-secondary">
            <span className="underline font-italic">Disclaimer</span>: This
            website is a project for WPI CS 3733 Software Engineering (Prof.
            Wong) and is to not be confused with the actual Brigham & Women's
            Hospital Website.
          </label>
          <label className="text-[3vw] font-semibold text-white">
            Welcome to Brigham and Women's Hospital
          </label>
          {/*<label className="font-normal text-[2vw] text-white">*/}
          {/*  Navigation made simple*/}
          {/*</label>*/}
          <label className="font-light text-[2vw] text-white animate-pulse">
            Touch the screen to begin.
          </label>
        </div>
      </div>
    </div>
  );
}

export default Hero;
