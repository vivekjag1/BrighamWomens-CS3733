import lowerLevel2 from "../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../assets/maps/03_thethirdfloor.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../styles/Map.css";
import { Node } from "database";
import { EdgeCoordinates } from "../routes/EditMap.tsx";

function MapEditor(props: {
  floor: string;
  nodes: Node[];
  edges: EdgeCoordinates[];
}) {
  // Determines which map to load depending on floor prop.
  let map;
  switch (props.floor) {
    case "L2":
      map = lowerLevel2;
      break;
    case "L1":
      map = lowerLevel1;
      break;
    case "1":
      map = firstFloor;
      break;
    case "2":
      map = secondFloor;
      break;
    case "3":
      map = thirdFloor;
      break;
  }

  return (
    <div>
      <div>
        <TransformWrapper>
          <TransformComponent>
            <svg
              viewBox="0 0 5000 3400"
              width="auto"
              height="98vh"
              className="rounded-xl"
            >
              <image href={map} />
              {props.edges.map((edge) => (
                <line
                  x1={edge.startX}
                  x2={edge.endX}
                  y1={edge.startY}
                  y2={edge.endY}
                  stroke="red"
                  strokeWidth="6"
                />
              ))}
              {props.nodes.map((node) => (
                <circle r="10" cx={node.xcoord} cy={node.ycoord} fill="blue" />
              ))}
            </svg>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}

export default MapEditor;
