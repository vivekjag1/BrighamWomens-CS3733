import lowerLevel1Map from "../../assets/00_thelowerlevel1.png";
import { useEffect, useState } from "react";

function MapEdit(props: { coords: number[][] }) {
  const [startNode, setStartNode] = useState<number[]>(props.coords[0]);
  const [endNode, setEndNode] = useState<number[]>(
    props.coords[props.coords.length - 1],
  );
  const [listOfPoints, setListOfPoints] = useState<string>("0, 0");

  // Called on page re-render
  useEffect(() => {
    const length = props.coords.length;
    setStartNode([props.coords[0][0], props.coords[0][1]]);
    setEndNode([props.coords[length - 1][0], props.coords[length - 1][1]]);

    let pointsList = "";
    for (let i = 0; i < length; i++) {
      pointsList += props.coords[i][0] + "," + props.coords[i][1] + " ";
    }

    setListOfPoints(pointsList);

    console.log(props.coords);
  }, [props, startNode, endNode, listOfPoints]);

  return (
    <div>
      <div className="w-full h-[92vh] overflow-scroll  ">
        <svg width="5000px" height="3400px">
          <image href={lowerLevel1Map} className="map" />
          <polyline
            stroke="blue"
            strokeWidth="5"
            fill="none"
            points={listOfPoints}
          />
          <circle r="10" cx={startNode[0]} cy={startNode[1]} fill="green" />
          <circle r="10" cx={endNode[0]} cy={endNode[1]} fill="red" />
        </svg>
      </div>
    </div>
  );
}

export default MapEdit;
