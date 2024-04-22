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
import AddNodeToolTip from "../components/AddNodeToolTip.tsx";

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

const userNodePrefix = "userNode";

function MapEdit() {
  // Hash maps for nodes and edges
  const [nodes, setNodes] = useState<Map<string, Node>>(new Map());
  const [edges, setEdges] = useState<Edge[]>([]);

  const [addingNode, setAddingNode] = useState<boolean>(false);

  const contextValue = { nodes, setNodes, edges, setEdges };

  const [activeFloor, setActiveFloor] = useState<number>(defaultFloor);
  const [selectedNodeID, setSelectedNodeID] = useState<string | undefined>(
    undefined,
  );

  const [numUserNodes, setNumUserNodes] = useState<number>(1);

  const { showToast } = useToast();

  const [cachedNode, setCachedNode] = useState<Node | undefined>(undefined);
  const [nodeSaved, setNodeSaved] = useState<boolean>(false);

  const { getAccessTokenSilently } = useAuth0();
  let token = "";

  useEffect(() => {
    const fetchData = async () => {
      let activeFloorString;

      switch (activeFloor) {
        case -1:
          activeFloorString = "L1";
          break;
        case -2:
          activeFloorString = "L2";
          break;
        default:
          activeFloorString = activeFloor.toString();
      }

      try {
        const queryParams = {
          [NavigateAttributes.floorKey]: activeFloorString,
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

        const tempEdges: Edge[] = [];

        for (let i = 0; i < fetchedEdges.length; i++) {
          const edge = fetchedEdges[i];

          // compare suffixes of start and end node, if equal to floor add the edge
          if (
            edge.startNodeID.endsWith(activeFloorString) &&
            edge.endNodeID.endsWith(activeFloorString)
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
  async function deleteNode() {
    if (selectedNodeID) {
      const tempNodes = new Map(nodes);
      tempNodes.delete(selectedNodeID);
      setNodes(tempNodes);
    }
    console.log(selectedNodeID);
    const sendToDb = {
      nodeID: selectedNodeID,
    };
    await axios.post(APIEndpoints.deleteNode, sendToDb);
    location.reload();
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

  function handleAddNodeButtonClicked() {
    setAddingNode(!addingNode);
  }

  function handleMapClick(event: React.MouseEvent<SVGSVGElement>) {
    if (addingNode) {
      handleCreateNode(event);
    } else {
      // if node wasn't saved, revert node to cached version
      if (cachedNode && !nodeSaved) {
        updateNode(cachedNode);
      }

      setSelectedNodeID(undefined);
      setCachedNode(undefined);
      setNodeSaved(false);
    }
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

  const handleCreateNode = async (event: React.MouseEvent<SVGSVGElement>) => {
    // Get coordinates of the click relative to the SVG element
    const svg = (event.target as SVGSVGElement | null)?.ownerSVGElement;
    if (!svg) {
      // Handle the case where svg is null
      return;
    }
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;

    const matrix = svg.getScreenCTM();
    if (!matrix) {
      // Handle the case where matrix is null
      return;
    }
    const { x, y } = point.matrixTransform(matrix.inverse());

    const xVal = x.toString();
    const yVal = y.toString();
    const nodeID = userNodePrefix + numUserNodes;
    const floor = activeFloor;
    const building = "";
    const nodeType = "";
    const longName = "";
    const shortName = nodeID;

    setNumUserNodes(numUserNodes + 1);

    // Add new node to the nodes array
    const newNode = {
      nodeID: nodeID,
      xcoord: xVal,
      ycoord: yVal,
      floor: floor.toString(),
      building: building,
      nodeType: nodeType,
      longName: longName,
      shortName: shortName,
    };

    const tempNodes = new Map(nodes);
    tempNodes.set(newNode.nodeID, newNode);
    setNodes(tempNodes);
    setSelectedNodeID(nodeID);
    await axios.post(APIEndpoints.createNode, newNode);
  };

  return (
    <div className="relative bg-offwhite">
      <MapContext.Provider value={contextValue}>
        <MapEditImage
          addingNode={addingNode}
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
      <div className="absolute left-[2%] bottom-[2%] z-50">
        <AddNodeToolTip onClicked={handleAddNodeButtonClicked} />
      </div>
    </div>
  );
}

export default MapEdit;
