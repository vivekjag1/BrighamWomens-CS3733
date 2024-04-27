import Breadcrumb from "./Breadcrumb.tsx";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { getFloorString } from "../../common/PathUtilities.ts";
import { DesignSystem } from "../../common/StylingCommon.ts";

interface pathTrailProps {
  floorSequence: number[];
  onClick: (x: number) => void;
}

function PathTrail(props: pathTrailProps) {
  const floorSequenceElements = props.floorSequence.map((floor, index) => (
    <div className="flex">
      <button
        onClick={() => props.onClick(floor)}
        className={`rounded-lg transition duration-20 ease-in-out transform active:scale-75 hover:scale-110 focus:scale-125`}
      >
        {getFloorString(floor)}
      </button>
      {index != props.floorSequence.length - 1 ? (
        <div className="ml-2 mr-2">
          <DoubleArrowIcon sx={iconStyles} />
        </div>
      ) : (
        <></>
      )}
    </div>
  ));

  return <Breadcrumb>{floorSequenceElements}</Breadcrumb>;
}

const iconStyles = {
  color: DesignSystem.primaryColor,
} as const;
export default PathTrail;
