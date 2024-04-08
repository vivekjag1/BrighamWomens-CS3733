import { Link } from "react-router-dom";
import paths from "../paths/paths.tsx";

/* The following component is a temporary navigation bar. Its structure should be maintained. */
function SideNavBar() {
  return (
    /* Width attribute below is used to adjust the width of the navigation bar*/
    <div className="w-[5%]">
      <div className="h-screen text-center text-white bg-secondary">
        Insert Logo
        <div>
          <ul>
            <Link to={paths.HOME}>
              <li>Map</li>
            </Link>
            <Link to={paths.SERVICES}>
              <li>Services</li>
            </Link>
            <Link to={paths.MAP_DATA}>
              <li>NodeData</li>
            </Link>
            <Link to={paths.SERVICES_DATA}>
              <li>MapData</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideNavBar;
