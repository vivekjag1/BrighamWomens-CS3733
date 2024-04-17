import React, { createContext, useEffect, useState } from "react";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import { Node, Edge } from "database";
import axios from "axios";
import MapEditImage from "../components/MapEditImage.tsx";
import MapFloorSelect from "../components/MapFloorSelect.tsx";
import MapEditCard from "../components/MapEditCard.tsx";
import MapData from "./MapData.tsx";
import { useAuth0 } from "@auth0/auth0-react";

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

  const value = { nodes, setNodes, edges, setEdges };

  const [activeFloor, setActiveFloor] = useState<number>(defaultFloor);
  const [selectedNodeID, setSelectedNodeID] = useState<string | undefined>(
    undefined,
  );

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

  function updateNode(field: keyof Node, value: string) {
    let node = nodes.get(selectedNodeID!);
    if (node && selectedNodeID) {
      node = { ...node, [field]: value };
      const tempNodes = new Map(nodes);
      tempNodes.set(selectedNodeID, node);

      setNodes(tempNodes);
    }
  }

  function handleNodeClick(nodeID: string) {
    setSelectedNodeID(nodeID);
  }

  function handleMapClick() {
    setSelectedNodeID(undefined);
    // savedNode = undefined;
  }

  async function handleSave() {
    token = await getAccessTokenSilently();
    if (!selectedNodeID) return;
    const node = {
      nodeID: nodes.get(selectedNodeID)?.nodeID,
      xCoord: nodes.get(selectedNodeID)?.xcoord,
      yCoord: nodes.get(selectedNodeID)?.ycoord,
    };
    await axios.patch(APIEndpoints.updateNodes, node, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(node);
  }

  return (
    <div className="relative bg-offwhite">
      <MapContext.Provider value={value}>
        <MapEditImage
          activeFloor={activeFloor}
          onNodeClick={handleNodeClick}
          onMapClick={handleMapClick}
        />
      </MapContext.Provider>
      <div className="absolute left-[1%] top-[2%]">
        <MapContext.Provider value={value}>
          <MapEditCard
            selectedNodeID={selectedNodeID}
            onSave={handleSave}
            updateNode={updateNode}
          />
        </MapContext.Provider>
      </div>
      <div className="fixed right-[2%] bottom-[2%]">
        <MapFloorSelect activeFloor={activeFloor} onClick={setActiveFloor} />
      </div>
    </div>
  );
}

export default MapEdit;
