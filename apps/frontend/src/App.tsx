import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./routes/Login.tsx";
import Layout from "./routes/Layout.tsx";
import paths from "./paths/paths.tsx";
import routes from "./paths/mappings.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: paths.LOGIN,
      element: <Login />,
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
