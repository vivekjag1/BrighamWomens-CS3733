import { MapStyles } from "../../common/StylingCommon";

interface ClickableCircleProps {
  x: number;
  y: number;
  id: string;
  onClick: (nodeID: string) => void;
}
function ClickableCircle(props: ClickableCircleProps) {
  return (
    <circle
      r={MapStyles.nodeRadius}
      cx={props.x}
      cy={props.y}
      fill={MapStyles.nodeColor}
      onClick={() => props.onClick(props.id)}
      className="cursor-pointer"
    />
  );
}

export default ClickableCircle;
