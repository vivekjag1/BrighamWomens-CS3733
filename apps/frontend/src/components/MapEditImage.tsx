import lowerLevel2 from "../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../assets/maps/03_thethirdfloor.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import MapZoomButtons from "./MapZoomButtons.tsx";
import { MapStyling } from "../common/StylingCommon.ts";
import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "../routes/MapEdit.tsx";
import { Node } from "database";

export type EdgeCoordinates = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

const MapEditImage = (props: {
  addingNode: boolean;
  activeFloor: number;
  onNodeClick: (nodeID: string) => void;
  onMapClick: (event: React.MouseEvent<SVGSVGElement>) => void;
}) => {
  const [edgeCoords, setEdgeCoords] = useState<EdgeCoordinates[]>([]);
  const tempNodes = useContext(MapContext).nodes;
  const [flickeringNode, setFlickeringNode] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  //console.log(tempNodes);
  const [nodeColors, setNodeColors] = useState<Map<string, string>>(new Map());
  const [nodeRadii, setNodeRadii] = useState(new Map());
  // eslint-disable-next-line prefer-const
  let [nodes, setNodes] = useState<Map<string, Node>>(new Map<string, Node>());
  const edges = useContext(MapContext).edges;
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    active: false,
    offset: { x: 0, y: 0 },
  });

  // const selectedNodeID = useContext(MapContext).selectedNodeID;

  useEffect(() => {
    const initialColors = new Map();
    tempNodes.forEach((node, nodeID) => {
      initialColors.set(nodeID, MapStyling.nodeColor);
    });
    setNodeColors(initialColors);
  }, [tempNodes]);

  useEffect(() => {
    const initialRadii = new Map();
    tempNodes.forEach((node, nodeID) => {
      initialRadii.set(nodeID, MapStyling.nodeRadius);
    });
    setNodeRadii(initialRadii);
  }, [tempNodes]);
  useEffect(() => {
    setNodes(tempNodes);
    const initialRadii = new Map();
    tempNodes.forEach((node, nodeID) => {
      initialRadii.set(nodeID, MapStyling.nodeRadius);
    });
  }, [tempNodes]);

  useEffect(() => {
    setNodes(tempNodes);
  }, [tempNodes]);

  useEffect(() => {
    const tempCoords: EdgeCoordinates[] = [];
    for (let i = 0; i < edges.length; i++) {
      const startNode = nodes.get(edges[i].startNodeID);
      const endNode = nodes.get(edges[i].endNodeID);

      if (startNode && endNode) {
        tempCoords.push({
          startX: parseInt(startNode.xcoord),
          startY: parseInt(startNode.ycoord),
          endX: parseInt(endNode.xcoord),
          endY: parseInt(endNode.ycoord),
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
    setSelectedNodeId(nodeID);

    if (flickeringNode === nodeID) {
      setFlickeringNode(null);
    } else {
      setFlickeringNode(nodeID);
    }
  }
  function handleMouseEnter(nodeID: string) {
    setNodeRadii((prevRadii) =>
      new Map(prevRadii).set(nodeID, MapStyling.nodeRadius * 1.8),
    );
    setNodeColors((prevColors) => new Map(prevColors).set(nodeID, "red"));
  }

  function handleMouseLeave(nodeID: string) {
    setNodeRadii((prevRadii) =>
      new Map(prevRadii).set(nodeID, MapStyling.nodeRadius),
    );
    setNodeColors((prevColors) =>
      new Map(prevColors).set(nodeID, MapStyling.nodeColor),
    ); // Reset color on mouse leave
  }
  function handlePointerDown(
    e: React.PointerEvent<SVGCircleElement>,
    nodeID: string,
  ) {
    const el = e.currentTarget;
    const bbox = e.currentTarget.getBoundingClientRect();
    const xOffset = e.clientX - bbox.left;
    const yOffset = e.clientY - bbox.top;
    setPosition({
      ...position,
      x: parseInt(nodes.get(nodeID)!.xcoord),
      y: parseInt(nodes.get(nodeID)!.ycoord),
      active: true,
      offset: {
        x: xOffset,
        y: yOffset,
      },
    });
    el.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(
    e: React.PointerEvent<SVGCircleElement>,
    nodeID: string,
  ) {
    const bbox = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    if (position.active) {
      const updatedNode: Node = nodes.get(nodeID)!;
      updatedNode.xcoord = Math.round(
        parseFloat(updatedNode.xcoord) + (x - position.offset.x),
      ).toString();
      updatedNode.ycoord = Math.round(
        parseFloat(updatedNode.ycoord) + (y - position.offset.y),
      ).toString();
      setNodes(() => (nodes = new Map(nodes.set(nodeID, updatedNode))));
    }
  }

  return (
    //onClick={props.onMapClick}
    <div className={`z-0 relative ${props.addingNode ? "cursor-copy" : ""}`}>
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
      <TransformWrapper
        initialScale={1}
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: true, disabled: position.active }}
      >
        <MapZoomButtons />
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
              setPosition({ ...position, active: false });
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
                stroke={MapStyling.edgeColor}
                strokeWidth={MapStyling.edgeWidth}
              />
            ))}
            {Array.from(nodes.values()).map((node) => (
              <circle
                key={node.nodeID}
                className={`node ${flickeringNode === node.nodeID ? "flickering" : ""}`}
                r={nodeRadii.get(node.nodeID) || MapStyling.nodeRadius}
                cx={node.xcoord}
                cy={node.ycoord}
                onMouseEnter={() => handleMouseEnter(node.nodeID)}
                onMouseLeave={() => handleMouseLeave(node.nodeID)}
                onPointerDown={(e: React.PointerEvent<SVGCircleElement>) =>
                  handlePointerDown(e, node.nodeID)
                }
                onPointerMove={(e: React.PointerEvent<SVGCircleElement>) =>
                  handlePointerMove(e, node.nodeID)
                }
                fill={
                  node.nodeID === selectedNodeId
                    ? "red"
                    : nodeColors.get(node.nodeID) || MapStyling.nodeColor
                }
                onClick={(e: React.MouseEvent<SVGCircleElement>) =>
                  nodeClicked(e, node.nodeID)
                }
                style={{ cursor: "pointer" }}
              />
            ))}
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default MapEditImage;
