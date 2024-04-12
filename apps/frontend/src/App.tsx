import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PathTables from "./routes/PathTables.tsx";
import Services from "./routes/Services.tsx";
import MedicineDeliveryForm from "./routes/MedicineDeliveryForm.tsx";
import MedicalDeviceDeliveryForm from "./routes/MedicalDeviceDeliveryForm.tsx";
import RoomReservation from "./routes/RoomReservation.tsx";
import SanitationForm from "./routes/SanitationForm.tsx";
import SecurityRequest from "./routes/SecurityRequest.tsx";
import ServicesTable from "./routes/ServicesTable.tsx";
import EditMap from "./routes/EditMap.tsx";
// import AuthComp from "./components/AuthenticationComponent.tsx";
import Home from "./routes/Home.tsx";
import Login from "./routes/Login.tsx";
import paths from "./paths/paths.tsx";
import Layout from "./components/Layout.tsx";
function App() {
  const router = createBrowserRouter([
    {
      path: paths.LOGIN,
      element: <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: paths.HOME,
          element: <Home />,
        },
        {
          path: paths.MAP_DATA,
          element: <PathTables />,
        },
        {
          path: paths.SERVICES,
          element: <Services />,
        },
        {
          path: paths.MEDICINE_REQUEST,
          element: <MedicineDeliveryForm />,
        },
        {
          path: paths.MEDICAL_DEVICE_DELIVERY,

          element: <MedicalDeviceDeliveryForm />,
        },
        {
          path: paths.ROOM_RESERVATION,
          element: <RoomReservation />,
        },
        {
          path: paths.SANITATION_FORM,
          element: <SanitationForm />,
        },
        {
          path: paths.SECURITY_REQUEST,
          element: <SecurityRequest />,
        },
        {
          path: paths.SERVICES_DATA,
          element: <ServicesTable />,
        },
        {
          path: paths.MAP_EDITOR,
          element: <EditMap />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
