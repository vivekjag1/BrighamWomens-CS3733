import { Button } from "@mui/material";

function NavigationPanel() {
  return (
    <div>
      <div className="w-[17.5vw] h-[98vh] p-5 bg-[#D9D9D9] rounded-lg shadow-[0_0_4px_2px_rgba(0,0,0,0.25)]">
        <form className="flex flex-col justify-start gap-6">
          <h2 className="text-4xl font-bold text-secondary">Navigation</h2>
          <p className="text-l font-normal text-black">
            Please enter your current location and destination to figure out
            where to go.
          </p>
          <div>
            <p className="text-l font-normal">Current Location</p>
            <select name="currentLocation">
              <option>Day Surgery Family Waiting Floor L1</option>
              <option>Day Surgery Family Waiting Exit Floor L1</option>
            </select>
          </div>
          <div>
            <p>Destination</p>
            <select name="destination">
              <option>Day Surgery Family Waiting Floor L1</option>
              <option>Day Surgery Family Waiting Exit Floor L1</option>
            </select>
          </div>
          <div>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NavigationPanel;
