import map from "../../assets/00_thelowerlevel1.png";
import { useState } from "react";
//import classNames from 'classnames';
import * as React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";

function NewHome() {
  const [searchShowing, changeVisual] = useState(() => false);
  function clickedButton() {
    changeVisual(!searchShowing);
  }

  const [divClassName, setDivClassName] = useState("w-2000px h-1000px");

  const handlePositiveClick = () => {
    if (divClassName === "w-1000px h-500px") {
      setDivClassName("w-2000px h-1000px");
    } else if (divClassName === "w-2000px h-1000px") {
      setDivClassName("w-3000px h-2000px");
    } else if (divClassName === "w-3000px h-2000px") {
      setDivClassName("w-4000px h-2000px");
    }
  };

  const handleNegativeClick = () => {
    if (divClassName === "w-4000px h-2000px") {
      setDivClassName("w-3000px h-2000px");
    } else if (divClassName === "w-3000px h-2000px") {
      setDivClassName("w-2000px h-1000px");
    } else if (divClassName === "w-2000px h-1000px") {
      setDivClassName("w-1000px h-500px");
    }
  };

  return (
    <>
      <div className="right-10 bottom-10 absolute z-20">
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled button group"
        >
          <Button onClick={handlePositiveClick}>+</Button>
          <Button onClick={handleNegativeClick}>-</Button>
        </ButtonGroup>
      </div>

      <div className="relative w-94vw">
        {!searchShowing && (
          <div
            className={
              "left-10 top-10 rounded-lg bg-white w-80px h-80px flex justify-center items-center shadow-lg z-1 absolute"
            }
          >
            <IconButton onClick={clickedButton} aria-label="search">
              <SavedSearchIcon />
            </IconButton>
          </div>
        )}

        {searchShowing && (
          <div className="left-10 top-10 z-1 absolute rounded-lg w-30vw h-auto bg-white box-border p-5 shadow-lg">
            <h1 className="mb-2 font-bold flex flex-col items-center text-xl">
              Select Destination
            </h1>
            <div className="relative flex flex-col items-center space-y-8">
              <div className="flex flex-row -mb-5">
                <label htmlFor="start">Choose a Start Location:</label>
                <select id="start">
                  <option value="Node1">Node1</option>
                  <option value="Node2">Node 2</option>
                  <option value="Node3">Node 3</option>
                </select>
              </div>
              <div className="flex flex-row">
                <label htmlFor="end">Choose a End Location:</label>
                <select id="end">
                  <option value="Node1">Node1</option>
                  <option value="Node2">Node 2</option>
                  <option value="Node3">Node 3</option>
                </select>
              </div>
              <Button onClick={clickedButton} variant="contained">
                Search
              </Button>
            </div>
          </div>
        )}

        <div className="z-0 h-screen w-95vw overflow-scroll">
          <div className={divClassName}>
            <img
              className="w-4000px h-auto"
              id="zoomable-image"
              src={map}
              alt="Zoomable Image"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default NewHome;
