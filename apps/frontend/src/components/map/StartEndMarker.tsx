import { motion } from "framer-motion";

interface startEndMarkerProps {
  x: number;
  y: number;
  color: string;
}

function StartEndMarker(props: startEndMarkerProps) {
  return (
    <g key={`${props.x}-${props.y}`}>
      <motion.circle
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        cx={props.x}
        cy={props.y}
        r={15}
        fill="white"
        strokeWidth={5}
        stroke={props.color}
      />
      <svg viewBox="0 0 1250 1425" x={props.x + xOffset} y={props.y + yOffset}>
        <motion.g
          initial={{ skewX: -153, rotateZ: -20, rotateX: 4, rotateY: 50 }}
          animate={{ translateX: [0, 0.5, -2, 0], translateY: [0, 0.5, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <path
            fill={props.color}
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5"
          ></path>
        </motion.g>
      </svg>
    </g>
  );
}

const xOffset: number = -141;
const yOffset: number = -165;

export default StartEndMarker;
