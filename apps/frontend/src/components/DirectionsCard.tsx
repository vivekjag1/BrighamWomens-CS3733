// import { useState } from "react";
// import CollapseImg from "../../assets/collapse.svg";
import StraightRoundedIcon from "@mui/icons-material/StraightRounded";
import TurnLeftRoundedIcon from "@mui/icons-material/TurnLeftRounded";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import UTurnRightIcon from "@mui/icons-material/UTurnRight";
import TurnRightRoundedIcon from "@mui/icons-material/TurnRightRounded";
import TurnSlightLeftRoundedIcon from "@mui/icons-material/TurnSlightLeftRounded";
import TurnSlightRightRoundedIcon from "@mui/icons-material/TurnSlightRightRounded";
import ElevatorIcon from "@mui/icons-material/Elevator";
import StairsIcon from "@mui/icons-material/Stairs";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import {
  DirectionMessage,
  Directions,
  DirectionType,
  TripStat,
} from "common/src/Path.ts";

function DirectionsCard(props: {
  directions: Directions[];
  stats: TripStat[];
  isCollapsed: boolean;
  setIsCollapsed: (state: boolean) => void;
  hasPath: boolean;
}) {
  function TripStats(props: TripStat) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="font-medium text-3xl">{props.stat}</h2>
        <h2>{props.unit}</h2>
      </div>
    );
  }

  function DirectionStep(props: DirectionMessage) {
    let icon;
    switch (props.type) {
      case DirectionType.Start:
        icon = <LocationOnIcon />;
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
      <div className="flex flex-row items-start">
        {icon}
        <h2
          className={
            props.type == DirectionType.Start || props.type == DirectionType.End
              ? "font-bold"
              : ""
          }
        >
          {props.msg}
        </h2>
      </div>
    );
  }

  return (
    <div
      className={`h-full overflow-y-hidden transition-height ease-in-out duration-500 ${props.hasPath ? "max-h-[25rem]" : "max-h-[0]"} `}
    >
      <div
        className={`mt-[1rem] border-5 bg-offwhite rounded-2xl shadow-xl flex flex-col gap-6 p-4 transition-height ease-in-out duration-500 ${props.isCollapsed ? "max-h-[5.5rem]" : "max-h-[25rem]"}`}
        onClick={() => props.setIsCollapsed(!props.isCollapsed)}
        style={{ cursor: "pointer" }}
      >
        <div className="flex w-full justify-around">
          {props.stats.map(TripStats)}
        </div>
        <div className="flex flex-col gap-4 h-full overflow-y-auto">
          {props.directions.map((directionsAllFloors: Directions) =>
            directionsAllFloors.directions.map(DirectionStep),
          )}
        </div>
      </div>
    </div>
  );
}

export default DirectionsCard;
