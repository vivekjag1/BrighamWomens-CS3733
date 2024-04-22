import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import paths from "./common/paths.tsx";
import routes from "./common/routes.tsx";
import Layout from "./components/Layout.tsx";
import Hero from "./routes/Hero.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: paths.HERO,
      element: <Hero />,
    },
    {
      path: paths.HOME,
      element: <Layout />,
      children: routes,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
