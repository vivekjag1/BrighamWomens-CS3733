import MapEditButton from "../components/MapEditButton.tsx";
import React, { useState } from "react";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import { Node, Edge } from "database";
import axios from "axios";
import MapEditor from "../components/MapEditor.tsx";
import { Button, ButtonGroup } from "@mui/material";

export type EdgeCoordinates = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

function EditMap() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edgeCoords, setEdgeCoords] = useState<EdgeCoordinates[]>([]);
  const [floor, setFloor] = useState<string>("1");

  async function renderFloor(floor: string) {
    setNodes([]); // clear
    setEdgeCoords([]); // clear
    setFloor(floor);

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

        return axios.get(edgeURL.toString());
      })
      .then((response) => {
        const edges: Edge[] = response.data;

        // get nodeIDs on this floor
        const nodeIDs = nodes.map((node) => node.nodeID);
        console.log(nodeIDs);

        const edgeCoordsOnFloor: EdgeCoordinates[] = [];
        for (const edge of edges) {
          const start = nodeIDs.indexOf(edge.startNodeID);
          const end = nodeIDs.indexOf(edge.endNodeID);

          // if start and end nodes exist on this floor, add the edge
          if (start != -1 && end != -1) {
            edgeCoordsOnFloor.push({
              startX: parseInt(nodes[start].xcoord),
              startY: parseInt(nodes[start].ycoord),
              endX: parseInt(nodes[end].xcoord),
              endY: parseInt(nodes[end].ycoord),
            });
          }
        }

        setEdgeCoords(edgeCoordsOnFloor);
      })
      .catch(console.error);
  }

  return (
    <div>
      <div className="relative flex gap-4 bg-[#F1F1E6]">
        <div className="h-screen ml-4 flex flex-col justify-center">
          <MapEditButton />
        </div>
        <div className="h-screen flex flex-col justify-center ">
          <MapEditor floor={floor} nodes={nodes} edges={edgeCoords} />
        </div>
        <div className="absolute left-[95%] top-[74%]">
          <ButtonGroup orientation="vertical" variant="contained">
            <Button onClick={() => renderFloor("3")}>3</Button>
            <Button onClick={() => renderFloor("2")}>2</Button>
            <Button onClick={() => renderFloor("1")}>1</Button>
            <Button onClick={() => renderFloor("L1")}>L1</Button>
            <Button onClick={() => renderFloor("L2")}>L2</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

export default EditMap;
