import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { Auth0Provider } from "@auth0/auth0-react";

import Layout from "./components/Layout.tsx";
import paths from "./paths/paths.tsx";
import routes from "./paths/mappings.tsx";
import AuthZeroLogin from "./routes/Login.tsx";

function App() {
  // const navigate = useNavigate();
  const router = createBrowserRouter([
    {
      path: paths.LOGIN,
      element: <AuthZeroLogin />,
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
