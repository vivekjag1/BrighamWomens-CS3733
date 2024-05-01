import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { ToastProvider } from "./components/ToastProvider.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./ErrorFallback.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Auth0Provider
    useRefreshTokens
    cacheLocation="localstorage"
    domain="dev-7eoh0ojk0tkfhypo.us.auth0.com"
    clientId="U8XpuA4s1L8lmd1avUIOupo1494YlppB"
    authorizationParams={{
      redirect_uri: `${window.location.origin}/home`,
    }}
  >
    <ErrorBoundary FallbackComponent={ErrorFallBack}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ErrorBoundary>
  </Auth0Provider>,
);
