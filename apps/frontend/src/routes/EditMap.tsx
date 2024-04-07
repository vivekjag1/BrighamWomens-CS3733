import MapEditingComponent from "../components/MapEditingComponent.tsx";
import MapEditButton from "../components/MapEditButton.tsx";
import { IconButton } from "@mui/material";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import { useState } from "react";
import { APIEndpoints } from "common/src/APICommon.ts";
import axios from "axios";

function EditMap() {
  const [panelToggled, setPanelToggled] = useState(false);
  const [coords, setCoords] = useState<number[][]>([
    [0, 0],
    [0, 0],
  ]);
  function clickHandler() {
    setPanelToggled(!panelToggled);
  }

  async function formHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevent page refresh

    await axios
      .get(APIEndpoints.mapGetNodes)
      .then((response) => {
        console.log(response.data);
        setCoords(response.data);
      })
      .catch(console.error);
  }

  return (
    <div>
      <div className="relative">
        <MapEditingComponent coords={coords} />
        <div className="absolute top-4 left-4">
          <IconButton
            onClick={clickHandler}
            size="large"
            sx={{
              backgroundColor: "#f6f8fa",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#a1a1a1",
              },
              width: "50px",
              height: "50px",
              marginBottom: "10px",
            }}
          >
            <EditLocationIcon
              sx={{
                width: "35px",
                height: "35px",
                color: "#3b4146",
              }}
            />
          </IconButton>
          {panelToggled && <MapEditButton onSubmit={formHandler} />}
        </div>
      </div>
    </div>
  );
}

export default EditMap;
