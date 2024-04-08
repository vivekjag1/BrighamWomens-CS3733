import React, { useState } from "react";
import logo from "../../assets/bwh-logo-naked.svg";
import MapIcon from "@mui/icons-material/Map";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TocIcon from "@mui/icons-material/Toc";
//import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import KeyboardTabRoundedIcon from "@mui/icons-material/KeyboardTabRounded";
import StartRoundedIcon from "@mui/icons-material/StartRounded";

const insertLineBreaks = (text: string) => {
  const words = text.split(" ");
  const newText: Array<string | JSX.Element> = [];
  for (let i = 0; i < words.length; i += 2) {
    newText.push(words.slice(i, i + 2).join(" "));
    if (i + 2 < words.length) {
      newText.push((<br key={i.toString()} />) as JSX.Element);
    }
  }
  return newText;
};

function NewHeader() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // const [isHover, setHover] = useState(false);
  //
  // const toggleHover = () => {
  //     setHover(!isHover);
  // };

  return (
    <>
      <div className="h-screen w-5vw"></div>
      <div className="absolute z-10">
        <div
          className={
            isCollapsed
              ? " pl-1 shadow-lg h-screen w-5vw bg-secondary flex flex-col justify-content-start space-y-8"
              : "pl-1 shadow-lg h-screen w-15vw bg-secondary flex flex-col justify-content-start space-y-8"
          }
        >
          <div className="flex flex-row ">
            <div className="shadow-lg rounded-full bg-white mb-10 mt-10 w-60px h-60px flex justify-center items-center">
              <img className="h-40px" src={logo} alt="Logo" />
            </div>
            <h2
              className={
                isCollapsed
                  ? "hidden"
                  : "p-5 font-bold text-white text-md flex items-center"
              }
            >
              {insertLineBreaks("Brigham and Women's Hospital")}
            </h2>
          </div>

          <div className="m-4">
            <Link to="/home">
              <div
                className="flex flex-row justify-content-start" /*onMouseEnter={toggleHover} onMouseLeave={toggleHover}*/
              >
                <MapIcon
                  sx={{
                    marginRight: "5px",
                    marginTop: "-3px",
                    fontSize: "30px",
                    color: "white",
                  }}
                />
                <h2
                  className={
                    isCollapsed ? "hidden" : "font-bold text-white text-md"
                  }
                >
                  Map
                </h2>
              </div>
              {/*<div className={isHover ? "bg-secondary hidden w-20 h-10 z-40" : "bg-secondary w-20 h-10 z-40"}>*/}
              {/*    */}
              {/*</div>*/}
            </Link>
          </div>
          <div className="m-4">
            <Link to="/home/services">
              <div
                className="flex flex-row justify-content-start" /*onMouseEnter={toggleHover} onMouseLeave={toggleHover}*/
              >
                <VolunteerActivismIcon
                  sx={{
                    marginRight: "5px",
                    marginTop: "-3px",
                    fontSize: "30px",
                    color: "white",
                  }}
                />
                <h2
                  className={
                    isCollapsed ? "hidden" : "font-bold text-white text-md"
                  }
                >
                  Services
                </h2>
              </div>
              {/*<div className={isHover ? "bg-secondary hidden w-20 h-10 z-40" : "bg-secondary w-20 h-10 z-40"}>*/}
              {/*    */}
              {/*</div>*/}
            </Link>
          </div>
          <div className="m-4">
            <Link to="/home/data">
              <div
                className="flex flex-row justify-content-start" /*onMouseEnter={toggleHover} onMouseLeave={toggleHover}*/
              >
                <TocIcon
                  sx={{
                    marginRight: "5px",
                    marginTop: "-3px",
                    fontSize: "30px",
                    color: "white",
                  }}
                />
                <h2
                  className={
                    isCollapsed ? "hidden" : "font-bold text-white text-md"
                  }
                >
                  Map Data
                </h2>
              </div>
              {/*<div className={isHover ? "bg-secondary hidden w-20 h-10 z-40" : "bg-secondary w-20 h-10 z-40"}>*/}
              {/*    */}
              {/*</div>*/}
            </Link>
          </div>
          <div className="m-4">
            <Link to="/home/services/data">
              <div
                className="flex flex-row justify-content-start" /*onMouseEnter={toggleHover} onMouseLeave={toggleHover}*/
              >
                <TocIcon
                  sx={{
                    marginRight: "5px",
                    marginTop: "-3px",
                    fontSize: "30px",
                    color: "white",
                  }}
                />
                <h2
                  className={
                    isCollapsed ? "hidden" : "font-bold text-white text-md"
                  }
                >
                  Service Data
                </h2>
              </div>
              {/*<div className={isHover ? "bg-secondary hidden w-20 h-10 z-40" : "bg-secondary w-20 h-10 z-40"}>*/}
              {/*    */}
              {/*</div>*/}
            </Link>
          </div>

          <div className="m-4">
            <div
              style={{ cursor: "pointer" }}
              className="flex flex-row justify-content-start"
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
        </div>

        {/*<Link to="/home">*/}
        {/*    <div*/}
        {/*        className={*/}
        {/*            "rounded-lg bg-offwhite w-60px h-60px flex justify-center items-center shadow-lg"*/}
        {/*        }*/}
        {/*    >*/}
        {/*        <IconButton aria-label="services">*/}
        {/*            <div className="flex flex-col items-center">*/}
        {/*                <MapIcon sx={{fontSize: "20px"}}/>*/}
        {/*            </div>*/}
        {/*        </IconButton>*/}
        {/*    </div>*/}
        {/*    <h2 className="text-sm">Map</h2>*/}
        {/*</Link>*/}
        {/*<Link to="/home/services">*/}
        {/*    <div*/}
        {/*        className={*/}
        {/*            "rounded-lg bg-offwhite w-60px h-60px flex justify-center items-center shadow-lg"*/}
        {/*        }*/}
        {/*    >*/}
        {/*        <IconButton onClick={toggleBar} aria-label="services">*/}
        {/*            <div className="flex flex-col items-center">*/}
        {/*                <VolunteerActivismIcon sx={{fontSize: "20px"}}/>*/}
        {/*                <h2 className="text-sm">Services</h2>*/}
        {/*            </div>*/}
        {/*        </IconButton>*/}
        {/*    </div>*/}
        {/*</Link>*/}
        {/*<Link to="/home/data">*/}
        {/*    <div*/}
        {/*        className={*/}
        {/*            "rounded-lg bg-offwhite w-60px h-60px flex justify-center items-center shadow-lg"*/}
        {/*        }*/}
        {/*    >*/}
        {/*        <IconButton onClick={toggleBar} aria-label="services">*/}
        {/*            <div className="flex flex-col items-center">*/}
        {/*                <TocIcon sx={{fontSize: "20px"}}/>*/}
        {/*                <h2 className="text-sm">Map Data</h2>*/}
        {/*            </div>*/}
        {/*        </IconButton>*/}
        {/*    </div>*/}
        {/*</Link>*/}
        {/*<Link to="/home/services/data">*/}
        {/*    <div*/}
        {/*        className={*/}
        {/*            "rounded-lg bg-offwhite w-60px h-60px flex justify-center items-center shadow-lg"*/}
        {/*        }*/}
        {/*    >*/}
        {/*        <IconButton onClick={toggleBar} aria-label="service">*/}
        {/*            <div className="flex flex-col items-center">*/}
        {/*                <TocIcon sx={{fontSize: "20px"}}/>*/}
        {/*                <h2 className="text-sm w-10">Service Data</h2>*/}
        {/*            </div>*/}
        {/*        </IconButton>*/}
        {/*    </div>*/}
        {/*</Link>*/}
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
