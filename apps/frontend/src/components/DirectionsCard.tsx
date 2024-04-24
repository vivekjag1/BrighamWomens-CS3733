import { useState } from "react";
import {
  DirectionMessage,
  Directions,
  DirectionType,
  TripStat,
} from "common/src/Path.ts";

function DirectionsCard(props: {
  directions: Directions[];
  stats: TripStat[];
}) {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  function TripStats(props: TripStat) {
    return (
      <div className="flex flex-col items-end">
        <h2 className="font-medium text-3xl">{props.stat}</h2>
        <h2>{props.unit}</h2>
      </div>
    );
  }

  function DirectionStep(props: DirectionMessage) {
    return (
      <div className="flex flex-row items-start">
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
    <div className="mt-[3vh] flex">
      <div
        //border-5 bg-white rounded-2xl shadow-xl
        className={`flex flex-col gap-6 p-4 transition-height ease-in-out duration-500 ${collapsed ? "max-h-[5.5rem]" : "max-h-[25rem]"}`}
        onClick={() => setCollapsed(!collapsed)}
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
