import axios from "axios";
import { APIEndpoints } from "common/src/APICommon.ts";
import { useEffect } from "react";

function MobileDirections() {
  async function getPath() {
    // Get query params from URL
    const queryParams: string[][] = [];
    const queryString = window.location.search.substring(1); // search after ?
    const pairs = queryString.split("&"); // split by &

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split("="); // split into key and value
      queryParams[i] = [pair[0], pair[1]];
    }

    const url = new URL(APIEndpoints.mobileDirections, window.location.origin); // url to send request to
    url.search = queryParams.toString();

    // Send request to backend
    await axios
      .get(url.toString())
      .then((response) => {
        console.log(response.data);
      })
      .catch(console.error);
  }

  // Runs on page load
  useEffect(() => {
    getPath();
  }, []);

  return <div></div>;
}

export default MobileDirections;
