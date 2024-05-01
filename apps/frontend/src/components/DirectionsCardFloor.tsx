import CollapseImg from "../../assets/collapse-white.svg";
// import { useState } from "react";

import StraightRoundedIcon from "@mui/icons-material/StraightRounded";
import TurnLeftRoundedIcon from "@mui/icons-material/TurnLeftRounded";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import UTurnRightIcon from "@mui/icons-material/UTurnRight";
import TurnRightRoundedIcon from "@mui/icons-material/TurnRightRounded";
import TurnSlightLeftRoundedIcon from "@mui/icons-material/TurnSlightLeftRounded";
import TurnSlightRightRoundedIcon from "@mui/icons-material/TurnSlightRightRounded";
import ElevatorIcon from "@mui/icons-material/Elevator";
import StairsIcon from "@mui/icons-material/Stairs";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";

import {
  DirectionMessage,
  Directions,
  DirectionType,
} from "common/src/Path.ts";
import { useEffect, useState } from "react";

type DirectionsCardFloorProps = Directions & {
  floorIndex: number;
  currentFloor: number;
  currentStep: number;
};

function DirectionsCardFloor({
  floor,
  directions,
  floorIndex,
  currentFloor,
  currentStep,
}: DirectionsCardFloorProps) {
  const [collapsed, setCollapsed] = useState<boolean>(
    currentFloor !== floorIndex,
  );

  function toggleCollapse() {
    setCollapsed(!collapsed);
  }

  useEffect(() => {
    setCollapsed(currentFloor !== floorIndex);
  }, [currentStep, currentFloor, floorIndex]);

  function DirectionStep(direction: DirectionMessage, index: number) {
    let icon;
    switch (direction.type) {
      case DirectionType.Start:
        icon = <MyLocationIcon />;
        break;
      case DirectionType.End:
        icon = <LocationOnIcon />;
        break;
      case DirectionType.Straight:
        icon = <StraightRoundedIcon />;
        break;
      case DirectionType.Left:
        icon = <TurnLeftRoundedIcon />;
        break;
      case DirectionType.SlightLeft:
        icon = <TurnSlightLeftRoundedIcon />;
        break;
      case DirectionType.HairpinLeft:
        icon = <UTurnLeftIcon />;
        break;
      case DirectionType.Right:
        icon = <TurnRightRoundedIcon />;
        break;
      case DirectionType.SlightRight:
        icon = <TurnSlightRightRoundedIcon />;
        break;
      case DirectionType.HairpinRight:
        icon = <UTurnRightIcon />;
        break;
      case DirectionType.Elevator:
        icon = <ElevatorIcon />;
        break;
      case DirectionType.Stairs:
        icon = <StairsIcon />;
        break;
      default:
        return null;
    }

    const stepClass =
      index === currentStep && floorIndex === currentFloor
        ? "bg-yellow-100"
        : "";

    return (
      <div
        className={`flex flex-row bg-white p-2 gap-2 items-center text-wrap`}
      >
        {icon}
        <h2
          className={
            direction.type === DirectionType.Start ||
            direction.type === DirectionType.End
              ? `font-medium text-sm ${stepClass}`
              : `font-light text-sm ${stepClass}`
          }
        >
          {direction.msg}
        </h2>
      </div>
    );
  }

  return (
    <div className={`shadow-md rounded-2xl w-[98%] overflow-hidden`}>
      <div
        className={`relative bg-white rounded-t-2xl flex flex-row p-3 w-full`}
        style={{ cursor: "pointer" }}
        onClick={toggleCollapse}
      >
        <h2 className={"font-normal"}>Floor {floor}</h2>
        <img
          src={CollapseImg}
          className={`absolute right-5 cursor-pointer w-7 duration-[700ms] ${collapsed ? "rotate-90" : "-rotate-90"}`}
        />
      </div>
      <motion.div
        animate={{
          height: collapsed ? 0 : "auto",
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.7,
          },
        }}
        style={{ overflow: "hidden" }}
      >
        {directions.map((dir, index) => DirectionStep(dir, index))}
      </motion.div>
    </div>
  );
}

export default DirectionsCardFloor;
