import axios from "axios";
import { APIEndpoints } from "common/src/APICommon.ts";
import { useEffect, useState } from "react";
import { Directions, TripStat } from "common/src/Path.ts";
import DirectionsCard from "../components/DirectionsCard.tsx";
import logo from "../../assets/bwh-logo-shield.png";

function MobileDirections() {
  const [directions, setDirections] = useState<Directions[]>([]);
  const [tripStats, setTripStats] = useState<TripStat[]>([]);

  // Runs on page load
  useEffect(() => {
    async function getPath() {
      // Get query params from URL
      const queryParams: Record<string, string> = {};

      const queryString = window.location.search.substring(1); // search after ?
      const pairs = queryString.split("&"); // split by &

      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split("="); // split into key and value
        queryParams[pair[0]] = pair[1];
      }

      const url = new URL(
        APIEndpoints.navigationRequest,
        window.location.origin,
      ); // url to send request to
      url.search = new URLSearchParams(queryParams).toString();

      // Send request to backend
      await axios
        .get(url.toString())
        .then((response) => {
          setDirections(response.data.directions);
          setTripStats(response.data.tripStats);
          console.log(directions);
          console.log(tripStats);
        })
        .catch(console.error);
    }

    getPath();
  });

  return (
    <div className="h-screen m-10 mt-[2.5rem] mb-[2.5rem] align-center justify-center">
      <div className="flex flex-rowtext-secondary max-w-screen">
        <div className="flex flex-row gap-4 justify-start">
          <img className="h-[57px]" src={logo} alt="Logo" />
          <div className="flex flex-col justify-start">
            <h2
              style={{
                fontWeight: 500,
              }}
              className={"whitespace-nowrap"}
            >
              Brigham & Women's Hospital
            </h2>
            <h2
              style={{
                fontWeight: 200,
              }}
              className={"text-2xl whitespace-nowrap"}
            >
              Directions
            </h2>
          </div>
        </div>
      </div>
      <DirectionsCard
        directions={directions}
        stats={tripStats}
        isCollapsed={false}
        setIsCollapsed={() => {
          console.log;
        }}
        hasPath={true}
      />
    </div>
  );
}

export default MobileDirections;
