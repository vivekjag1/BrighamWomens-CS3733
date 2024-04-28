import React from "react";
import { motion } from "framer-motion";
import { DesignSystem } from "../../common/StylingCommon.ts";

interface ElevatorPolylineProps {
  points: string;
}

function ElevatorPolyline(props: ElevatorPolylineProps) {
  const pointsArray = props.points
    .trim()
    .split(" ")
    .map((p) => {
      const [x, y] = p.split(",");
      return { x: Number(x), y: Number(y) };
    });

  const positionOffset: number = 50;
  const pointsArray2 = [
    pointsArray[0],
    pointsArray[0],
    pointsArray[1],
    pointsArray[1],
  ];
  const pathLength = pointsArray2.length;
  let keyframesX = pointsArray2.map((p) => p.x - positionOffset);
  let keyframesY = pointsArray2.map((p) => p.y - positionOffset);

  keyframesX = [...keyframesX, ...keyframesX.slice(0, -1).reverse()];
  keyframesY = [...keyframesY, ...keyframesY.slice(0, -1).reverse()];

  return (
    <>
      <motion.polyline
        points={props.points}
        fill="none"
        stroke={DesignSystem.primaryColor}
        strokeWidth={10}
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
      <motion.polygon
        fill="#012D5A"
        points="0,50 50,0 100,50 50,100"
        initial={{
          x: pointsArray[0]?.x - positionOffset,
          y: pointsArray[0]?.y - positionOffset,
        }}
        animate={{ x: keyframesX, y: keyframesY }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 5 * pathLength * 0.4,
          ease: "linear",
          repeatDelay: 0,
        }}
      />
    </>
  );
}

export default ElevatorPolyline;
