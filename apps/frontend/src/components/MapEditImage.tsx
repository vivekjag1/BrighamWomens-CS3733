import lowerLevel2 from "../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../assets/maps/03_thethirdfloor.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../styles/Map.css";
import MapZoomButtons from "./MapZoomButtons.tsx";
import { MapStyling } from "../common/StylingCommon.ts";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "../routes/MapEdit.tsx";

export type EdgeCoordinates = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

const MapEditImage = (props: {
  activeFloor: number;
  onNodeClick: (nodeID: string) => void;
  onMapClick: () => void;
}) => {
  const [edgeCoords, setEdgeCoords] = useState<EdgeCoordinates[]>([]);
  const nodes = useContext(MapContext).nodes;
  const edges = useContext(MapContext).edges;

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
    event: React.MouseEvent<SVGCircleElement, MouseEvent>,
    nodeID: string,
  ) {
    event.stopPropagation();
    props.onNodeClick(nodeID);
  }

  return (
    <div
      className="map-container z-0"
      onClick={props.onMapClick}
      style={{ position: "relative" }}
    >
      {/* Map overlay */}
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
        panning={{ velocityDisabled: true }}
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
          <svg viewBox="0 0 5000 3400" height="100vh">
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
                className="node"
                r={MapStyling.nodeRadius}
                cx={node.xcoord}
                cy={node.ycoord}
                fill={MapStyling.nodeColor}
                onClick={(e) => nodeClicked(e, node.nodeID)}
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
