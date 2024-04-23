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
import AddElementToolTip from "../components/AddElementToolTip.tsx";
import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";

const defaultFloor: number = 1;

type MapData = {
  nodes: Map<string, Node>;
  setNodes: React.Dispatch<React.SetStateAction<Map<string, Node>>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  selectedNodeID: string | undefined;
  setSelectedNodeID: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const MapContext = createContext<MapData>({
  nodes: new Map(),
  // eslint-disable-next-line no-empty-function
  setNodes: () => {},
  edges: [],
  // eslint-disable-next-line no-empty-function
  setEdges: () => {},
  selectedNodeID: undefined,
  // eslint-disable-next-line no-empty-function
  setSelectedNodeID: () => {},
});

const userNodePrefix = "userNode";

function MapEdit() {
  // Hash maps for nodes and edges
  const [nodes, setNodes] = useState<Map<string, Node>>(new Map());
  const [edges, setEdges] = useState<Edge[]>([]);

  const [addingNode, setAddingNode] = useState<boolean>(false);
  const [addingEdge, setAddingEdge] = useState<boolean>(false);
  const [startEdgeNodeID, setStartEdgeNodeID] = useState<string | undefined>(
    undefined,
  );
  const [numberOfNodes, setNumberOfNodes] = useState<number>(0);
  const [selectedNodeID, setSelectedNodeID] = useState<string | undefined>(
    undefined,
  );

  const contextValue = {
    nodes,
    setNodes,
    edges,
    setEdges,
    selectedNodeID,
    setSelectedNodeID,
  };

  const [activeFloor, setActiveFloor] = useState<number>(defaultFloor);
  const [numUserNodes, setNumUserNodes] = useState<number>(1);
  const [numUserEdges, setNumUserEdges] = useState<number>(1);
  const { showToast } = useToast();
  const [cachedNode, setCachedNode] = useState<Node | undefined>(undefined);
  const [nodeSaved, setNodeSaved] = useState<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();
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
        const numNodes = await MakeProtectedGetRequest(
          APIEndpoints.countNodes,
          token,
        );
        setNumberOfNodes(numNodes.data["numNodes"]);
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
  }, [activeFloor, getAccessTokenSilently]);

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

  async function deleteNode() {
    if (selectedNodeID) {
      const tempNodes = new Map(nodes);
      tempNodes.delete(selectedNodeID);
      setNodes(tempNodes);
    }
    setSelectedNodeID(undefined);
    setCachedNode(undefined);
    setNodeSaved(false);
    console.log(selectedNodeID);

    const selectedNodeEdges: Edge[] = edges.filter(
      (value) =>
        value.startNodeID == selectedNodeID ||
        value.endNodeID == selectedNodeID,
    );
    console.log(selectedNodeEdges);
    let tempRepairedEdges: Edge[] = [];
    const tempNeighborNodesIDs: string[] = [];
    for (let i = 0; i < selectedNodeEdges.length; i++) {
      if (selectedNodeEdges[i].startNodeID == selectedNodeID) {
        tempNeighborNodesIDs.push(selectedNodeEdges[i].endNodeID);
      } else {
        tempNeighborNodesIDs.push(selectedNodeEdges[i].startNodeID);
      }
    }
    console.log(tempNeighborNodesIDs);
    for (let i = 0; i < tempNeighborNodesIDs.length; i++) {
      for (let j = tempNeighborNodesIDs.length - 1; j > i; j--) {
        tempRepairedEdges.push({
          edgeID: tempNeighborNodesIDs[i] + "_" + tempNeighborNodesIDs[j],
          startNodeID: tempNeighborNodesIDs[i],
          endNodeID: tempNeighborNodesIDs[j],
        });
      }
    }
    console.log(tempRepairedEdges);
    tempRepairedEdges = tempRepairedEdges.concat(edges);
    setEdges(tempRepairedEdges);

    const sendToDb = {
      nodeID: selectedNodeID,
    };
    await axios.post(APIEndpoints.deleteNode, sendToDb);
  }

  function handleNodeClick(nodeID: string) {
    if (addingEdge) {
      if (!startEdgeNodeID) {
        setStartEdgeNodeID(nodeID);
      } else {
        handleCreateEdge(startEdgeNodeID, nodeID);
        setStartEdgeNodeID(undefined);
      }
    } else {
      if (selectedNodeID) {
        // Update the node if changes were not saved
        const unsavedNode = nodes.get(selectedNodeID);
        if (unsavedNode) {
          updateNode(unsavedNode);
        }
      }

      setSelectedNodeID(nodeID);
      setNodeSaved(false);
    }
  }

  function handleAddNodeButtonClicked() {
    setAddingNode(!addingNode);
    setAddingEdge(false);
  }

  function handleAddEdgeButtonClicked() {
    setAddingEdge(!addingEdge);
    setAddingNode(false);
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
    const token = await getAccessTokenSilently();
    if (nodes.get(selectedNodeID!)!.shortName === "") {
      showToast("Please fill in a node ID!", "error");
      return;
    }

    const node = nodes.get(selectedNodeID!);
    if (node!.nodeID.substring(0, 8) != "userNode") {
      await axios.patch(APIEndpoints.updateNodes, node, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      //cut first 8 characters
      const numNode: number = numberOfNodes + 1;
      setNumberOfNodes(numberOfNodes + 1);
      console.log(numNode);
      node!.nodeID = node!.nodeID.substring(0, 8) + numNode;
      console.log(node);
      await MakeProtectedPostRequest(APIEndpoints.createNode, node!, token);
    }
  }

  const handleCreateNode = (event: React.MouseEvent<SVGSVGElement>) => {
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
    const shortName = "";

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
  };

  function handleCreateEdge(startNodeID: string, endNodeID: string) {
    const edgeID = "";

    setNumUserEdges(numUserEdges + 1);

    // Add new node to the nodes array
    const newEdge = {
      edgeID: edgeID,
      startNodeID: startNodeID,
      endNodeID: endNodeID,
    };

    const tempEdges: Edge[] = edges;
    tempEdges.push(newEdge);
    setEdges(tempEdges);
  }

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
        <AddElementToolTip
          onClicked={handleAddNodeButtonClicked}
          title="Create Node"
          selected={addingNode}
        />
      </div>
      <div className="absolute left-[2%] bottom-[9%] z-50">
        <AddElementToolTip
          onClicked={handleAddEdgeButtonClicked}
          title="Create Edge"
          selected={addingEdge}
        />
      </div>
    </div>
  );
}

export default MapEdit;
