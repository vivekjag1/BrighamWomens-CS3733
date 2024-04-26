import { motion } from "framer-motion";
import { DesignSystem } from "../../common/StylingCommon.ts";

interface DashedPolylineProps {
  points: string;
  width: number;
}

function DashedPolyline(props: DashedPolylineProps) {
  return (
    <motion.polyline
      points={props.points}
      fill="none"
      stroke={DesignSystem.primaryColor}
      strokeWidth={props.width}
      strokeDasharray={25}
      initial={{ strokeDashoffset: 25 }}
      animate={{ strokeDashoffset: [25, -25] }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 0.8,
        ease: "linear",
      }}
    />
  );
}

export default DashedPolyline;
