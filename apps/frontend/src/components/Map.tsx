import lowerLevel2 from "../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../assets/maps/03_thethirdfloor.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../styles/Map.css";
function Map(props: { floor: number; coords: number[][] }) {
  // Determines instructions for drawing path on map
  const length = props.coords.length;
  const startNode = {
    xCoordinate: props.coords[0][0],
    yCoordinate: props.coords[0][1],
  };

  const endNode = {
    xCoordinate: props.coords[length - 1][0],
    yCoordinate: props.coords[length - 1][1],
  };

  let listOfPoints: string = "";
  console.log(props.floor);
  const filteredCoords = props.coords.filter(
    (value) => value[2] == props.floor,
  );
  console.log(filteredCoords);
  for (let i = 0; i < filteredCoords.length; i++) {
    listOfPoints =
      listOfPoints + filteredCoords[i][0] + "," + filteredCoords[i][1] + " ";
  }

  // Determines which map to load depending on floor prop.
  let map;
  switch (props.floor) {
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
              <polyline
                stroke="blue"
                strokeWidth="5"
                fill="none"
                points={listOfPoints}
              />
              <circle
                r="10"
                cx={startNode.xCoordinate}
                cy={startNode.yCoordinate}
                fill="green"
              />
              <circle
                r="10"
                cx={endNode.xCoordinate}
                cy={endNode.yCoordinate}
                fill="red"
              />
            </svg>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}

export default Map;
