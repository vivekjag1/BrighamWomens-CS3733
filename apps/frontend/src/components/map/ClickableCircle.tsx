import { MapStyles } from "../../common/StylingCommon";
import Tooltip from "@mui/material/Tooltip";

interface ClickableCircleProps {
  x: number;
  y: number;
  id: string;
  onClick: (nodeID: string) => void;
  title: string;
}
function ClickableCircle(props: ClickableCircleProps) {
  return (
    <>
      <Tooltip title={props.title} placement="top" arrow>
        <circle
          r={MapStyles.nodeRadius}
          cx={props.x}
          cy={props.y}
          fill={MapStyles.nodeColor}
          onClick={() => props.onClick(props.id)}
          className="cursor-pointer"
        />
      </Tooltip>
    </>
  );
}

export default ClickableCircle;
