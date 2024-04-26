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
          <div className="flex flex-col ">
            <div key={index} className="flex flex-col items-center">
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

  return (
    <div
      className={`mt-[1rem] overflow-y-auto overflow-x-hidden transition-height ease-in-out duration-500 ${props.hasPath ? "max-h-[70vh]" : "max-h-[0]"}`}
    >
      <div
        className={`flex flex-col items-center m-[1rem] border-5 bg-offwhite rounded-2xl shadow-xl p-4 w-[90%] overflow-hidden`}
        onClick={() => props.setIsCollapsed(!props.isCollapsed)}
        style={{ cursor: "pointer" }}
      >
        <TripStats stats={props.stats} />
      </div>
      <div>
        <div className="flex flex-col items-center">
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
