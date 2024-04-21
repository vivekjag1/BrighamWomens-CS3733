import paths from "./paths.tsx";
import Map from "../routes/Map.tsx";
import Services from "../routes/Services.tsx";
import SecurityForm from "../routes/services/SecurityForm.tsx";
import RoomForm from "../routes/services/RoomForm.tsx";
import MedicineForm from "../routes/services/MedicineForm.tsx";
import MedicalDeviceForm from "../routes/services/MedicalDeviceForm.tsx";
import SanitationForm from "../routes/services/SanitationForm.tsx";
import ServicesTable from "../routes/ServicesTable.tsx";
import PathTables from "../routes/MapData.tsx";
import MapEdit from "../routes/MapEdit.tsx";
import GiftForm from "../routes/services/GiftForm.tsx";
import EmployeeTable from "../routes/EmployeeTable.tsx";
import AboutUs from "../routes/AboutUs.tsx";

const routes = [
  { path: paths.HOME, element: <Map /> },
  { path: paths.SERVICES, element: <Services /> },
  { path: paths.MEDICINE_REQUEST, element: <MedicineForm /> },
  {
    path: paths.MEDICAL_DEVICE_DELIVERY,
    element: <MedicalDeviceForm />,
  },
  { path: paths.SANITATION_FORM, element: <SanitationForm /> },
  { path: paths.ROOM_RESERVATION, element: <RoomForm /> },
  { path: paths.SECURITY_REQUEST, element: <SecurityForm /> },
  { path: paths.GIFT_DELIVERY, element: <GiftForm /> },
  { path: paths.SERVICES_DATA, element: <ServicesTable /> },
  { path: paths.MAP_DATA, element: <PathTables /> },
  { path: paths.MAP_EDITOR, element: <MapEdit /> },
  { path: paths.EMPLOYEE_TABLE, element: <EmployeeTable /> },
  { path: paths.ABOUT, element: <AboutUs /> },
];

export default routes;
