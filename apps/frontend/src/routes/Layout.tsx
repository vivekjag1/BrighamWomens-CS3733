import { Outlet } from "react-router-dom";
import SideNavBar from "../components/SideNavBar.tsx";

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
//helloWorld
