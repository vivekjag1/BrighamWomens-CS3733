import { Button } from "@mui/material";
import { FormEventHandler } from "react";

function LocationSelector(props: {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
}) {
  return (
    <div>
      <div className="bg-[#f6f8fa]">
        <form
          className="w-min flex flex-col gap-6 p-6 rounded-lg shadow-[0_2px_4px_4px_rgba(0,0,0,0.25)]"
          onSubmit={props.onSubmit}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#0146B1",
            }}
          >
            Edit Map
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LocationSelector;
