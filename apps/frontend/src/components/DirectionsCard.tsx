import DirectionsCardFloor from "./DirectionsCardFloor";

import {
  //DirectionMessage,
  Directions,
  //DirectionType,
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
          <div className="flex flex-col">
            <div key={index} className="flex flex-col items-end">
              <h2 className="font-normal text-3xl">
                {stat.unit == StatUnit.Arrival ? arrivalTime : stat.value}
              </h2>
              <h2 className="font-light">{stat.unit}</h2>
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

  return (
    <div
      className={`flex flex-col gap-2 items-center overflow-hidden transition-height ease-in-out duration-500 ${props.hasPath ? "max-h-[70vh]" : "max-h-[0]"}`}
    >
      <div
        className={`flex flex-col mt-[1rem] items-center bg-offwhite rounded-2xl shadow-md p-3 w-[100%] overflow-hidden`}
        onClick={() => props.setIsCollapsed(!props.isCollapsed)}
        style={{ cursor: "pointer" }}
      >
        <TripStats stats={props.stats} />
      </div>
      <div
        className={`overflow-y-auto transition-height ease-in-out duration-500 w-full ${props.isCollapsed ? "max-h-[0vh]" : "max-h-[50vh]"}`}
      >
        <div className={`flex flex-col items-start gap-2 mb-[0.5rem]`}>
          {props.directions.map((directions, index) => (
            <DirectionsCardFloor
              key={index}
              floor={directions.floor}
              directions={directions.directions}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DirectionsCard;
