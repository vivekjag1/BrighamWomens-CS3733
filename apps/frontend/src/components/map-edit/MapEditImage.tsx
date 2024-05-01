import lowerLevel2 from "../../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../../assets/maps/03_thethirdfloor.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MapEditStyles } from "../../common/StylingCommon.ts";
import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "../../routes/MapEdit.tsx";
import { Node } from "database";
import ZoomControls from "../map/ZoomControls.tsx";
import Tooltip from "@mui/material/Tooltip";
import { Zoom } from "@mui/material";
import { useToast } from "../useToast.tsx";

export type EdgeCoordinates = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  edgeID: string;
};

const MapEditImage = (props: {
  startEdgeNodeID: string | undefined;
  activeFloor: number;
  onNodeClick: (nodeID: string) => void;
  onEdgeClick: (edgeID: string) => void;
  onMapClick: (event: React.MouseEvent<SVGSVGElement>) => void;
  updateNode: (field: keyof Node, value: string | number) => void;
}) => {
  const [edgeCoords, setEdgeCoords] = useState<EdgeCoordinates[]>([]);

  const selectedNodeID = useContext(MapContext).selectedNodeID;
  const setSelectedNodeID = useContext(MapContext).setSelectedNodeID;

  // const selectedEdgeID = useContext(MapContext).selectedEdgeID;
  const setSelectedEdgeID = useContext(MapContext).setSelectedEdgeID;
  const selectedAction = useContext(MapContext).selectedAction;

  const [flickeringNode, setFlickeringNode] = useState<string | null>(null);

  const nodes = useContext(MapContext).nodes;
  // const setNodes = useContext(MapContext).setNodes;
  const edges = useContext(MapContext).edges;
  const [draggablePosition, setDraggablePosition] = useState({
    x: 0,
    y: 0,
    active: false,
    offset: { x: 0, y: 0 },
  });

  const { showToast } = useToast();

  useEffect(() => {
    const tempCoords: EdgeCoordinates[] = [];

    for (const edge of edges.values()) {
      const startNode = nodes.get(edge.startNodeID);
      const endNode = nodes.get(edge.endNodeID);

      if (startNode && endNode) {
        tempCoords.push({
          startX: startNode.xcoord,
          startY: startNode.ycoord,
          endX: endNode.xcoord,
          endY: endNode.ycoord,
          edgeID: edge.edgeID,
        });
      }
    }

    setEdgeCoords(tempCoords);
  }, [edges, nodes]);

  // Determines which map to load depending on floor prop.
  let map;
  switch (props.activeFloor) {
    case -2:
      map = lowerLevel2;
      break;
    case -1:
      map = lowerLevel1;
      break;
    case 1:
      map = firstFloor;
      break;
    case 2:
      map = secondFloor;
      break;
    case 3:
      map = thirdFloor;
      break;
  }

  // This stops the map event handler from being called
  // Separates node clicks from map clicks
  function nodeClicked(
    event: React.MouseEvent<SVGCircleElement>,
    nodeID: string,
  ) {
    event.stopPropagation();
    props.onNodeClick(nodeID);
    setSelectedNodeID(nodeID);

    if (flickeringNode === nodeID) {
      setFlickeringNode(null);
    } else {
      setFlickeringNode(nodeID);
    }
  }

  function handleEdgeClick(
    event: React.MouseEvent<SVGLineElement>,
    edgeID: string,
  ) {
    event.stopPropagation();
    props.onEdgeClick(edgeID);
    setSelectedEdgeID(edgeID);
    //now need to "derender the edge"
  }

  function handlePointerDown(
    e:
      | React.PointerEvent<SVGCircleElement>
      | React.PointerEvent<SVGLineElement>,
    ID: string,
  ) {
    const el = e.currentTarget;
    const bbox = e.currentTarget.getBoundingClientRect();
    const xOffset = e.clientX - bbox.left;
    const yOffset = e.clientY - bbox.top;
    if (ID.includes("_")) {
      //handle edge logic in here
      setSelectedEdgeID(ID);
    } else {
      setSelectedNodeID(ID);
      setDraggablePosition({
        ...draggablePosition,
        x: nodes.get(ID)!.xcoord,
        y: nodes.get(ID)!.ycoord,
        active: true,
        offset: {
          x: xOffset,
          y: yOffset,
        },
      });
    }

    el.setPointerCapture(e.pointerId);
  }

  // Update/create node in nodes useState
  // function updateNode(nodeID: string, node: Node) {
  //   const newNodes: Map<string, Node> = new Map(nodes);
  //   newNodes.set(node.nodeID, node);
  //   setNodes(newNodes);
  // }

  function handlePointerMove(
    e: React.PointerEvent<SVGCircleElement>,
    nodeID: string,
  ) {
    const bbox = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - bbox.left;
    const mouseY = e.clientY - bbox.top;

    if (draggablePosition.active && selectedAction.toString() == "MoveNode") {
      const updatedNode: Node = nodes.get(nodeID)!;
      if (updatedNode.nodeType == "ELEV" || updatedNode.nodeType == "STAI") {
        showToast("This node cannot be modified!", "warning");
        return;
      }
      updatedNode.xcoord = Math.round(
        updatedNode.xcoord + (mouseX - draggablePosition.offset.x),
      );
      updatedNode.ycoord = Math.round(
        updatedNode.ycoord + (mouseY - draggablePosition.offset.y),
      );

      props.updateNode("xcoord", updatedNode.xcoord);
      props.updateNode("ycoord", updatedNode.ycoord);
    }
  }

  return (
    //onClick={props.onMapClick}
    <div
      className={`z-0 relative ${selectedAction.toString() == "CreateEdge" ? "cursor-copy" : ""}${selectedAction.toString() == "CreateNode" ? "cursor-copy" : ""} ${selectedAction.toString() == "MoveNode" ? "cursor-move" : ""}
      `}
    >
      {/*  White Fade */}
      <div
        className={"z-10"}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "12%", // Adjust the width of the overlay as needed
          height: "100%",
          background:
            "linear-gradient(to left, rgba(234,234,234,0) 0%, rgba(234,234,234,1) 100%)",
          pointerEvents: "none", // Ensures the overlay doesn't intercept mouse events
        }}
      ></div>
      <div>
        <TransformWrapper
          initialScale={1}
          doubleClick={{ disabled: true }}
          panning={{
            velocityDisabled: true,
            disabled: draggablePosition.active,
          }}
        >
          <div className="absolute bottom-[31%] right-[1.5%] z-10">
            <ZoomControls />
          </div>
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%", paddingLeft: "3%" }}
            contentStyle={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox="0 0 5000 3400"
              height="100vh"
              onPointerUp={() => {
                setDraggablePosition({ ...draggablePosition, active: false });
              }}
              onClick={props.onMapClick}
            >
              <image href={map} />
              {edgeCoords.map((edge, index) => (
                <line
                  key={index}
                  className="edge"
                  x1={edge.startX}
                  x2={edge.endX}
                  y1={edge.startY}
                  y2={edge.endY}
                  stroke={MapEditStyles.edgeColor}
                  strokeWidth={MapEditStyles.edgeWidth}
                  onClick={(e) => handleEdgeClick(e, edge.edgeID)}
                  onPointerDown={(e) => handlePointerDown(e, edge.edgeID)}
                  style={{
                    cursor: `${selectedAction.toString() == "DeleteNode" ? "pointer" : ""}`,
                  }}
                />
              ))}
              {Array.from(nodes.values()).map((node) => (
                <Tooltip
                  TransitionComponent={Zoom}
                  title={node.shortName}
                  placement="bottom"
                  arrow
                >
                  <circle
                    key={node.nodeID}
                    className={`node ${selectedNodeID === node.nodeID ? "animate-pulse" : ""}`}
                    r={
                      node.nodeType == "HALL"
                        ? MapEditStyles.hallRadius
                        : MapEditStyles.nodeRadius
                    }
                    cx={node.xcoord}
                    cy={node.ycoord}
                    onPointerDown={(e) => handlePointerDown(e, node.nodeID)}
                    onPointerMove={(e) => handlePointerMove(e, node.nodeID)}
                    fill={
                      selectedNodeID == node.nodeID
                        ? MapEditStyles.nodeSelectedColor
                        : node.nodeType == "HALL"
                          ? MapEditStyles.hallColor
                          : MapEditStyles.nodeColor
                    }
                    onClick={(e) => nodeClicked(e, node.nodeID)}
                    style={{ cursor: "pointer" }}
                  />
                </Tooltip>
              ))}
              //This is rendering the line between the cursor and startNode
              {props.startEdgeNodeID && (
                <line
                  x1={nodes.get(props.startEdgeNodeID)!.xcoord}
                  y1={nodes.get(props.startEdgeNodeID)!.ycoord}
                  x2={draggablePosition.x}
                  y2={draggablePosition.y}
                  stroke="red"
                  strokeWidth="2"
                  style={{ cursor: "pointer" }}
                />
              )}
            </svg>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};

export default MapEditImage;
