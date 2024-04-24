import paths from "./paths.tsx";
import Home from "../routes/Home.tsx";
import MapEdit from "../routes/MapEdit.tsx";
import PathTables from "../routes/MapData.tsx";
import AboutUs from "../routes/AboutUs.tsx";
import Services from "../routes/Services.tsx";
import MedicineForm from "../routes/services/MedicineForm.tsx";
import MedicalDeviceForm from "../routes/services/MedicalDeviceForm.tsx";
import GiftForm from "../routes/services/GiftForm.tsx";
import SanitationForm from "../routes/services/SanitationForm.tsx";
import RoomForm from "../routes/services/RoomForm.tsx";
import SecurityForm from "../routes/services/SecurityForm.tsx";
import ServicesTable from "../routes/ServicesTable.tsx";
import EmployeeTable from "../routes/EmployeeTable.tsx";
import AuthComp from "../components/AuthenticationComponent.tsx";
import Map from "../routes/Map.tsx";

const routes = [
  { path: paths.HOME, element: <Home /> },
  { path: paths.MAP_EDITOR, element: <AuthComp component={MapEdit} /> },
  { path: paths.MAP_DATA, element: <AuthComp component={PathTables} /> },
  { path: paths.ABOUT_US, element: <AuthComp component={AboutUs} /> },
  { path: paths.SERVICES, element: <AuthComp component={Services} /> },
  {
    path: paths.MEDICINE_DELIVERY,
    element: <AuthComp component={MedicineForm} />,
  },
  {
    path: paths.MEDICAL_DEVICE_DELIVERY,
    element: <AuthComp component={MedicalDeviceForm} />,
  },
  { path: paths.GIFT_DELIVERY, element: <AuthComp component={GiftForm} /> },
  {
    path: paths.SANITATION_REQUEST,
    element: <AuthComp component={SanitationForm} />,
  },
  { path: paths.ROOM_RESERVATION, element: <AuthComp component={RoomForm} /> },
  {
    path: paths.SECURITY_REQUEST,
    element: <AuthComp component={SecurityForm} />,
  },
  { path: paths.SERVICE_LOG, element: <AuthComp component={ServicesTable} /> },
  { path: paths.EMPLOYEE_LOG, element: <AuthComp component={EmployeeTable} /> },
  { path: "/home/oldHome", element: <Map /> },
];

export default routes;
