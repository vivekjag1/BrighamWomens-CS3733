import { Link } from "react-router-dom";
import bwhLogoSemiNakedWhite from "../../assets/bwh-logo-semi-naked-white.svg";
import Paths from "../paths/paths.tsx";
function TopNavBar() {
  return (
    <div>
      <div className="bg-[#013B96] h-[8vh] flex justify-between shadow-xl">
        <div className="flex flex-col justify-center ml-2">
          <img
            className="w-[340px] h-[40px]"
            src={bwhLogoSemiNakedWhite}
            alt="Brigham & Women's Hospital Logo"
          />
        </div>
        <ul className="flex flex-row">
          <Link className="hover:bg-[#0146B1] flex items-center" to={Paths.MAP}>
            <li className="w-24 text-center text-white text-base font-bold mx-4">
              Home
            </li>
          </Link>
          <Link
            className="hover:bg-[#0146B1] flex items-center"
            to={Paths.SERVICES}
          >
            <li className="w-24 text-center m-auto text-white text-base font-bold mx-4">
              Services
            </li>
          </Link>
          <Link
            className="hover:bg-[#0146B1] flex items-center"
            to={Paths.MAP_DATA}
          >
            <li className="w-24 text-center m-auto text-white text-base font-bold mx-4">
              Map Data
            </li>
          </Link>
          <Link
            className="hover:bg-[#0146B1] flex items-center"
            to={Paths.SERVICES_DATA}
          >
            <li className="w-24 text-center m-auto text-white text-base font-bold mx-4">
              Service Data
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default TopNavBar;
