import paths from "./paths.tsx";
import Map from "../routes/Map.tsx";
import Services from "../routes/Services.tsx";
import SecurityRequest from "../routes/SecurityRequest.tsx";
import RoomReservation from "../routes/RoomReservation.tsx";
import MedicineDeliveryForm from "../routes/MedicineDeliveryForm.tsx";
import MedicalDeviceDeliveryForm from "../routes/MedicalDeviceDeliveryForm.tsx";
import SanitationForm from "../routes/SanitationForm.tsx";
//import MedicineRequest from "../routes/MedicineRequest-styled.tsx";
import ServicesTable from "../routes/ServicesTable.tsx";
import PathTables from "../routes/MapData.tsx";
import EditMap from "../routes/EditMap.tsx";
import GiftDelivery from "../routes/GiftDelivery.tsx";

const routes = [
  { path: paths.MAP, element: <Map /> },
  { path: paths.SERVICES, element: <Services /> },
  { path: paths.MEDICINE_REQUEST, element: <MedicineDeliveryForm /> },
  {
    path: paths.MEDICAL_DEVICE_DELIVERY,
    element: <MedicalDeviceDeliveryForm />,
  },
  { path: paths.SANITATION_FORM, element: <SanitationForm /> },
  { path: paths.ROOM_RESERVATION, element: <RoomReservation /> },
  { path: paths.SECURITY_REQUEST, element: <SecurityRequest /> },
  { path: paths.GIFT_DELIVERY, element: <GiftDelivery /> },
  { path: paths.SERVICES_DATA, element: <ServicesTable /> },
  { path: paths.MAP_DATA, element: <PathTables /> },
  { path: paths.MAP_EDITOR, element: <EditMap /> },
];

export default routes;
