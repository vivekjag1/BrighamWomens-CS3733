import React, { createContext, useEffect, useRef, useState } from "react";
import { APIEndpoints, NavigateAttributes } from "common/src/APICommon.ts";
import { Node, Edge } from "database";
import MapEditImage from "../components/map-edit/MapEditImage.tsx";
import FloorSelector from "../components/map-edit/FloorSelector.tsx";
import MapEditCard, { nodeType } from "../components/map-edit/MapEditCard.tsx";
import MapData from "./MapData.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import MapEditToolBar from "../components/map-edit/MapEditToolBar.tsx";
import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
import { useToast } from "../components/useToast.tsx";
// import UndoRedoButtons from "../components/map-edit/UndoRedoButtons.tsx";
import SaveRevertAllButtons from "../components/map-edit/SaveRevertAllButtons.tsx";
import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
import { useBlocker } from "react-router-dom";
import CustomModal from "../components/CustomModal.tsx";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { DesignSystem } from "../common/StylingCommon.ts";

const defaultFloor: number = 1;
enum Action {
  SelectNode = "SelectNode",
  MoveNode = "MoveNode",
  CreateNode = "CreateNode",
  CreateEdge = "CreateEdge",
  Delete = "Delete",
}
type MapData = {
  nodes: Map<string, Node>;
  setNodes: React.Dispatch<React.SetStateAction<Map<string, Node>>>;
  edges: Map<string, Edge>;
  setEdges: React.Dispatch<React.SetStateAction<Map<string, Edge>>>;
  selectedNodeID: string | undefined;
  setSelectedNodeID: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedEdgeID: string | undefined;
  setSelectedEdgeID: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedAction: Action;
};
export const MapContext = createContext<MapData>({
  nodes: new Map(),
  // eslint-disable-next-line no-empty-function
  setNodes: () => {},
  edges: new Map(),
  // eslint-disable-next-line no-empty-function
  setEdges: () => {},
  selectedNodeID: undefined,
  selectedEdgeID: undefined,
  // eslint-disable-next-line no-empty-function
  setSelectedNodeID: () => {},
  // eslint-disable-next-line no-empty-function
  setSelectedEdgeID: () => {},
  selectedAction: Action.SelectNode,
});

const USER_NODE_PREFIX = "UserNode";
const USER_NODE_TYPE: nodeType = "HALL";

function MapEdit() {
  // Hash map for nodes, list of edges
  const [nodes, setNodes] = useState<Map<string, Node>>(new Map());
  const [edges, setEdges] = useState<Map<string, Edge>>(new Map());

  // Used to restore data when 'revert' clicked
  const originalNodes = useRef<Map<string, Node>>(new Map());
  const originalEdges = useRef<Map<string, Edge>>(new Map());

  const [startEdgeNodeID, setStartEdgeNodeID] = useState<string | undefined>(
    undefined,
  );
  const [selectedNodeID, setSelectedNodeID] = useState<string | undefined>(
    undefined,
  );
  const [selectedAction, setSelectedAction] = useState<Action>(
    Action.SelectNode,
  );

  const [selectedEdgeID, setSelectedEdgeID] = useState<string | undefined>(
    undefined,
  );

  const [activeFloor, setActiveFloor] = useState<number>(defaultFloor);
  const [numUserNodes, setNumUserNodes] = useState<number>(1);
  const [numUserEdges, setNumUserEdges] = useState<number>(1);
  const [hasChanged, setHasChanged] = useState(false);

  const { showToast } = useToast();
  const { getAccessTokenSilently } = useAuth0();

  const [revertModal, setRevertModal] = React.useState(false);
  const [saveModal, setSaveModal] = React.useState(false);

  const contextValue = {
    nodes,
    setNodes,
    edges,
    setEdges,
    selectedNodeID,
    setSelectedNodeID,
    selectedAction,
    selectedEdgeID,
    setSelectedEdgeID,
  };

  // Warn users changes will be lost when leaving page.
  useEffect(() => {
    if (!hasChanged) return;
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
      return "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanged]);

  // Get map data on floor change
  useEffect(() => {
    const fetchData = async () => {
      let floorString;
      switch (activeFloor) {
        case -1:
          floorString = "L1";
          break;
        case -2:
          floorString = "L2";
          break;
        default:
          floorString = activeFloor.toString();
      }
      try {
        const params = new URLSearchParams({
          [NavigateAttributes.floorKey]: floorString.toString(),
        });

        const url = new URL(APIEndpoints.getMapOnFloor, window.location.origin);
        url.search = params.toString();

        const token = await getAccessTokenSilently();

        // Fetch all nodes and edges on floor
        const mapData = (await MakeProtectedGetRequest(url.toString(), token))
          .data;

        // construct nodes map
        const nodes: Map<string, Node> = new Map();
        mapData.nodes.forEach((node: Node) => nodes.set(node.nodeID, node));

        // construct edges map
        const edges: Map<string, Edge> = new Map();
        mapData.edges.forEach((edge: Edge) => edges.set(edge.edgeID, edge));

        // Store original state as copies so we can revert
        originalNodes.current = new Map(nodes);
        originalEdges.current = new Map(edges);

        // Finally, update our useStates
        setNodes(nodes);
        setEdges(edges);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchData();
  }, [activeFloor, getAccessTokenSilently]);

  // Update/create node in nodes useState
  function updateNode(node: Node) {
    const newNodes: Map<string, Node> = new Map(nodes);
    newNodes.set(node.nodeID, node);
    setNodes(newNodes);
    if (selectedAction == Action.MoveNode) setHasChanged(true);
  }

  // Deletes node from nodes useState
  function deleteNode(nodeID: string) {
    const newNodes: Map<string, Node> = new Map(nodes);
    newNodes.delete(nodeID);
    setNodes(newNodes);
  }

  // Update/create edge in edges useState
  function updateEdge(edge: Edge) {
    const newEdges: Map<string, Edge> = new Map(edges);
    newEdges.set(edge.edgeID, edge);
    setEdges(newEdges);
  }

  // Deletes edge from edges useState
  function deleteEdge(edgeID: string) {
    const newEdges: Map<string, Edge> = new Map(edges);
    newEdges.delete(edgeID);
    setEdges(newEdges);
  }

  function updateNodeField(field: keyof Node, value: string | number) {
    const node = nodes.get(selectedNodeID!);
    if (node) updateNode({ ...node, [field]: value });
    setHasChanged(true);
  }

  function handleEdgeClick(edgeID: string) {
    if (selectedAction == Action.Delete) {
      deleteEdge(edgeID);
    }
  }

  function handleNodeClick(nodeID: string) {
    if (selectedAction == Action.CreateEdge) {
      if (!startEdgeNodeID) {
        setStartEdgeNodeID(nodeID);
      } else {
        handleCreateEdge(startEdgeNodeID, nodeID);
        setStartEdgeNodeID(undefined);
      }
    } else if (selectedAction == Action.CreateNode) {
      if (!startEdgeNodeID) {
        setStartEdgeNodeID(nodeID);
      } else {
        setStartEdgeNodeID(undefined);
      }
    } else if (selectedAction == Action.Delete) {
      removeNode(nodeID);
    } else {
      if (selectedNodeID) {
        // Update the node if changes were not saved
        const unsavedNode = nodes.get(selectedNodeID);
        if (unsavedNode) {
          updateNode(unsavedNode);
        }
      }
      setSelectedNodeID(nodeID);
    }
  }

  function removeNode(nodeID: string) {
    const type = nodes.get(nodeID)?.nodeType;
    if ((type && type == "ELEV") || type == "STAI") {
      showToast("This node cannot be deleted!", "warning");
    } else {
      removeNeighboringEdges(nodeID);
      deleteNode(nodeID);
    }

    setHasChanged(true);
  }

  function removeNeighboringEdges(nodeID: string) {
    const neighbors = [];
    for (const edge of edges.values()) {
      if (edge.startNodeID == nodeID || edge.endNodeID == nodeID)
        neighbors.push(edge);
    }

    neighbors.forEach((edge) => {
      deleteEdge(edge.edgeID);
    });
  }

  function handleMapClick(event: React.MouseEvent<SVGSVGElement>) {
    if (selectedAction == Action.CreateNode) {
      handleCreateNode(event);
    } else {
      setSelectedNodeID(undefined);
    }
  }

  async function handleSaveAll() {
    const token = await getAccessTokenSilently();
    const nodesList: Node[] = Array.from(nodes.values());
    const edgesList: Edge[] = Array.from(edges.values());

    await MakeProtectedPostRequest(
      APIEndpoints.updateMapOnFloor,
      { floor: activeFloor, nodes: nodesList, edges: edgesList },
      token,
    );

    showToast("Map updated successfully!", "success");

    // Update reverted state
    originalNodes.current = new Map(nodes);
    originalEdges.current = new Map(edges);

    setHasChanged(false);
  }

  async function handleRevertAll() {
    setNodes(originalNodes.current);
    setEdges(originalEdges.current);
    setHasChanged(false);
  }

  // function handleUndo() {
  //   console;
  // }
  //
  // function handleRedo() {
  //   console;
  // }

  const handleCreateNode = async (event: React.MouseEvent<SVGSVGElement>) => {
    const token = await getAccessTokenSilently();

    // Get coordinates of the click relative to the SVG element
    const svg = (event.target as SVGSVGElement | null)?.ownerSVGElement;
    if (!svg) {
      return;
    }

    const point = svg.createSVGPoint();
    point.x = Math.round(event.clientX);
    point.y = Math.round(event.clientY);

    const matrix = svg.getScreenCTM();
    if (!matrix) {
      return;
    }

    const { x, y } = point.matrixTransform(matrix.inverse());
    const numNodeRaw = await MakeProtectedGetRequest(
      APIEndpoints.getNumberNodes,
      token,
    );

    const nodeID =
      USER_NODE_PREFIX + (numUserNodes + numNodeRaw.data["numNodes"]);

    // Create new node
    const newNode: Node = {
      nodeID: nodeID,
      xcoord: Math.round(x),
      ycoord: Math.round(y),
      floor: activeFloor.toString(),
      building: "",
      nodeType: USER_NODE_TYPE,
      longName: nodeID,
      shortName: nodeID,
    };

    setNumUserNodes(numUserNodes + 1);
    updateNode(newNode);
    setSelectedNodeID(nodeID);
    setHasChanged(true);
  };

  function handleCreateEdge(startNodeID: string, endNodeID: string) {
    // Create new edge
    const newEdge: Edge = {
      edgeID: startNodeID + "_" + endNodeID,
      startNodeID: startNodeID,
      endNodeID: endNodeID,
    };

    if (edges.has(newEdge.edgeID)) {
      showToast("Edge already exists!", "warning");
      return;
    }

    setNumUserEdges(numUserEdges + 1);
    updateEdge(newEdge);
    setHasChanged(true);
  }

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasChanged && currentLocation.pathname !== nextLocation.pathname,
  );

  return (
    <div className="relative bg-offwhite">
      <MapContext.Provider value={contextValue}>
        <MapEditImage
          startEdgeNodeID={startEdgeNodeID}
          activeFloor={activeFloor}
          onNodeClick={handleNodeClick}
          onMapClick={handleMapClick}
          onEdgeClick={handleEdgeClick}
          updateNode={updateNodeField}
        />
      </MapContext.Provider>
      <div className="absolute left-[1%] top-[1%]">
        <MapContext.Provider value={contextValue}>
          <MapEditCard updateNode={updateNodeField} />
        </MapContext.Provider>
      </div>
      <div className="flex flex-row w-[55vw] justify-between absolute left-[30%] top-[1%]">
        {/*<UndoRedoButtons undo={handleUndo} redo={handleRedo} />*/}
        <MapContext.Provider value={contextValue}>
          <MapEditToolBar
            SelectNode={() => setSelectedAction(Action.SelectNode)}
            MoveNode={() => setSelectedAction(Action.MoveNode)}
            CreateNode={() => setSelectedAction(Action.CreateNode)}
            CreateEdge={() => {
              setSelectedAction(Action.CreateEdge);
              setStartEdgeNodeID(undefined);
            }}
            DeleteNode={() => setSelectedAction(Action.Delete)}
          />
        </MapContext.Provider>
        <SaveRevertAllButtons
          saveAll={() => setSaveModal(true)}
          revertAll={() => setRevertModal(true)}
        />
      </div>
      <div className="absolute right-[1.5%] bottom-[2%]">
        <FloorSelector activeFloor={activeFloor} onClick={setActiveFloor} />
      </div>
      <CustomModal isOpen={revertModal} onClose={() => setRevertModal(false)}>
        <div className="flex flex-col gap-2 text-secondary text-md font-semibold p-5 rounded-lg drop-shadow-2xl bg-white">
          Your changes will be lost. Are you sure you want to proceed?
          <div className="flex justify-center gap-8">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#EA422D",
                color: "white",
                width: "8rem",
                fontFamily: "Poppins, sans-serif",
              }}
              endIcon={<ClearIcon />}
              onClick={() => setRevertModal(false)}
            >
              CANCEL
            </Button>

            <Button
              variant="contained"
              className="justify-end"
              style={{
                backgroundColor: "#012D5A",
                width: "8rem",
                fontFamily: "Poppins, sans-serif",
              }}
              endIcon={<CheckIcon />}
              onClick={() => {
                handleRevertAll();
                setRevertModal(false);
              }}
            >
              CONFIRM
            </Button>
          </div>
        </div>
      </CustomModal>
      <CustomModal isOpen={saveModal} onClose={() => setSaveModal(false)}>
        <div className="flex flex-col gap-2 text-secondary text-md font-semibold p-5 rounded-lg drop-shadow-2xl bg-white">
          Your changes will be saved. Are you sure you want to proceed?
          <div className="flex justify-center gap-8">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#EA422D",
                color: "white",
                width: "8rem",
                fontFamily: "Poppins, sans-serif",
              }}
              endIcon={<ClearIcon />}
              onClick={() => setSaveModal(false)}
            >
              CANCEL
            </Button>

            <Button
              variant="contained"
              className="justify-end"
              style={{
                backgroundColor: "#012D5A",
                width: "8rem",
                fontFamily: "Poppins, sans-serif",
              }}
              endIcon={<CheckIcon />}
              onClick={() => {
                handleSaveAll();
                setSaveModal(false);
              }}
            >
              CONFIRM
            </Button>
          </div>
        </div>
      </CustomModal>
      {blocker.state === "blocked" ? (
        <CustomModal
          isOpen={blocker.state === "blocked"}
          onClose={() => blocker.reset()}
        >
          <div className="flex flex-col gap-2 text-secondary text-md font-semibold p-5 rounded-lg drop-shadow-2xl bg-white">
            Your changes will be lost. Are you sure you want to proceed?
            <div className="flex justify-center gap-8">
              <Button
                variant="contained"
                style={cancelButtonStyles}
                endIcon={<ClearIcon />}
                onClick={() => {
                  blocker.reset();
                }}
              >
                CANCEL
              </Button>
              <Button
                variant="contained"
                style={confirmButtonStyles}
                endIcon={<CheckIcon />}
                onClick={() => blocker.proceed()}
              >
                CONFIRM
              </Button>
            </div>
          </div>
        </CustomModal>
      ) : null}
    </div>
  );
}

const confirmButtonStyles = {
  backgroundColor: DesignSystem.primaryColor,
  width: "8rem",
  fontFamily: DesignSystem.fontFamily,
} as const;

const cancelButtonStyles = {
  backgroundColor: "#EA422D",
  color: DesignSystem.white,
  width: "8rem",
  fontFamily: DesignSystem.fontFamily,
} as const;

export default MapEdit;
