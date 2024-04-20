import React, { createContext, useEffect, useState } from "react";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import { Node, Edge } from "database";
import axios from "axios";
import MapEditImage from "../components/MapEditImage.tsx";
import MapFloorSelect from "../components/MapFloorSelect.tsx";
import MapEditCard from "../components/MapEditCard.tsx";
import MapData from "./MapData.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "../components/useToast.tsx";
import MapEditSpeedDial from "../components/MapEditSpeedDial.tsx";

const defaultFloor: number = 1;

type MapData = {
  nodes: Map<string, Node>;
  setNodes: React.Dispatch<React.SetStateAction<Map<string, Node>>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
};

export const MapContext = createContext<MapData>({
  nodes: new Map(),
  // eslint-disable-next-line no-empty-function
  setNodes: () => {},
  edges: [],
  // eslint-disable-next-line no-empty-function
  setEdges: () => {},
});

function MapEdit() {
  // Hash maps for nodes and edges
  const [nodes, setNodes] = useState<Map<string, Node>>(new Map());
  const [edges, setEdges] = useState<Edge[]>([]);

  const contextValue = { nodes, setNodes, edges, setEdges };

  const [activeFloor, setActiveFloor] = useState<number>(defaultFloor);
  const [selectedNodeID, setSelectedNodeID] = useState<string | undefined>(
    undefined,
  );

  const { showToast } = useToast();

  const [cachedNode, setCachedNode] = useState<Node | undefined>(undefined);
  const [nodeSaved, setNodeSaved] = useState<boolean>(false);

  const { getAccessTokenSilently } = useAuth0();
  let token = "";

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

        const fetchedNodes: Node[] = (await axios.get(nodeURL.toString())).data;
        const fetchedEdges: Edge[] = (await axios.get(edgeURL.toString())).data;

        // construct nodes hashmap
        const tempNodes: Map<string, Node> = new Map();
        for (let i = 0; i < fetchedNodes.length; i++) {
          tempNodes.set(fetchedNodes[i].nodeID, fetchedNodes[i]);
        }

        setNodes(tempNodes);

        // 2 character floor string "L1", "01"
        const correctedFloor: string =
          activeFloor < 0 ? "0" + activeFloor : activeFloor.toString();
        const tempEdges: Edge[] = [];

        for (let i = 0; i < fetchedEdges.length; i++) {
          const edge = fetchedEdges[i];

          // compare suffixes of start and end node, if equal to floor add the edge
          if (
            edge.startNodeID.endsWith(correctedFloor) &&
            edge.endNodeID.endsWith(correctedFloor)
          ) {
            tempEdges.push(edge);
          }
        }

        setEdges(tempEdges);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchData();
  }, [activeFloor]);

  function updateNodeField(field: keyof Node, value: string) {
    const node = nodes.get(selectedNodeID!);
    if (node) {
      updateNode({ ...node, [field]: value });
    }
  }

  function updateNode(node: Node) {
    const tempNodes = new Map(nodes);
    if (selectedNodeID) {
      tempNodes.set(selectedNodeID, node);
      setNodes(tempNodes);
    }
  }

  // function addNode(node: Node) {
  //   const tempNodes = new Map(nodes);
  //   tempNodes.set(node.nodeID, node);
  //   setNodes(tempNodes);
  // }
  //
  function deleteNode() {
    if (selectedNodeID) {
      const tempNodes = new Map(nodes);
      tempNodes.delete(selectedNodeID);
      setNodes(tempNodes);
    }
  }

  function handleNodeClick(nodeID: string) {
    if (cachedNode) {
      if (cachedNode.nodeID == nodeID)
        return; // same node pressed
      else {
        // different node pressed
        if (!nodeSaved) updateNode(cachedNode);
      }
    }

    setSelectedNodeID(nodeID);
    setCachedNode(nodes.get(nodeID));
    setNodeSaved(false);
  }

  function handleMapClick() {
    // if node wasn't saved, revert node to cached version
    if (cachedNode && !nodeSaved) {
      updateNode(cachedNode);
    }

    setSelectedNodeID(undefined);
    setCachedNode(undefined);
    setNodeSaved(false);
  }

  async function handleSave() {
    token = await getAccessTokenSilently();
    if (!selectedNodeID) return;
    await axios
      .patch(APIEndpoints.updateNodes, nodes.get(selectedNodeID), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setNodeSaved(true);
        showToast("Node updated successfully!", "success");
      })
      .catch(() => showToast("There was an issue updating this node", "error"));
  }

  // export const Action = {
  //   CREATE: "RED",
  //   DELETE: "BLUE",
  //   EDIT: "GREEN",
  // };
  // function getEditAction(action) {
  //   switch (action) {
  //     case Action.CREATE:
  //       return "red";
  //     case Action.DELETE:
  //       return "blue";
  //     case Action.EDIT:
  //       return "green";
  //     default:
  //       return "black";
  //   }
  // }

  return (
    <div className="relative bg-offwhite">
      <MapContext.Provider value={contextValue}>
        <MapEditImage
          activeFloor={activeFloor}
          onNodeClick={handleNodeClick}
          onMapClick={handleMapClick}
        />
      </MapContext.Provider>
      <div className="absolute left-[1%] top-[2%]">
        <MapContext.Provider value={contextValue}>
          <MapEditCard
            selectedNodeID={selectedNodeID}
            onSave={handleSave}
            updateNode={updateNodeField}
            deleteNode={deleteNode}
          />
        </MapContext.Provider>
      </div>
      <div className="fixed right-[2%] bottom-[2%]">
        <MapFloorSelect activeFloor={activeFloor} onClick={setActiveFloor} />
      </div>
      <div className="absolute left-[6%] bottom-[2%] z-50">
        <MapEditSpeedDial />
      </div>
    </div>
  );
}

export default MapEdit;
