import Breadcrumb from "./Breadcrumb.tsx";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { getFloorString } from "../../common/PathUtilities.ts";

interface pathTrailProps {
  floorSequence: number[];
}

function PathTrail(props: pathTrailProps) {
  const floorSequenceElements = props.floorSequence.map((floor, index) => (
    <div className="flex">
      {getFloorString(floor)}
      {index != props.floorSequence.length - 1 ? (
        <div className="ml-2 mr-2">
          <DoubleArrowIcon />
        </div>
      ) : (
        <></>
      )}
    </div>
  ));

  return <Breadcrumb>{floorSequenceElements}</Breadcrumb>;
}

export default PathTrail;
