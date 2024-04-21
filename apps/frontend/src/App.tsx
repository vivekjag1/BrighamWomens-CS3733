import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Services from "./routes/Services.tsx";

import Map from "./routes/Map.tsx";
import paths from "./paths/paths.tsx";
import Layout from "./components/Layout.tsx";
import AuthComp from "./components/AuthenticationComponent.tsx";
import MedicineForm from "./routes/services/MedicineForm.tsx";
import MedicalDeviceForm from "./routes/services/MedicalDeviceForm.tsx";
import SanitationForm from "./routes/services/SanitationForm.tsx";
import RoomForm from "./routes/services/RoomForm.tsx";
import SecurityForm from "./routes/services/SecurityForm.tsx";
import ServicesTable from "./routes/ServicesTable.tsx";
import GiftForm from "./routes/services/GiftForm.tsx";
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
          element: <AuthComp component={MedicineForm} />,
        },
        {
          path: paths.MEDICAL_DEVICE_DELIVERY,
          element: <AuthComp component={MedicalDeviceForm} />,
        },
        {
          path: paths.SANITATION_FORM,
          element: <AuthComp component={SanitationForm} />,
        },
        {
          path: paths.ROOM_RESERVATION,
          element: <AuthComp component={RoomForm} />,
        },
        {
          path: paths.SECURITY_REQUEST,
          element: <AuthComp component={SecurityForm} />,
        },
        {
          path: paths.GIFT_DELIVERY,
          element: <AuthComp component={GiftForm} />,
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
