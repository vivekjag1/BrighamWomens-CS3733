import React from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
//import Home from "./routes/Home.tsx";
//import Login from "./routes/Login.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
//import Login from "./routes/Login.tsx";
import PathTables from "./routes/PathTables.tsx";
import Services from "./routes/Services.tsx";
import MedicineDeliveryForm from "./routes/MedicineDeliveryForm.tsx";
import MedicalDeviceDeliveryForm from "./routes/MedicalDeviceDeliveryForm.tsx";
import RoomReservation from "./routes/RoomReservation.tsx";
import SanitationForm from "./routes/SanitationForm.tsx";
import SecurityRequest from "./routes/SecurityRequest.tsx";
import ServicesTable from "./routes/ServicesTable.tsx";
import EditMap from "./routes/EditMap.tsx";
import AuthComp from "./components/AuthenticationComponent.tsx";
import Home from "./routes/Home.tsx";
import SideNavBarV1 from "./archive/SideNavBarV1.tsx";
import Login from "./routes/Login.tsx";
import paths from "./paths/paths.tsx";
function App() {
  // const navigate = useNavigate();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: paths.LOGIN,
          element: <Login />,
        },

        {
          path: paths.HOME,
          element: <Home />,
        },
        {
          path: paths.MAP_DATA,
          element: <AuthComp component={PathTables} />,
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
          path: paths.EDITED_MAP,
          element: <EditMap />,
        },
      ],
    },
    // {
    //     path: '/',
    //     element: <Home/>,
    //     children:[]
    // },
  ]);

  return <RouterProvider router={router} />;
}

function Root() {
  const navigate = useNavigate();
  return (
    <Auth0Provider
      useRefreshTokens
      cacheLocation="localstorage"
      domain="dev-7eoh0ojk0tkfhypo.us.auth0.com"
      clientId="U8XpuA4s1L8lmd1avUIOupo1494YlppB"
      authorizationParams={{
        redirect_uri: window.location.origin,
        //scope: "openid profile email offline_access",
      }}
      onRedirectCallback={(appState) => {
        navigate(appState?.returnTo || window.location.pathname);
      }}
    >
      <div>
        <SideNavBarV1 />
        <Outlet />
      </div>
    </Auth0Provider>
  );
}

export default App;
