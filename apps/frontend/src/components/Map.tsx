import lowerLevel2 from "../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../assets/maps/03_thethirdfloor.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../styles/Map.css";
import LocationIcon from "@mui/icons-material/LocationOn";

function Map(props: { activeFloor: number; nodes: number[][] }) {
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
  getTextualDirections(props.nodes);

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
    (splitPath) => splitPath[0][2] == props.activeFloor,
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
                <>
                  <polyline
                    key={path[0].toString()}
                    stroke="#012D5A"
                    strokeWidth="6"
                    fill="none"
                    points={
                      listOfPolylineStrings[filteredSplitPaths.indexOf(path)]
                    }
                  />
                  <circle
                    r="25"
                    cx={
                      path[0][0] == startNode.xCoordinate &&
                      path[0][1] == startNode.yCoordinate &&
                      path[0][2] == startNode.floor
                        ? -100
                        : path[0][0]
                    }
                    cy={path[0][1]}
                    fill="#012D5A"
                  />
                  <text
                    x={
                      path[0][0] == startNode.xCoordinate &&
                      path[0][1] == startNode.yCoordinate &&
                      path[0][2] == startNode.floor
                        ? -100
                        : path[0][0]
                    }
                    y={path[0][1]}
                    textAnchor="middle"
                    stroke="white"
                    strokeWidth="5"
                    fontSize="2em"
                    dy=".35em"
                  >
                    {getStringFromFloor(
                      props.nodes[
                        Math.max(props.nodes.indexOf(path[0]) - 1, 0)
                      ][2],
                    )}
                  </text>

                  <circle
                    r="25"
                    cx={
                      path[path.length - 1][0] == endNode.xCoordinate &&
                      path[path.length - 1][1] == endNode.yCoordinate &&
                      path[path.length - 1][2] == endNode.floor
                        ? -100
                        : path[path.length - 1][0]
                    }
                    cy={path[path.length - 1][1]}
                    fill="#012D5A"
                  />
                  <text
                    x={
                      path[path.length - 1][0] == endNode.xCoordinate &&
                      path[path.length - 1][1] == endNode.yCoordinate &&
                      path[path.length - 1][2] == endNode.floor
                        ? -100
                        : path[path.length - 1][0]
                    }
                    y={path[path.length - 1][1]}
                    textAnchor="middle"
                    stroke="white"
                    strokeWidth="5"
                    fontSize="2em"
                    dy=".35em"
                  >
                    {getStringFromFloor(
                      props.nodes[
                        Math.min(
                          props.nodes.indexOf(path[path.length - 1]) + 1,
                          props.nodes.length - 1,
                        )
                      ][2],
                    )}
                  </text>
                </>
              ))}
              <svg
                width="100px"
                x={startNode.xCoordinate - 50}
                y={startNode.yCoordinate - 1740}
              >
                {props.activeFloor == startNode.floor && (
                  <LocationIcon sx={{ color: "green" }} />
                )}
              </svg>
              <svg
                width="100px"
                x={endNode.xCoordinate - 50}
                y={endNode.yCoordinate - 1740}
              >
                {props.activeFloor == endNode.floor && (
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

function getStringFromFloor(floor: number): string {
  switch (floor) {
    case -1:
      return "L1";
    case -2:
      return "L2";
    case 1:
    case 2:
    case 3:
    default:
      return floor.toString();
  }
}

function getTextualDirections(path: number[][]) {
  const textualPath: string[] = [];
  textualPath.push("Start at " + path[0]);
  for (let i = 1; i < path.length - 2; i++) {
    const a: number[] = path[i - 1];
    const b: number[] = path[i];
    const c: number[] = path[i + 1];
    const angle = getAngle(a, b, c);
    if (b[2] != c[2]) {
      textualPath.push(
        "Elevator " +
          (Math.sign(c[2] - b[2]) == 1
            ? c[2] - b[2] + " Floors Up"
            : b[2] - c[2] + " Floors Down"),
      );
      i++;
    } else if (angle <= Math.PI && angle > Math.PI - 0.2) {
      if (textualPath[textualPath.length - 1] != "Straight") {
        textualPath.push("Straight");
      }
    } else if (angle < Math.PI && angle > Math.PI / 2 + 0.001) {
      textualPath.push(
        "Slight " + (isRightTurn(a, b, c) ? "Right" : "Left") + " at " + b,
      );
    } else if (angle >= Math.PI / 2 - 0.001 && angle <= Math.PI / 2 + 0.001) {
      textualPath.push(
        "Turn " + (isRightTurn(a, b, c) ? "Right" : "Left") + " at " + b,
      );
    } else if (angle < Math.PI / 2 - 0.001) {
      textualPath.push(
        "Sharp " + (isRightTurn(a, b, c) ? "Right" : "Left") + " at " + b,
      );
    }
  }
  textualPath.push("End at " + path[path.length - 1]);
  console.log(textualPath);
  return textualPath;
}

function getAngle(a: number[], b: number[], c: number[]) {
  const ab = getDistance(a, b);
  const bc = getDistance(b, c);
  const ac = getDistance(a, c);
  return Math.acos(
    (Math.pow(ab, 2) + Math.pow(bc, 2) - Math.pow(ac, 2)) / (2 * ab * bc),
  );
}

function getDistance(a: number[], b: number[]): number {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

function isRightTurn(a: number[], b: number[], c: number[]): boolean {
  //(𝑥2−𝑥1)(𝑦3−𝑦1)−(𝑦2−𝑦1)(𝑥3−𝑥1)
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) > 0;
}
