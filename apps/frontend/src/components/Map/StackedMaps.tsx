import MapPhoto from "./MapPhoto.tsx";
import "./styles/MapPhotoStyles.css";
import "../../styles/animatedUnderline.css";

interface StackedMapsProps {
  onClick: (floor: number) => void;
}

function StackedMaps(props: StackedMapsProps) {
  return (
    <div>
      <div className="flex flex-col items-center h-screen">
        <div
          className="map absolute top-[-20%] z-10 drop-shadow-[10px_10px_0px_#000000] cursor-pointer"
          onClick={() => props.onClick(3)}
        >
          <MapPhoto activeFloor={3} />
        </div>
        <div
          className="map absolute top-[-4%] z-20 drop-shadow-[10px_10px_0px_#000000] cursor-pointer"
          onClick={() => props.onClick(2)}
        >
          <MapPhoto activeFloor={2} />
        </div>
        <div
          className="map absolute top-[11%] z-30 drop-shadow-[10px_10px_0px_#000000] cursor-pointer"
          onClick={() => props.onClick(1)}
        >
          <MapPhoto activeFloor={1} />
        </div>
        <div
          className="map absolute top-[26%] z-40 drop-shadow-[10px_10px_0px_#000000] cursor-pointer"
          onClick={() => props.onClick(-1)}
        >
          <MapPhoto activeFloor={-1} />
        </div>
        <div
          className="map absolute top-[41%] z-50 drop-shadow-[10px_10px_0px_#000000] cursor-pointer"
          onClick={() => props.onClick(-2)}
        >
          <MapPhoto activeFloor={-2} />
        </div>
      </div>
      <div className="absolute left-[93%] top-0 h-screen flex flex-col justify-center items-center gap-[10%] text-[1.25vw] font-bold text-secondary">
        <label
          className="relative top-[-10%] cursor-pointer animatedUnderline"
          onClick={() => props.onClick(3)}
        >
          3
        </label>
        <label
          className="relative top-[-6%] cursor-pointer"
          onClick={() => props.onClick(2)}
        >
          2
        </label>
        <label
          className="relative top-[-4%] cursor-pointer"
          onClick={() => props.onClick(1)}
        >
          1
        </label>
        <label
          className="relative top-[-2%] cursor-pointer"
          onClick={() => props.onClick(-1)}
        >
          Lower 1
        </label>
        <label
          className="relative top-[0%] cursor-pointer"
          onClick={() => props.onClick(-2)}
        >
          Lower 2
        </label>
      </div>
    </div>
  );
}

export default StackedMaps;
