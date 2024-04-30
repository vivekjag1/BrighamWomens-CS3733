import Breadcrumb from "./Breadcrumb.tsx";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { getFloorString } from "../../common/PathUtilities.ts";
import { DesignSystem } from "../../common/StylingCommon.ts";

interface pathTrailProps {
  activeFloor: number;
  floorSequence: number[];
  onClick: (x: number) => void;
  updateGlowSequence: (x: number) => void;
}

function PathBreadcrumb(props: pathTrailProps) {
  const floorSequenceElements = props.floorSequence.map((floor, index) => (
    <>
      <button
        onClick={() => {
          props.onClick(floor);
          props.updateGlowSequence(floor);
        }}
        className={`rounded-lg transition duration-20 ease-in-out transform active:scale-75 hover:scale-125 ${props.activeFloor == floor ? `scale-125` : ``}`}
      >
        {getFloorString(floor)}
      </button>
      {index != props.floorSequence.length - 1 && (
        <DoubleArrowIcon sx={iconStyles} />
      )}
    </>
  ));

  return <Breadcrumb>{floorSequenceElements}</Breadcrumb>;
}

const iconStyles = {
  color: DesignSystem.primaryColor,
} as const;
export default PathBreadcrumb;
