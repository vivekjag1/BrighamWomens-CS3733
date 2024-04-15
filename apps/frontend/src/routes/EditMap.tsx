import MapEditButton from "../components/MapEditButton.tsx";
import React, { useEffect, useState } from "react";
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
  const [edges, setEdges] = useState<EdgeCoordinates[]>([]);
  const [floor, setFloor] = useState<string>("1");

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = { [NavigateAttributes.floorKey]: floor };
        const params = new URLSearchParams(queryParams);

        const nodeURL = new URL(
          APIEndpoints.mapGetNodes,
          window.location.origin,
        );
        const edgeURL = new URL(
          APIEndpoints.mapGetEdges,
          window.location.origin,
        );

        nodeURL.search = params.toString();
        edgeURL.search = params.toString();

        const nodesResponse = await axios.get(nodeURL.toString());
        const edgesResponse = await axios.get(edgeURL.toString());

        setNodes(nodesResponse.data);

        // Here, we map over the fetched edges to find the corresponding start and end nodes
        const edgeCoordsOnFloor = edgesResponse.data
          .map((edge: Edge) => {
            const startNode = nodesResponse.data.find(
              (n: Node) => n.nodeID === edge.startNodeID,
            );
            const endNode = nodesResponse.data.find(
              (n: Node) => n.nodeID === edge.endNodeID,
            );

            if (!startNode || !endNode) {
              // Log an error if a start or end node was not found
              console.error(
                `Nodes with ID ${edge.startNodeID} or ${edge.endNodeID} not found.`,
              );
              return null; // This will be filtered out below
            }

            return {
              startX: parseInt(startNode.xcoord),
              startY: parseInt(startNode.ycoord),
              endX: parseInt(endNode.xcoord),
              endY: parseInt(endNode.ycoord),
            };
          })
          .filter((edge: null) => edge !== null); // Filter out any edges with missing nodes

        setEdges(edgeCoordsOnFloor);
      } catch (error) {
        console.error("Error fetching map data:", error);
=======

  // this is a hacky way to pass states between renderFloor and useEffect
  // to make sure the map image, nodes and edges render at the exact same time
  // once we get nodes, this calls useEffect to generate edges
  // then both edges nodes and floor are pushed at once to the hooks above these.
  const [localNodes, setLocalNodes] = useState<Node[]>([]);
  const [localEdges, setLocalEdges] = useState<Edge[]>([]);
  const [localFloor, setLocalFloor] = useState<string>("1");

  const didMount = useRef(false);

  async function renderFloor(floor: string) {
    setLocalNodes([]); // clear
    setLocalEdges([]); // clear
    setLocalFloor(floor);

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
        // this won't update the image
        setLocalNodes(response.data);

        return axios.get(edgeURL.toString());
      })
      .then((response) => {
        setLocalEdges(response.data);
      })
      .catch(console.error);
  }

  useEffect(() => {
    // render first floor on initial page load
    if (!didMount.current) {
      renderFloor("1");
      didMount.current = true;
      return;
    }

    const edgeCoordsOnFloor: EdgeCoordinates[] = [];
    for (const edge of localEdges) {
      // 2 character floor string
      const correctedFloor =
        localFloor.length == 1 ? "0" + localFloor : localFloor;

      // compare suffixes of start and end node
      // if equal to floor, add the edge
      if (
        edge.startNodeID.endsWith(correctedFloor) &&
        edge.endNodeID.endsWith(correctedFloor)
      ) {
        // we need the node objects with ID equal to our edge's start and end node IDs
        // this is a linear search but could be faster with hash map in the future
        const start = localNodes.find(
          (node) => edge.startNodeID == node.nodeID,
        );
        const end = localNodes.find((node) => edge.endNodeID == node.nodeID);

        edgeCoordsOnFloor.push({
          startX: parseInt(start!.xcoord),
          startY: parseInt(start!.ycoord),
          endX: parseInt(end!.xcoord),
          endY: parseInt(end!.ycoord),
        });

      }
    };

    fetchData();
  }, [floor]);

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };

  return (
    <div className="relative flex gap-4 bg-[#F1F1E6]">
      <div className="h-screen ml-4 flex flex-col justify-center">
        <MapEditButton selectedNode={selectedNode} />
      </div>
      <div className="h-screen flex flex-col justify-center">
        <MapEditor
          floor={floor}
          nodes={nodes}
          edges={edges}
          onNodeClick={handleNodeClick}
        />
      </div>
      <div className="absolute left-[95%] top-[74%]">
        <ButtonGroup orientation="vertical" variant="contained">
          {["3", "2", "1", "L1", "L2"].map((f) => (
            <Button
              key={f}
              onClick={() => setFloor(f)}
              sx={{ backgroundColor: "rgb(1,70,177)" }}
            >
              {f}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}

export default EditMap;
