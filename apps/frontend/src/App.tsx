import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import paths from "./common/paths";
import routes from "./common/routes";
import Layout from "./components/Layout";
import Hero from "./routes/hero/Hero";
import MobileDirections from "./routes/MobileDirections";
import AboutUs from "./routes/AboutUs";
import Credit from "./routes/Credit";
import NotFound from "./routes/NotFound";
import ErrorFallBack from "./ErrorFallback.tsx";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const router = createBrowserRouter([
    {
      path: paths.HERO,
      element: (
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <Hero />
        </ErrorBoundary>
      ),
    },

    {
      path: "*",
      element: (
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <NotFound />
        </ErrorBoundary>
      ),
    },
    {
      path: paths.HOME,
      element: <Layout />,
      children: routes.map((route) => ({
        ...route,
        element: (
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            {route.element}
          </ErrorBoundary>
        ),
      })),
    },
    {
      path: paths.MOBILE_DIRECTIONS,
      element: (
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <MobileDirections />
        </ErrorBoundary>
      ),
    },
    {
      path: paths.ABOUT,
      element: (
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <AboutUs />
        </ErrorBoundary>
      ),
    },
    {
      path: paths.CREDITS,
      element: (
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <Credit />
        </ErrorBoundary>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
