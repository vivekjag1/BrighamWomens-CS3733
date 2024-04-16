// import { Auth0Provider } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
/*import NavBar from "../archive/NavBar.tsx";*/
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Layout() {
  const navigate = useNavigate();
  const [nextPage, setNextPage] = useState("");
  return (
    <Auth0Provider
      useRefreshTokens
      cacheLocation="localstorage"
      domain="dev-7eoh0ojk0tkfhypo.us.auth0.com"
      clientId="U8XpuA4s1L8lmd1avUIOupo1494YlppB"
      authorizationParams={{
        redirect_uri: window.location.origin + "/home",
        audience: "/api",
        scope: "openid profile email offline_access",
      }}
      onRedirectCallback={(appState) => {
        const nextPage = appState?.returnTo || window.location.origin;
        navigate(appState?.returnTo || window.location.origin);
        setNextPage(nextPage);
      }}
    >
      <div className="w-screen h-screen flex">
        <NavBar currentPage={nextPage} />
        <main className="grow">
          <Outlet />
        </main>
      </div>
    </Auth0Provider>
  );
}

export default Layout;
