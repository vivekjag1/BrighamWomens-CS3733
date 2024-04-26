import { DesignSystem } from "../../common/StylingCommon.ts";
import { getFloorNumber } from "../../common/PathUtilities.ts";

interface floorMarkerProps {
  x: number;
  y: number;
  floor: string;
  onClick: (x: number) => void;
  updateGlowSequence: (selectedFloor: number) => void;
}

function FloorMarkers(props: floorMarkerProps) {
  const floor: number = getFloorNumber(props.floor);

  return (
    <g
      className="cursor-pointer"
      onClick={() => {
        props.onClick(floor);
        props.updateGlowSequence(getFloorNumber(props.floor));
      }}
    >
      <circle
        r="25"
        fill={DesignSystem.primaryColor}
        cx={props.x}
        cy={props.y}
      />
      <text
        textAnchor="middle"
        fill="white"
        fontSize="2em"
        fontWeight="bold"
        fontFamily={DesignSystem.fontFamily}
        dy="0.35em"
        x={props.x}
        y={props.y}
      >
        {props.floor}
      </text>
    </g>
  );
}

export default FloorMarkers;
