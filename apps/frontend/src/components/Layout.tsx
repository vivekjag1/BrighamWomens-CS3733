// import { Auth0Provider } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
/*import NavBar from "../archive/NavBar.tsx";*/

function Layout() {
  return (
    <Auth0Provider
      cacheLocation="localstorage"
      domain="dev-7eoh0ojk0tkfhypo.us.auth0.com"
      clientId="U8XpuA4s1L8lmd1avUIOupo1494YlppB"
      authorizationParams={{
        redirect_uri: window.location.origin + "/home",
        audience: "/api",
        scope: "openid profile email offline_access",
      }}
    >
      <div className="w-screen h-screen flex">
        <NavBar />
        <main className="grow">
          <Outlet />
        </main>
      </div>
    </Auth0Provider>
  );
}

export default Layout;
