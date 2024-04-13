// import { Auth0Provider } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import SideNavBarV1 from "./SideNavBarV1.tsx";
/*import SideNavBar from "../archive/SideNavBarV1.tsx";*/

function Layout() {
  return (
    <div className="w-screen h-screen flex">
      <SideNavBarV1 />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
