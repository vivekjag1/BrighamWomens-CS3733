import React from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  function handlePathfind() {
    navigate("/home");
  }

  return (
    <div>
      <div
        onClick={handlePathfind}
        className="landing-page w-screen h-screen bg-no-repeat bg-cover bg-center"
      >
        <div className="opening-remarks w-screen h-screen flex flex-col justify-center items-center gap-8">
          <label className="text-[3vw] font-semibold text-white">
            Welcome to Brigham and Women's Hospital
          </label>
          <label className="font-normal text-[2vw] text-white">
            Navigation made simple
          </label>
          <label className="font-light text-[2vw] text-white animate-pulse">
            Touch the screen to begin.
          </label>
          <label className="absolute bottom-[3vh] font-light text-[1vw] text-white">
            *Disclaimer: this website is a WPI project, and not the Brigham and
            Women's website. Please visit brighamandwomens.org for the actual
            hospital.
          </label>
        </div>
      </div>
    </div>
  );
}

export default Login;
