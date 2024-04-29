import React, { createContext, useEffect, useState } from "react";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import { Node, Edge } from "database";
import axios from "axios";
import MapEditImage from "../components/map-edit/MapEditImage.tsx";
import FloorSelector from "../components/map-edit/FloorSelector.tsx";
import MapEditCard from "../components/map-edit/MapEditCard.tsx";
import MapData from "./MapData.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import MapEditToolBar from "../components/map-edit/MapEditToolBar.tsx";
import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
import { MakeProtectedPatchRequest } from "../MakeProtectedPatchRequest.ts";
import ButtonBlue from "../components/ButtonBlue.tsx";
import CheckIcon from "@mui/icons-material/Check";
import { useToast } from "../components/useToast.tsx";
import UndoRedoButton from "../components/map-edit/UndoRedoButton.tsx";
import ButtonRed from "../components/ButtonRed.tsx";
import ClearIcon from "@mui/icons-material/Clear";

const defaultFloor: number = 1;
enum Action {
  SelectNode = "SelectNode",
  MoveNode = "MoveNode",
  CreateNode = "CreateNode",
  CreateEdge = "CreateEdge",
  DeleteNode = "DeleteNode",
}

//merge changes to dev

type MapData = {
  nodes: Map<string, Node>;
  setNodes: React.Dispatch<React.SetStateAction<Map<string, Node>>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  selectedNodeID: string | undefined;
  setSelectedNodeID: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedAction: Action;
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
  selectedAction: Action.SelectNode,
});

const userNodePrefix = "userNode";

function MapEdit() {
  // Hash maps for nodes and edges
  const [nodes, setNodes] = useState<Map<string, Node>>(new Map());
  const [edges, setEdges] = useState<Edge[]>([]);
  const [addedNodes, setAddedNodes] = useState<Map<string, Node>>(new Map());
  const [updatedNodes, setUpdatedNodes] = useState<Map<string, Node>>(
    new Map(),
  );
  const [addedEdges, setAddedEdges] = useState<Edge[]>([]);
  const [deletedNodes] = useState<Map<string, Node>>(new Map());

  //const [addingNode, setAddingNode] = useState<boolean>(false);
  //const [addingEdge, setAddingEdge] = useState<boolean>(false);
  const [startEdgeNodeID, setStartEdgeNodeID] = useState<string | undefined>(
    undefined,
  );
  const [selectedNodeID, setSelectedNodeID] = useState<string | undefined>(
    undefined,
  );
  const [selectedAction, setSelectedAction] = useState<Action>(
    Action.SelectNode,
  );

  const contextValue = {
    nodes,
    setNodes,
    edges,
    setEdges,
    selectedNodeID,
    setSelectedNodeID,
    selectedAction,
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
  }, [activeFloor, getAccessTokenSilently]);

  function updateNodeField(field: keyof Node, value: string | number) {
    const node = nodes.get(selectedNodeID!);
    if (node) {
      updateNode({ ...node, [field]: value });
    }
  }

  const saveButtonStyles = {
    width: "10vw",
    height: "5.5vh",
  };

  function updateNode(node: Node) {
    console.log("inside updateNode");
    const tempNodes = new Map(nodes);
    const tempUpdatedNodes = new Map(updatedNodes);
    if (selectedNodeID) {
      tempNodes.set(selectedNodeID, node);
      tempUpdatedNodes.set(selectedNodeID, node);
      setNodes(tempNodes);
      setUpdatedNodes(tempUpdatedNodes);
    }
  }

  function handleNodeClick(nodeID: string) {
    if (selectedAction === Action.CreateEdge) {
      if (!startEdgeNodeID) {
        setStartEdgeNodeID(nodeID);
      } else {
        handleCreateEdge(startEdgeNodeID, nodeID);
        setStartEdgeNodeID(undefined);
      }
    } else if (selectedAction === Action.CreateNode) {
      if (!startEdgeNodeID) {
        setStartEdgeNodeID(nodeID);
      } else {
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

  function handleSelectNodeSelected() {
    setSelectedAction(Action.SelectNode);
  }
  function handleMoveNodeSelected() {
    setSelectedAction(Action.MoveNode);
  }
  function handleCreateNodeSelected() {
    setSelectedAction(Action.CreateNode);
  }
  function handleCreateEdgeSelected() {
    setSelectedAction(Action.CreateEdge);
    setStartEdgeNodeID(undefined);
  }
  function handleDeleteNodeSelected() {
    setSelectedAction(Action.DeleteNode);
  }

  function handleMapClick(event: React.MouseEvent<SVGSVGElement>) {
    if (selectedAction === Action.CreateNode) {
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

  async function handleSaveAll() {
    const token = await getAccessTokenSilently();
    await MakeProtectedPostRequest(
      APIEndpoints.createNode,
      Array.from(addedNodes.values()),
      token,
    );
    const sendUpdatedNodes = {
      nodes: Array.from(updatedNodes.values()),
      //nodes: Array.from(updatedNodes.values()),
    };

    if (Array.from(updatedNodes.values()).length != 0) {
      await MakeProtectedPatchRequest(
        APIEndpoints.updateNodes,
        sendUpdatedNodes,
        token,
      );
    }

    const sendDeletedNodes = {
      nodes: Array.from(deletedNodes.values()),
    };
    await MakeProtectedPostRequest(
      APIEndpoints.deleteNode,
      sendDeletedNodes,
      token,
    );

    const sendNewEdges = {
      edges: addedEdges,
    };

    if (Array.from(addedEdges.values()).length != 0) {
      await MakeProtectedPostRequest(
        APIEndpoints.createEdge,
        sendNewEdges,
        token,
      );
    }

    showToast("Changes Saved!", "success");
  }

  async function handleRevertAll() {
    console.log();
  }

  function handleUndo() {
    console.log();
  }

  function handleRedo() {
    console.log();
  }

  const handleCreateNode = async (event: React.MouseEvent<SVGSVGElement>) => {
    const token = await getAccessTokenSilently();

    // Get coordinates of the click relative to the SVG element
    const svg = (event.target as SVGSVGElement | null)?.ownerSVGElement;
    if (!svg) {
      // Handle the case where svg is null
      return;
    }
    const point = svg.createSVGPoint();
    point.x = Math.round(event.clientX);
    point.y = Math.round(event.clientY);

    const matrix = svg.getScreenCTM();
    if (!matrix) {
      // Handle the case where matrix is null
      return;
    }
    const { x, y } = point.matrixTransform(matrix.inverse());
    const numNodeRaw = await MakeProtectedGetRequest(
      APIEndpoints.countNodes,
      token,
    );
    const xVal = Math.round(x);
    const yVal = Math.round(y);
    const nodeID =
      userNodePrefix + (addedNodes.size + numNodeRaw.data["numNodes"] + 1);
    const floor = activeFloor;
    const building = "";
    const nodeType = "";
    const longName = nodeID;
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
    if (newNode.building == "") {
      newNode.building = "default building";
    }
    if (newNode.nodeType) {
      newNode.nodeType = "created node";
    }
    if (newNode.longName == "") {
      newNode.longName = newNode.nodeID;
    }
    if (newNode.shortName == "") {
      newNode.shortName = newNode.nodeID;
    }

    tempNodes.set(newNode.nodeID, newNode);
    setNodes(tempNodes);
    const tempAddedNodes = new Map(addedNodes);
    tempAddedNodes.set(newNode.nodeID, newNode);
    setAddedNodes(tempAddedNodes);
    setSelectedNodeID(nodeID);
  };

  function handleCreateEdge(startNodeID: string, endNodeID: string) {
    const edgeID = startNodeID + "_" + endNodeID;

    setNumUserEdges(numUserEdges + 1);

    // Add new node to the nodes array
    const newEdge = {
      edgeID: edgeID,
      startNodeID: startNodeID,
      endNodeID: endNodeID,
    };

    let tempEdges: Edge[] = [newEdge];
    tempEdges = tempEdges.concat(edges);
    setEdges(tempEdges);
    let tempAddedEdges = [newEdge];
    tempAddedEdges = tempAddedEdges.concat(addedEdges);
    setAddedEdges(tempAddedEdges);
  }
  return (
    <div className="relative bg-offwhite">
      <MapContext.Provider value={contextValue}>
        <MapEditImage
          startEdgeNodeID={startEdgeNodeID}
          activeFloor={activeFloor}
          onNodeClick={handleNodeClick}
          onMapClick={handleMapClick}
        />
      </MapContext.Provider>
      <div className="absolute left-[1%] top-[1%]">
        <MapContext.Provider value={contextValue}>
          <MapEditCard updateNode={updateNodeField} />
        </MapContext.Provider>
      </div>
      <div className="absolute right-[1.5%] bottom-[2%]">
        <FloorSelector activeFloor={activeFloor} onClick={setActiveFloor} />
      </div>
      <div className="flex flex-row w-[55vw] justify-between absolute left-[30%] top-[2%]">
        <UndoRedoButton undo={handleUndo} redo={handleRedo} />
        <MapContext.Provider value={contextValue}>
          <MapEditToolBar
            SelectNode={handleSelectNodeSelected}
            MoveNode={handleMoveNodeSelected}
            CreateNode={handleCreateNodeSelected}
            CreateEdge={handleCreateEdgeSelected}
            DeleteNode={handleDeleteNodeSelected}
          />
        </MapContext.Provider>
        <ButtonBlue
          onClick={handleSaveAll}
          //disabled={!selectedNodeID}
          endIcon={<CheckIcon />}
          style={saveButtonStyles}
        >
          Save All
        </ButtonBlue>
        <ButtonRed
          onClick={handleRevertAll}
          //disabled={!selectedNodeID}
          endIcon={<ClearIcon />}
          style={saveButtonStyles}
        >
          Revert All
        </ButtonRed>
      </div>
    </div>
  );
}

export default MapEdit;
