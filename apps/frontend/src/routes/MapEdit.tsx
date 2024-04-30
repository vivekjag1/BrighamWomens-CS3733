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
import UndoRedoButtons from "../components/map-edit/UndoRedoButtons.tsx";
import SaveRevertAllButtons from "../components/map-edit/SaveRevertAllButtons.tsx";
import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
const defaultFloor: number = 1;
enum Action {
  SelectNode = "SelectNode",
  MoveNode = "MoveNode",
  CreateNode = "CreateNode",
  CreateEdge = "CreateEdge",
  DeleteNode = "DeleteNode",
}
type MapData = {
  nodes: Map<string, Node>;
  setNodes: React.Dispatch<React.SetStateAction<Map<string, Node>>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
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
  edges: [],
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
  const [edges, setEdges] = useState<Edge[]>([]);

  // Used to restore data when 'revert' clicked
  const originalNodes = useRef<Map<string, Node>>(new Map());
  const originalEdges = useRef<Edge[]>([]);

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

  const { showToast } = useToast();
  const { getAccessTokenSilently } = useAuth0();

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
        const edges = mapData.edges;

        // construct nodes map
        const nodes: Map<string, Node> = new Map();
        mapData.nodes.forEach((node: Node) => nodes.set(node.nodeID, node));

        // Store original state as copies so we can revert
        originalNodes.current = new Map(nodes);
        originalEdges.current = [...edges];

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
  }

  // Deletes node from nodes useState
  function deleteNode(nodeID: string) {
    const newNodes: Map<string, Node> = new Map(nodes);
    newNodes.delete(nodeID);
    setNodes(newNodes);
  }

  // Update/create edge in edges useState
  function updateEdge(edge: Edge) {
    const newEdges: Edge[] = edges;
    newEdges.push(edge);
    setEdges(newEdges);
  }

  // // Deletes edge from edges useState
  // function deleteEdge(edgeID: string) {
  //   const newEdges: Edge[] = edges;
  //   newEdges.
  //   setEdges(newEdges);
  // }

  function updateNodeField(field: keyof Node, value: string | number) {
    const node = nodes.get(selectedNodeID!);
    if (node) updateNode({ ...node, [field]: value });
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
    } else if (selectedAction == Action.DeleteNode) {
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
      deleteNode(nodeID);
      repairBrokenEdges(nodeID);
    }
  }

  function repairBrokenEdges(nodeID: string) {
    console.log(nodeID);
    // const selectedNodeEdges: Edge[] = edges.filter(
    //   (value) =>
    //     (value.startNodeID == nodeID &&
    //       nodesForDeletion.indexOf(value.endNodeID) == -1) ||
    //     (value.endNodeID == nodeID &&
    //       nodesForDeletion.indexOf(value.startNodeID) == -1),
    // );
    //
    // const tempRepairedEdges: Edge[] = [];
    // const tempNeighborNodesIDs: string[] = [];
    // for (let i = 0; i < selectedNodeEdges.length; i++) {
    //   if (selectedNodeEdges[i].startNodeID == nodeID) {
    //     tempNeighborNodesIDs.push(selectedNodeEdges[i].endNodeID);
    //   } else {
    //     tempNeighborNodesIDs.push(selectedNodeEdges[i].startNodeID);
    //   }
    // }
    //
    // for (let i = 0; i < tempNeighborNodesIDs.length - 1; i++) {
    //   for (let j = tempNeighborNodesIDs.length - 1; j > i; j--) {
    //     const edgeID: string =
    //       tempNeighborNodesIDs[i] + "_" + tempNeighborNodesIDs[j];
    //     const reversedEdgeID: string =
    //       tempNeighborNodesIDs[j] + "_" + tempNeighborNodesIDs[i];
    //     const edgesWithEdgeID = edges.filter(
    //       (value) => value.edgeID == edgeID || value.edgeID == reversedEdgeID,
    //     );
    //     if (edgesWithEdgeID.length == 0) {
    //       tempRepairedEdges.push({
    //         edgeID: edgeID,
    //         startNodeID: tempNeighborNodesIDs[i],
    //         endNodeID: tempNeighborNodesIDs[j],
    //       });
    //     }
    //   }
    //
    //   const updatedTempEdges = tempRepairedEdges.concat(edges);
    //   let addedRepairedEdges = tempRepairedEdges.concat(addedEdges);
    //   addedRepairedEdges = addedRepairedEdges.filter(
    //     (value, index) => addedRepairedEdges.indexOf(value) == index,
    //   );
    //   setEdges(updatedTempEdges);
    //   setAddedEdges(addedRepairedEdges);
    // }
    //
    // //queue it for deletion upon save all
    // const test = nodesForDeletion;
    // test.push(nodeID!);
    // setNodesForDeletion(test);
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

    await MakeProtectedPostRequest(
      APIEndpoints.updateMapOnFloor,
      { floor: activeFloor, nodes: nodesList, edges: edges },
      token,
    );

    showToast("Map updated successfully!", "success");

    // Update reverted state
    originalNodes.current = new Map(nodes);
    originalEdges.current = [...edges];
  }

  async function handleRevertAll() {
    setNodes(originalNodes.current);
    setEdges(originalEdges.current);
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
  };

  function handleCreateEdge(startNodeID: string, endNodeID: string) {
    // Create new edge
    const newEdge: Edge = {
      edgeID: startNodeID + "_" + endNodeID,
      startNodeID: startNodeID,
      endNodeID: endNodeID,
    };

    setNumUserEdges(numUserEdges + 1);
    updateEdge(newEdge);
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
      <div className="flex flex-row w-[55vw] justify-between absolute left-[30%] top-[1%]">
        <UndoRedoButtons undo={handleUndo} redo={handleRedo} />
        <MapContext.Provider value={contextValue}>
          <MapEditToolBar
            SelectNode={() => setSelectedAction(Action.SelectNode)}
            MoveNode={() => setSelectedAction(Action.MoveNode)}
            CreateNode={() => setSelectedAction(Action.CreateNode)}
            CreateEdge={() => {
              setSelectedAction(Action.CreateEdge);
              setStartEdgeNodeID(undefined);
            }}
            DeleteNode={() => setSelectedAction(Action.DeleteNode)}
          />
        </MapContext.Provider>
        <SaveRevertAllButtons
          saveAll={handleSaveAll}
          revertAll={handleRevertAll}
        />
      </div>
      <div className="absolute right-[1.5%] bottom-[2%]">
        <FloorSelector activeFloor={activeFloor} onClick={setActiveFloor} />
      </div>
    </div>
  );
}

export default MapEdit;
