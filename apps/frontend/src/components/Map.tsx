import lowerLevel2 from "../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../assets/maps/03_thethirdfloor.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../styles/Map.css";
import LocationIcon from "@mui/icons-material/LocationOn";

function Map(props: { activefloor: number; nodes: number[][] }) {
  // Determines which map to load depending on floor prop.
  let map;
  switch (props.activefloor) {
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

  // Determines instructions for drawing starting and ending points on path
  const startNode = {
    xCoordinate: props.nodes[0][0],
    yCoordinate: props.nodes[0][1],
    floor: props.nodes[0][2],
  };

  const length = props.nodes.length;
  const endNode = {
    xCoordinate: props.nodes[length - 1][0],
    yCoordinate: props.nodes[length - 1][1],
    floor: props.nodes[length - 1][2],
  };

  // Determines instructions for drawing path from a start node to end node
  const splitPaths: number[][][] = [];
  let startFloor: number = 0;
  let endFloor: number = 0;
  for (let i = 0; i < length - 1; i++) {
    if (props.nodes[i][2] != props.nodes[i + 1][2]) {
      endFloor = i + 1;
      splitPaths.push(props.nodes.slice(startFloor, endFloor));
      startFloor = i + 1;
    }
  }
  splitPaths.push(props.nodes.slice(startFloor));

  const filteredSplitPaths = splitPaths.filter(
    (splitPath) => splitPath[0][2] == props.activefloor,
  );
  const listOfPolylineStrings: string[] = [];
  for (let i = 0; i < filteredSplitPaths.length; i++) {
    let polylineString = "";
    for (let j = 0; j < filteredSplitPaths[i].length; j++) {
      polylineString +=
        filteredSplitPaths[i][j][0] + "," + filteredSplitPaths[i][j][1] + " ";
    }
    listOfPolylineStrings.push(polylineString);
  }

  return (
    <div>
      <div>
        <TransformWrapper
          initialPositionX={-200}
          initialPositionY={-100}
          initialScale={1.2}
        >
          <TransformComponent>
            <svg
              viewBox="0 0 5000 3400"
              height="98.5vh"
              width="auto"
              className="rounded-xl"
            >
              <image href={map} />
              {filteredSplitPaths.map((path) => (
                <polyline
                  key={path[0].toString()}
                  stroke="red"
                  strokeWidth=".5em"
                  fill="none"
                  points={
                    listOfPolylineStrings[filteredSplitPaths.indexOf(path)]
                  }
                />
              ))}
              <svg
                width="100px"
                x={startNode.xCoordinate - 50}
                y={startNode.yCoordinate - 1740}
                className="drop-shadow"
              >
                {props.activefloor == startNode.floor && (
                  <LocationIcon sx={{ color: "green" }} />
                )}
              </svg>
              <svg
                width="100px"
                x={endNode.xCoordinate - 50}
                y={endNode.yCoordinate - 1740}
              >
                {props.activefloor == endNode.floor && (
                  <LocationIcon sx={{ color: "red" }} />
                )}
              </svg>
            </svg>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}

export default Map;
