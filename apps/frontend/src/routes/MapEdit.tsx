import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import { Node, Edge } from "database";
import axios from "axios";
import MapEditImage from "../components/MapEditImage.tsx";
import MapFloorSelect from "../components/MapFloorSelect.tsx";
import MapEditCard from "../components/MapEditCard.tsx";

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
  const [selectedNode, setSelectedNode] = useState<Node | undefined>(undefined);
  const [nodeIndex, setNodeIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    console.log("rerendered");
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

        const nodesResponse = await axios.get(nodeURL.toString());
        const edgesResponse = await axios.get(edgeURL.toString());

        setNodes(nodesResponse.data);

        // Here, we map over the fetched edges to find the corresponding start and end nodes
        // todo: rewrite this to nodeid suffix searching
        const edgeCoordsOnFloor = edgesResponse.data
          .map((edge: Edge) => {
            const startNode = nodesResponse.data.find(
              (n: Node) => n.nodeID == edge.startNodeID,
            );
            const endNode = nodesResponse.data.find(
              (n: Node) => n.nodeID == edge.endNodeID,
            );

            if (!startNode || !endNode) {
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

  function handleNodeClick(node: Node) {
    setSelectedNode(node);
    setNodeIndex(nodes.indexOf(node));
  }

  function handleMapClick() {
    setSelectedNode(undefined);
    setNodeIndex(undefined);
  }

  const updateNode: Dispatch<SetStateAction<Node | undefined>> = (node) => {
    setSelectedNode(node);
    if (selectedNode && nodeIndex) {
      const nodesCopy = nodes;
      nodesCopy[nodeIndex] = selectedNode;
      setNodes(nodesCopy);
    }
  };

  function handleSave() {
    const node = {
      nodeID: selectedNode?.nodeID,
      xCoord: selectedNode?.xcoord,
      yCoord: selectedNode?.ycoord,
    };
    console.log(node);
  }

  return (
    <div className="relative bg-offwhite">
      <MapEditImage
        activeFloor={activeFloor}
        nodes={nodes}
        edges={edges}
        onNodeClick={handleNodeClick}
        onMapClick={handleMapClick}
      />
      <div className="absolute left-[1%] top-[2%]">
        <MapEditCard
          selectedNode={selectedNode}
          setSelectedNode={updateNode}
          onSave={handleSave}
        />
      </div>
      <div className="fixed right-[2%] bottom-[2%]">
        <MapFloorSelect activeFloor={activeFloor} onClick={setActiveFloor} />
      </div>
    </div>
  );
}

export default MapEdit;
