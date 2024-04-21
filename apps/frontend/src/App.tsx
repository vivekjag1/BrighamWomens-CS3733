import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Services from "./routes/Services.tsx";

import Map from "./routes/Map.tsx";
import paths from "./paths/paths.tsx";
import Layout from "./components/Layout.tsx";
import AuthComp from "./components/AuthenticationComponent.tsx";
import MedicineDeliveryForm from "./routes/MedicineDeliveryForm.tsx";
import MedicalDeviceDeliveryForm from "./routes/MedicalDeviceDeliveryForm.tsx";
import SanitationForm from "./routes/SanitationForm.tsx";
import RoomReservation from "./routes/RoomReservation.tsx";
import SecurityRequest from "./routes/SecurityRequest.tsx";
import ServicesTable from "./routes/ServicesTable.tsx";
import GiftDelivery from "./routes/GiftDelivery.tsx";
import MapEdit from "./routes/MapEdit.tsx";
import PathTables from "./routes/MapData.tsx";
import Hero from "./routes/Hero.tsx";
import EmployeeTable from "./routes/EmployeeTable.tsx";
import AboutUs from "./routes/AboutUs.tsx";
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
          element: <Map />,
        },
        {
          path: paths.SERVICES,
          element: <AuthComp component={Services} />,
        },
        {
          path: paths.MEDICINE_REQUEST,
          element: <AuthComp component={MedicineDeliveryForm} />,
        },
        {
          path: paths.MEDICAL_DEVICE_DELIVERY,
          element: <AuthComp component={MedicalDeviceDeliveryForm} />,
        },
        {
          path: paths.SANITATION_FORM,
          element: <AuthComp component={SanitationForm} />,
        },
        {
          path: paths.ROOM_RESERVATION,
          element: <AuthComp component={RoomReservation} />,
        },
        {
          path: paths.SECURITY_REQUEST,
          element: <AuthComp component={SecurityRequest} />,
        },
        {
          path: paths.GIFT_DELIVERY,
          element: <AuthComp component={GiftDelivery} />,
        },
        {
          path: paths.SERVICES_DATA,
          element: <AuthComp component={ServicesTable} />,
        },
        {
          path: paths.MAP_DATA,
          element: <AuthComp component={PathTables} />,
        },
        {
          path: paths.MAP_EDITOR,
          element: <AuthComp component={MapEdit} />,
        },
        {
          path: paths.EMPLOYEE_TABLE,
          element: <AuthComp component={EmployeeTable} />,
        },
        {
          path: paths.ABOUT,
          element: <AboutUs />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
