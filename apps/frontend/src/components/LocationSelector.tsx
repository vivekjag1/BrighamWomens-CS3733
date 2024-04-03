import { Button } from "@mui/material";
import axios from "axios";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";

function LocationSelector() {
  async function formHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevent page refresh

    // Access the form data
    const formData = new FormData(event.target as HTMLFormElement);

    const queryParams: Record<string, string> = {
      [NavigateAttributes.startLocationKey]: formData
        .get(NavigateAttributes.startLocationKey)!
        .toString(),
      [NavigateAttributes.endLocationKey]: formData
        .get(NavigateAttributes.endLocationKey)!
        .toString(),
    };

    const params: URLSearchParams = new URLSearchParams(queryParams);

    const url = new URL(APIEndpoints.navigationRequest, window.location.origin); // window.location.origin: path relative to current url
    console.log(url.toString());
    url.search = params.toString();

    await axios
      .get(url.toString())
      .then(function (response) {
        console.log(response.data);
      })
      .catch(console.error);
  }

  return (
    <div>
      <div className="bg-[#f6f8fa]">
        <form
          className="w-min flex flex-col gap-6 p-6 rounded-lg shadow-[0_2px_4px_4px_rgba(0,0,0,0.25)]"
          onSubmit={formHandler}
        >
          <label>
            {" "}
            Choose a starting location:
            <br />
            <select name={NavigateAttributes.startLocationKey}>
              <option value="Anesthesia Conf Floor L1">
                Anesthesia Conf Floor L1
              </option>
              <option value="Medical Records Conference Room Floor L1">
                Medical Records Conference Room Floor L1
              </option>
              <option value="Abrams Conference Room">
                Abrams Conference Room
              </option>
              <option value="Day Surgery Family Waiting Floor L1">
                Day Surgery Family Waiting Floor L1
              </option>
              <option value="Day Surgery Family Waiting Exit Floor L1">
                Day Surgery Family Waiting Exit Floor L1
              </option>
              <option value="Medical Records Film Library Floor L1">
                Medical Records Film Library Floor L1
              </option>
              <option value="Outpatient Fluoroscopy Floor L1">
                Outpatient Fluoroscopy Floor L1
              </option>
              <option value="Pre-Op PACU Floor L1">Pre-Op PACU Floor L1</option>
              <option value="Nuclear Medicine Floor L1">
                Nuclear Medicine Floor L1
              </option>
              <option value="Ultrasound Floor L1">Ultrasound Floor L1</option>
              <option value="CSIR MRI Floor L1">CSIR MRI Floor L1</option>
              <option value="Restroom L Elevator Floor L1">
                Restroom L Elevator Floor L1
              </option>
              <option value="Restroom M Elevator Floor L1">
                Restroom M Elevator Floor L1
              </option>
              <option value="Restroom K Elevator Floor L1">
                Restroom K Elevator Floor L1
              </option>
              <option value="Restroom H Elevator Floor L1">
                Restroom H Elevator Floor L1
              </option>
              <option value="Vending Machine 1 L1">Vending Machine 1 L1</option>
              <option value="Volunteers Floor L1">Volunteers Floor L1</option>
              <option value="Interpreter Services Floor L2">
                Interpreter Services Floor L2
              </option>
              <option value="Elevator Q MapNode 7 Floor L1">
                Elevator Q MapNode 7 Floor L1
              </option>
              <option value="Fenwood Road Exit MapNode 1 Floor L1">
                Fenwood Road Exit MapNode 1 Floor L1
              </option>
              <option value="Elevator H Floor L1">Elevator H Floor L1</option>
              <option value="Elevator J Floor L1">Elevator J Floor L1</option>
              <option value="Elevator K Floor L1">Elevator K Floor L1</option>
              <option value="Elevator L Floor L1">Elevator L Floor L1</option>
              <option value="Elevator M Floor L1">Elevator M Floor L1</option>
            </select>
          </label>
          <label>
            {" "}
            Choose a destination: <br />
            <select name={NavigateAttributes.endLocationKey}>
              <option value="Anesthesia Conf Floor L1">
                Anesthesia Conf Floor L1
              </option>
              <option value="Medical Records Conference Room Floor L1">
                Medical Records Conference Room Floor L1
              </option>
              <option value="Abrams Conference Room">
                Abrams Conference Room
              </option>
              <option value="Day Surgery Family Waiting Floor L1">
                Day Surgery Family Waiting Floor L1
              </option>
              <option value="Day Surgery Family Waiting Exit Floor L1">
                Day Surgery Family Waiting Exit Floor L1
              </option>
              <option value="Medical Records Film Library Floor L1">
                Medical Records Film Library Floor L1
              </option>
              <option value="Outpatient Fluoroscopy Floor L1">
                Outpatient Fluoroscopy Floor L1
              </option>
              <option value="Pre-Op PACU Floor L1">Pre-Op PACU Floor L1</option>
              <option value="Nuclear Medicine Floor L1">
                Nuclear Medicine Floor L1
              </option>
              <option value="Ultrasound Floor L1">Ultrasound Floor L1</option>
              <option value="CSIR MRI Floor L1">CSIR MRI Floor L1</option>
              <option value="Restroom L Elevator Floor L1">
                Restroom L Elevator Floor L1
              </option>
              <option value="Restroom M Elevator Floor L1">
                Restroom M Elevator Floor L1
              </option>
              <option value="Restroom K Elevator Floor L1">
                Restroom K Elevator Floor L1
              </option>
              <option value="Restroom H Elevator Floor L1">
                Restroom H Elevator Floor L1
              </option>
              <option value="Vending Machine 1 L1">Vending Machine 1 L1</option>
              <option value="Volunteers Floor L1">Volunteers Floor L1</option>
              <option value="Interpreter Services Floor L2">
                Interpreter Services Floor L2
              </option>
              <option value="Elevator Q MapNode 7 Floor L1">
                Elevator Q MapNode 7 Floor L1
              </option>
              <option value="Fenwood Road Exit MapNode 1 Floor L1">
                Fenwood Road Exit MapNode 1 Floor L1
              </option>
              <option value="Elevator H Floor L1">Elevator H Floor L1</option>
              <option value="Elevator J Floor L1">Elevator J Floor L1</option>
              <option value="Elevator K Floor L1">Elevator K Floor L1</option>
              <option value="Elevator L Floor L1">Elevator L Floor L1</option>
              <option value="Elevator M Floor L1">Elevator M Floor L1</option>
            </select>
          </label>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#0146B1",
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LocationSelector;
