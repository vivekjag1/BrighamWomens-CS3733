import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
/*import PathTables from "./routes/PathTables.tsx";*/
import Services from "./routes/Services.tsx";
/*import MedicineDeliveryForm from "./routes/MedicineDeliveryForm.tsx";
import MedicalDeviceDeliveryForm from "./routes/MedicalDeviceDeliveryForm.tsx";
import RoomReservation from "./routes/RoomReservation.tsx";
import SanitationForm from "./routes/SanitationForm.tsx";
import SecurityRequest from "./routes/SecurityRequest.tsx";
import ServicesTable from "./routes/ServicesTable.tsx";
import EditMap from "./routes/EditMap.tsx";*/
/*// import AuthComp from "./components/AuthenticationComponent.tsx";*/
import Home from "./routes/Home.tsx";
import Hero from "./routes/Login.tsx";
import paths from "./paths/paths.tsx";
import Layout from "./components/Layout.tsx";
import AuthComp from "./components/AuthenticationComponent.tsx";
function App() {
  const router = createBrowserRouter([
    {
      path: paths.LOGIN,
      element: <Hero />,
    },

    {
      path: paths.HOME,
      element: <Layout />,
      children: [
        {
          path: paths.HOME,
          element: <Home />,
        },
        {
          path: paths.SERVICES,
          element: <AuthComp component={Services} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
