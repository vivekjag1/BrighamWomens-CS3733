import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
