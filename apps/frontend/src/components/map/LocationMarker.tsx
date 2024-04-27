import LocationIcon from "@mui/icons-material/LocationOn";

interface LocationMarkerProps {
  x: number;
  y: number;
  color: string;
}
function LocationMarker(props: LocationMarkerProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="80px"
      x={props.x - 40}
      y={props.y - 1740}
      strokeWidth="1"
    >
      <g>
        <LocationIcon sx={{ fontSize: "3rem", color: props.color }} />
        <animateTransform
          attributeName="transform"
          type="translate"
          begin="0s"
          dur="1s"
          values="0 .5; 0 0; 0 -1; 0 -2; 0 -5; 0 -10; 0 -5; 0 -2; 0 -1; 0 0; 0 .5;"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

export default LocationMarker;
