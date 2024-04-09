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
function App() {
  // const navigate = useNavigate();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Login />,
        },

        {
          path: "home",
          element: <Home />,
        },
        {
          path: "data",
          element: <AuthComp component={PathTables} />,
        },
        {
          path: "services",
          element: <Services />,
        },
        {
          path: "services/medicine",
          element: <MedicineDeliveryForm />,
        },
        {
          path: "services/medical-device",
          element: <MedicalDeviceDeliveryForm />,
        },
        {
          path: "services/room-reservation",
          element: <RoomReservation />,
        },
        {
          path: "/home/services/sanitation-form",
          element: <SanitationForm />,
        },
        {
          path: "services/security",
          element: <SecurityRequest />,
        },
        {
          path: "services/data",
          element: <ServicesTable />,
        },
        {
          path: "edit",
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
