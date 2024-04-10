// import { Auth0Provider } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import SideNavBar from "../archive/SideNavBarV1.tsx";

function Layout() {
  return (
    <div className="w-screen h-screen flex">
      <SideNavBar />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
