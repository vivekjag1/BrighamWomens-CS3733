import MapEditButton from "../components/MapEditButton.tsx";
import React, { useEffect, useState } from "react";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import { Node, Edge } from "database";
import axios from "axios";
import MapEditor from "../components/MapEditor.tsx";
import MapToggle from "../components/MapToggle.tsx";

export type EdgeCoordinates = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

const defaultFloor: number = 1;

function MapEdit() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<EdgeCoordinates[]>([]);
  const [activeFloor, setActiveFloor] = useState<number>(defaultFloor);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = {
          [NavigateAttributes.floorKey]: activeFloor.toString(),
        };
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
      }
    };

    fetchData();
  }, [activeFloor]);

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
          activeFloor={activeFloor}
          nodes={nodes}
          edges={edges}
          onNodeClick={handleNodeClick}
        />
      </div>
      <div className="fixed right-[2%] bottom-[2%]">
        <MapToggle activeFloor={activeFloor} onClick={setActiveFloor} />
      </div>
    </div>
  );
}

export default MapEdit;
