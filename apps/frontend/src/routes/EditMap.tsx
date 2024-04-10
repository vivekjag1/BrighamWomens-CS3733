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

export default function EditMap() {
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
        const fetchedEdges = edgesResponse.data;
        const edgeCoordsOnFloor = fetchedEdges.map((edge: Edge) => {
          const startNode = nodesResponse.data.find(
            (n: Node) => n.nodeID === edge.startNodeID,
          );
          const endNode = nodesResponse.data.find(
            (n: Node) => n.nodeID === edge.endNodeID,
          );
          return {
            startX: parseInt(startNode.xcoord),
            startY: parseInt(startNode.ycoord),
            endX: parseInt(endNode.xcoord),
            endY: parseInt(endNode.ycoord),
          };
        });

        setEdges(edgeCoordsOnFloor);
      } catch (error) {
        console.error("Error fetching map data:", error);
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
