import lowerLevel1Map from "../../assets/00_thelowerlevel1.png";

function Map(props: { nodes: { xCoordinate: number; yCoordinate: number }[] }) {
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
            stroke="red"
            strokeWidth="5"
            fill="none"
            points={listOfPoints}
          />
        </svg>
      </div>
    </div>
  );
}

export default Map;
