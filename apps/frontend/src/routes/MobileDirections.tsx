import axios from "axios";
import { APIEndpoints } from "common/src/APICommon.ts";
import { useEffect, useState } from "react";
import { Directions, TripStat } from "common/src/Path.ts";

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

  return <div></div>;
}

export default MobileDirections;
