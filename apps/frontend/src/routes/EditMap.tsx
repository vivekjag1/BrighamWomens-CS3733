import MapEditButton from "../components/MapEditButton.tsx";
import React, { useEffect, useState } from "react";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import { Node, Edge } from "database";
import axios from "axios";
import MapEditor from "../components/MapEditor.tsx";
import { Button, ButtonGroup } from "@mui/material";

function EditMap() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [floor, setFloor] = useState<string>("1");

  async function renderFloor(floor: string) {
    const queryParams: Record<string, string> = {
      [NavigateAttributes.floorKey]: floor,
    };

    const params: URLSearchParams = new URLSearchParams(queryParams);

    const nodeURL = new URL(APIEndpoints.mapGetNodes, window.location.origin); // window.location.origin: path relative to current url
    const edgeURL = new URL(APIEndpoints.mapGetEdges, window.location.origin); // window.location.origin: path relative to current url

    nodeURL.search = params.toString();
    edgeURL.search = params.toString();

    await axios
      .get(nodeURL.toString())
      .then((response) => {
        setNodes(response.data);
      })
      .catch(console.error);

    await axios
      .get(edgeURL.toString())
      .then((response) => {
        setEdges(response.data);
      })
      .catch(console.error);
  }

  useEffect(() => {
    renderFloor(floor);
  }, [floor]);

  return (
    <div>
      <div className="relative flex gap-4 bg-[#F1F1E6]">
        <div className="h-screen ml-4 flex flex-col justify-center">
          <MapEditButton />
        </div>
        <div className="h-screen flex flex-col justify-center ">
          <MapEditor floor={floor} nodes={nodes} edges={edges} />
        </div>
        <div className="absolute left-[95%] top-[74%]">
          <ButtonGroup orientation="vertical" variant="contained">
            <Button onClick={() => setFloor("3")}>3</Button>
            <Button onClick={() => setFloor("2")}>2</Button>
            <Button onClick={() => setFloor("1")}>1</Button>
            <Button onClick={() => setFloor("L1")}>L1</Button>
            <Button onClick={() => setFloor("L2")}>L2</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

export default EditMap;
