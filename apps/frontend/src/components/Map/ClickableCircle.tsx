import { MapStyling } from "../../common/StylingCommon";

interface ClickableCircleProps {
  x: string;
  y: string;
  id: string;
  onClick: (nodeID: string) => void;
}
function ClickableCircle(props: ClickableCircleProps) {
  return (
    <circle
      r={MapStyling.nodeRadius}
      cx={props.x}
      cy={props.y}
      fill={MapStyling.clickableNodeColor}
      onClick={() => props.onClick(props.id)}
    />
  );
}

export default ClickableCircle;
