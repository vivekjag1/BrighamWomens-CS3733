import CollapseImg from "../../assets/collapse-white.svg";
import { useState } from "react";

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

function DirectionsCardFloor(props: Directions) {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  function DirectionStep(props: DirectionMessage) {
    let icon;
    switch (props.type) {
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
    return (
      <div className="flex flex-row gap-2 items-start text-wrap">
        {icon}
        <h2
          className={
            props.type == DirectionType.Start || props.type == DirectionType.End
              ? "font-bold pb-1"
              : "pb-1"
          }
        >
          {props.msg}
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className={`shadow-md rounded-2xl w-[90%] overflow-hidden m-1`}>
        <div
          className={`relative border-5 bg-offwhite rounded-t-2xl flex flex-row p-3 w-full`}
          onClick={() => setCollapsed(!collapsed)}
        >
          <h2>Floor {props.floor}</h2>
          <img
            src={CollapseImg}
            className={`absolute right-5 cursor-pointer w-7 duration-[700ms] ${collapsed ? "rotate-90" : "-rotate-90"}`}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <motion.div
          id="container"
          className={`pl-1 pr-1`}
          animate={{
            height: collapsed ? 0 : "auto",
            transition: {
              type: "tween",
              stiffness: 100,
              damping: 20,
              duration: 0.7,
            },
          }}
          style={{ overflow: "hidden" }}
        >
          {props.directions.map(DirectionStep)}
        </motion.div>
      </div>
    </>
  );
}

export default DirectionsCardFloor;
