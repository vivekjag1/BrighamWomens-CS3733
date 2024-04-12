import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      useRefreshTokens
      cacheLocation="localstorage"
      domain="dev-7eoh0ojk0tkfhypo.us.auth0.com"
      clientId="U8XpuA4s1L8lmd1avUIOupo1494YlppB"
      authorizationParams={{
        redirect_uri: window.location.origin,
        //scope: "openid profile email offline_access",
      }}
      // onRedirectCallback={(appState) => {
      //   navigate(appState?.returnTo || window.location.pathname);
      // }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
