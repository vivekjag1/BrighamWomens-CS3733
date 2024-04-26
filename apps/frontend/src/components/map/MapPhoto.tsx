import lowerLevel2 from "../../../assets/maps/00_thelowerlevel2.png";
import lowerLevel1 from "../../../assets/maps/00_thelowerlevel1.png";
import firstFloor from "../../../assets/maps/01_thefirstfloor.png";
import secondFloor from "../../../assets/maps/02_thesecondfloor.png";
import thirdFloor from "../../../assets/maps/03_thethirdfloor.png";

interface MapProps {
  activeFloor: number;
}

function MapPhoto(props: MapProps) {
  const map = determineMap(props.activeFloor);
  return (
    <svg viewBox="0 0 5000 3400" height="72vh">
      <image href={map} />
    </svg>
  );
}

function determineMap(floor: number) {
  switch (floor) {
    case -2:
      return lowerLevel2;
    case -1:
      return lowerLevel1;
    case 1:
      return firstFloor;
    case 2:
      return secondFloor;
    case 3:
      return thirdFloor;
    default:
      return firstFloor;
  }
}
export default MapPhoto;
