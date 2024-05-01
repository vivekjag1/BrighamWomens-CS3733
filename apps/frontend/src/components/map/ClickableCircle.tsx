import Tooltip from "@mui/material/Tooltip";
import { MapStyles } from "../../common/StylingCommon";

interface ClickableCircleProps {
  x: number;
  y: number;
  name: string;
  id: string;
  onClick: (nodeID: string) => void;
}
function ClickableCircle(props: ClickableCircleProps) {
  return (
    <Tooltip title={props.name} placement="top" arrow>
      <circle
        r={MapStyles.nodeRadius}
        cx={props.x}
        cy={props.y}
        fill={MapStyles.nodeColor}
        onClick={() => props.onClick(props.id)}
        className="cursor-pointer"
      />
    </Tooltip>
  );
}

export default ClickableCircle;
