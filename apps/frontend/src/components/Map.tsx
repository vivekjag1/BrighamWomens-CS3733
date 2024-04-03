import lowerLevel1Map from "../../assets/00_thelowerlevel1.png";

function Map(props: { nodes: { xCoordinate: number; yCoordinate: number }[] }) {
  const startNode: { xCoordinate: number; yCoordinate: number } = {
    xCoordinate: props.nodes[0].xCoordinate,
    yCoordinate: props.nodes[0].yCoordinate,
  };

  const length = props.nodes.length;
  const endNode: { xCoordinate: number; yCoordinate: number } = {
    xCoordinate: props.nodes[length - 1].xCoordinate,
    yCoordinate: props.nodes[length - 1].yCoordinate,
  };

  let listOfPoints = "";
  for (const node of props.nodes) {
    listOfPoints =
      listOfPoints + node.xCoordinate + "," + node.yCoordinate + " ";
  }

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
      </div>
    </div>
  );
}

export default Map;
