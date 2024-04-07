import React, { useState } from "react";
import logo from "../../assets/bwh-logo-naked.svg";
import MapIcon from "@mui/icons-material/Map";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TocIcon from "@mui/icons-material/Toc";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

function NewHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="h-screen z-10">
        <div className="shadow-lg h-full w-5vw bg-primary flex flex-col items-center space-y-8">
          <div className="shadow-lg rounded-full bg-white mb-10 mt-10 w-60px h-60px flex justify-center items-center">
            <img className="h-40px" src={logo} alt="Logo" />
          </div>
          <Link to="/home">
            <div
              className={
                "rounded-lg bg-offwhite w-60px h-60px flex justify-center items-center shadow-lg"
              }
            >
              <IconButton aria-label="services">
                <div className="flex flex-col items-center">
                  <MapIcon sx={{ fontSize: "20px" }} />
                  <h2 className="text-sm">Map</h2>
                </div>
              </IconButton>
            </div>
          </Link>
          <Link to="/home/services">
            <div
              className={
                "rounded-lg bg-offwhite w-60px h-60px flex justify-center items-center shadow-lg"
              }
            >
              <IconButton onClick={toggleBar} aria-label="services">
                <div className="flex flex-col items-center">
                  <VolunteerActivismIcon sx={{ fontSize: "20px" }} />
                  <h2 className="text-sm">Services</h2>
                </div>
              </IconButton>
            </div>
          </Link>
          <Link to="/home/data">
            <div
              className={
                "rounded-lg bg-offwhite w-60px h-60px flex justify-center items-center shadow-lg"
              }
            >
              <IconButton onClick={toggleBar} aria-label="services">
                <div className="flex flex-col items-center">
                  <TocIcon sx={{ fontSize: "20px" }} />
                  <h2 className="text-sm">Map Data</h2>
                </div>
              </IconButton>
            </div>
          </Link>
        </div>
      </div>

      {/*<div className={`fixed inset-y-0 left-0 z-0 bg-gray-200 w-40 transition-transform transform ${isOpen ? 'translate-x-36' : 'translate-x-0'}`}>*/}
      {/*    <div className="p-4 flex flex-col">*/}
      {/*        <h1>Services</h1>*/}
      {/*        <div className="m-2 border-t-2 border-blue-500"></div>*/}
      {/*        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">*/}
      {/*            Flower Request*/}
      {/*        </button>*/}
      {/*        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">*/}
      {/*            Security*/}
      {/*        </button>*/}
      {/*        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">*/}
      {/*            Cleaning Request*/}
      {/*        </button>*/}
      {/*    </div>*/}
      {/*</div>*/}
    </>
  );
}

export default NewHeader;
