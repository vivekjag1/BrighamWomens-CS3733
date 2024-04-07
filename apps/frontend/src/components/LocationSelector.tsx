import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { APIEndpoints } from "common/src/APICommon.ts";
import { FormEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { Graph } from "../../../backend/src/fileInput/Graph.ts";
import { GraphNode } from "../../../backend/src/fileInput/GraphNode.ts";

function LocationSelector(props: {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
}) {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [checkedBoxes, setCheckedBoxes] = useState({
    L1: false,
    L2: false,
    floor1: false,
    floor2: false,
    floor3: false,
  });

  const handleCheckboxInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedBoxes({
      ...checkedBoxes,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    //get the nodes from the db
    async function getNodesFromDb() {
      const rawNodes = await axios.get(APIEndpoints.mapGetNodes);
      let graphNodes = Graph.createNodes(rawNodes.data);
      graphNodes = graphNodes.filter((node) => node.nodeType != "HALL");
      graphNodes = graphNodes.sort((a, b) =>
        a.longName.localeCompare(b.longName),
      );
      setNodes(
        graphNodes.filter(
          (node) =>
            (node.floor === "L1" && checkedBoxes.L1) ||
            (node.floor === "L2" && checkedBoxes.L2) ||
            (node.floor === "1" && checkedBoxes.floor1) ||
            (node.floor === "2" && checkedBoxes.floor2) ||
            (node.floor === "3" && checkedBoxes.floor3),
        ),
      );
      return graphNodes;
    }
    getNodesFromDb().then();
  }, [
    checkedBoxes.L1,
    checkedBoxes.L2,
    checkedBoxes.floor1,
    checkedBoxes.floor2,
    checkedBoxes.floor3,
  ]);

  return (
    <div>
      <div className="bg-[#f6f8fa]">
        <form
          className="w-fit flex flex-col gap-6 p-6 rounded-lg shadow-[0_2px_4px_4px_rgba(0,0,0,0.25)]"
          onSubmit={props.onSubmit}
        >
          <div>
            <FormGroup>
              <div className="flex flex-row justify-between">
                <FormControlLabel
                  control={
                    <Checkbox name="L1" onChange={handleCheckboxInput} />
                  }
                  label="L1"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="L2" onChange={handleCheckboxInput} />
                  }
                  label="L2"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="floor1" onChange={handleCheckboxInput} />
                  }
                  label="Floor 1"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="floor2" onChange={handleCheckboxInput} />
                  }
                  label="Floor 2"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="floor3" onChange={handleCheckboxInput} />
                  }
                  label="Floor 3"
                />
              </div>
            </FormGroup>
          </div>

          <Autocomplete
            disablePortal
            id="combo-box-location"
            options={nodes.map((node) => ({ label: node.longName }))}
            sx={{ width: "30rem" }}
            renderInput={(params) => (
              <TextField {...params} label="Location *" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-location"
            options={nodes.map((node) => ({ label: node.longName }))}
            sx={{ width: "30rem" }}
            renderInput={(params) => (
              <TextField {...params} label="Location *" />
            )}
          />
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
