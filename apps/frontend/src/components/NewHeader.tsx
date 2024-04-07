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
        <div className="shadow-lg h-full w-10vw bg-primary flex flex-col items-center space-y-8">
          <div className="shadow-lg rounded-full bg-white mt-10 w-100px h-100px flex justify-center items-center">
            <img className="h-80px" src={logo} alt="Logo" />
          </div>
          <Link to="/home">
            <div
              className={
                "rounded-lg bg-offwhite w-100px h-100px flex justify-center items-center shadow-lg"
              }
            >
              <IconButton aria-label="map">
                <MapIcon />
              </IconButton>
            </div>
          </Link>
          <Link to="/home/services">
            <div
              className={
                "rounded-lg bg-offwhite w-100px h-100px flex justify-center items-center shadow-lg"
              }
            >
              <IconButton onClick={toggleBar} aria-label="services">
                <VolunteerActivismIcon />
              </IconButton>
            </div>
          </Link>
          <Link to="/home/data">
            <div
              className={
                "rounded-lg bg-offwhite w-100px h-100px flex justify-center items-center shadow-lg"
              }
            >
              <IconButton aria-label="table">
                <TocIcon />
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
