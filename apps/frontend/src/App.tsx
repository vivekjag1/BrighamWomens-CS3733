import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import ExampleRoute from "./routes/ExampleRoute.tsx";
import MedicineRequest from "./routes/MedicineRequest.tsx";
import Login from "./routes/Login.tsx";
import Layout from "./routes/Layout.tsx";
import Home from "./routes/Home.tsx";
import Services from "./routes/Services.tsx";
import MedicineConfirmation from "./routes/MedicineConfirmation.tsx";
import ServiceTable from "./routes/ServiceTable.tsx";
import NodeTable from "./routes/NodeTable.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/home/services",
          element: <Services />,
        },
        {
          path: "/home/services/medicine",
          element: <MedicineRequest />,
        },
        {
          path: "/home/services/medicine/confirmation",
          element: <MedicineConfirmation />,
        },
        {
          path: "/home/services/data",
          element: <ServiceTable />,
        },
        {
          path: "/home/data",
          element: <NodeTable />,
        },
      ],
    },
    {
      path: "/example",
      element: <Root />,
      children: [
        {
          path: "",
          element: <ExampleRoute />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
  function Root() {
    return (
      <div className="w-full flex flex-col px-20 gap-5">
        <h1>Welcome to your starter code.</h1>
        <Outlet />
      </div>
    );
  }
}

export default App;
