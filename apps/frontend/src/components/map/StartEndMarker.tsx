import { motion } from "framer-motion";

interface startEndMarkerProps {
  x: number;
  y: number;
  color: string;
}

function StartEndMarker(props: startEndMarkerProps) {
  return (
    <svg viewBox="0 0 1250 1425" x={props.x + xOffset} y={props.y + yOffset}>
      <motion.g
        animate={{
          skewX: -153,
          rotateZ: -20,
          rotateX: 4,
          rotateY: 50,
          scaleX: 0.9,
        }}
      >
        <motion.path
          fill={props.color}
          stroke="black"
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5"
        ></motion.path>
        <motion.circle cx={12} cy={9} fill="black" r={2.25}></motion.circle>
      </motion.g>
    </svg>
  );
}

const xOffset: number = -132;
const yOffset: number = -165;

export default StartEndMarker;
