import MapPhoto from "./MapPhoto.tsx";

function Wayfinder() {
  const activeFloors: number[] = [-2, -1, 1, 2, 3];

  return (
    <div className="h-screen flex flex-col items-center">
      <div>
        <MapPhoto activeFloor={activeFloors[4]} />
      </div>
      <div>
        <MapPhoto activeFloor={activeFloors[3]} />
      </div>
      <div>
        <MapPhoto activeFloor={activeFloors[2]} />
      </div>
      <div>
        <MapPhoto activeFloor={activeFloors[1]} />
      </div>
      <div>
        <MapPhoto activeFloor={activeFloors[0]} />
      </div>
    </div>
  );
}

export default Wayfinder;
