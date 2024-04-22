import MapPhoto from "./MapPhoto.tsx";
import "./styles/MapPhotoStyles.css";

function Wayfinder() {
  const activeFloors: number[] = [-2, -1, 1, 2, 3];

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="map absolute top-[-20%]">
        <MapPhoto activeFloor={activeFloors[4]} />
      </div>
      <div className="map absolute top-[-4%]">
        <MapPhoto activeFloor={activeFloors[3]} />
      </div>
      <div className="map absolute top-[11%]">
        <MapPhoto activeFloor={activeFloors[2]} />
      </div>
      <div className="map absolute top-[26%]">
        <MapPhoto activeFloor={activeFloors[1]} />
      </div>
      <div className="map absolute top-[41%]">
        <MapPhoto activeFloor={activeFloors[0]} />
      </div>
    </div>
  );
}

export default Wayfinder;
