import lowerLevel2 from "../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../assets/maps/03_thethirdfloor.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../styles/Map.css";
import { Node } from "database";
import { EdgeCoordinates } from "../routes/MapEdit.tsx";
import MapZoomButtons from "./MapZoomButtons.tsx";
import { MapStyling } from "../common/StylingCommon.ts";

function MapEditImage(props: {
  activeFloor: number;
  nodes: Node[];
  edges: EdgeCoordinates[];
  onNodeClick: (node: Node) => void;
  onMapClick: () => void;
}) {
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
  function handleNodeClick(
    event: React.MouseEvent<SVGCircleElement, MouseEvent>,
    node: Node,
  ) {
    event.stopPropagation();
    props.onNodeClick(node);
  }

  return (
    <div className="map-container" onClick={props.onMapClick}>
      <div>
        <TransformWrapper>
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
              {props.edges.map((edge, index) => (
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
              {props.nodes.map((node, index) => (
                <circle
                  key={index}
                  className="node"
                  r={MapStyling.nodeRadius}
                  cx={node.xcoord}
                  cy={node.ycoord}
                  fill={MapStyling.nodeColor}
                  onClick={(e) => handleNodeClick(e, node)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </svg>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}

export default MapEditImage;
