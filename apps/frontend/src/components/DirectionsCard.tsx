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

import {
  DirectionMessage,
  Directions,
  DirectionType,
  StatUnit,
  TripStat,
} from "common/src/Path.ts";

function DirectionsCard(props: {
  directions: Directions[];
  stats: TripStat[];
  isCollapsed: boolean;
  setIsCollapsed: (state: boolean) => void;
  hasPath: boolean;
}) {
  function TripStats(props: { stats: TripStat[] }) {
    const minsStat = props.stats.find((stat) => stat.unit == StatUnit.Mins);
    const arrivalTime = minsStat ? getArrivalTime(minsStat.value) : "";

    return (
      <div className="flex w-full justify-around">
        {props.stats.map((stat, index) => (
          <div className="flex flex-col items-end text-right">
            <div key={index}>
              <h2 className="font-medium text-3xl">
                {stat.unit == StatUnit.Arrival ? arrivalTime : stat.value}
              </h2>
              <h2>{stat.unit}</h2>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function getArrivalTime(minToAdd: string) {
    const currentTime = new Date();

    const newTime = new Date(
      currentTime.getTime() + parseInt(minToAdd) * 60000,
    );

    const hours = newTime.getHours().toString(); // Add leading zero if needed
    const minutes = newTime.getMinutes().toString().padStart(2, "0"); // Add leading zero if needed

    return `${hours}:${minutes}`;
  }

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
      className={`h-full rounded-2xl shadow-xl overflow-y-hidden transition-height ease-in-out duration-500 ${props.hasPath ? "max-h-[25rem]" : "max-h-[0]"} `}
    >
      <div
        className={`mt-[1rem] border-5 bg-offwhite rounded-2xl shadow-xl flex flex-col gap-6 p-4 transition-height ease-in-out duration-500 ${props.isCollapsed ? "max-h-[5.5rem]" : "max-h-[25rem]"}`}
        onClick={() => props.setIsCollapsed(!props.isCollapsed)}
        style={{ cursor: "pointer" }}
      >
        <TripStats stats={props.stats} />
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
