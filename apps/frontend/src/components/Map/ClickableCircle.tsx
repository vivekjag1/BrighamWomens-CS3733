import { MapStyling } from "../../common/StylingCommon";

interface ClickableCircleProps {
  x: string;
  y: string;
}
function ClickableCircle(props: ClickableCircleProps) {
  return (
    <circle
      r={MapStyling.nodeRadius}
      cx={props.x}
      cy={props.y}
      fill={MapStyling.clickableNodeColor}
    />
  );
}

export default ClickableCircle;
