import { Auth0Provider } from "@auth0/auth0-react";
import { Outlet, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <Auth0Provider
      useRefreshTokens
      cacheLocation="localstorage"
      domain="dev-7eoh0ojk0tkfhypo.us.auth0.com"
      clientId="U8XpuA4s1L8lmd1avUIOupo1494YlppB"
      authorizationParams={{
        redirect_uri: window.location.origin,
        //scope: "openid profile email offline_access",
      }}
      onRedirectCallback={(appState) => {
        navigate(appState?.returnTo || window.location.origin);
      }}
    >
      <div className="w-screen h-screen flex">
        <main className="grow">
          <Outlet />
        </main>
      </div>
    </Auth0Provider>
  );
}

export default Login;
