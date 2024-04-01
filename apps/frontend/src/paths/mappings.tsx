import paths from "./paths.tsx";
import Home from "../routes/Home.tsx";
import Services from "../routes/Services.tsx";
//import MedicineRequest from "../routes/MedicineRequest.tsx";
import ServicesTable from "../routes/ServicesTable.tsx";
import PathTables from "../routes/PathTables.tsx";
import MedicineDeliveryForm from "../routes/MedicineDeliveryForm.tsx";

const routes = [
  { path: paths.HOME, element: <Home /> },
  { path: paths.SERVICES, element: <Services /> },
  { path: paths.MEDICINE_REQUEST, element: <MedicineDeliveryForm /> },
  { path: paths.SERVICES_DATA, element: <ServicesTable /> },
  { path: paths.MAP_DATA, element: <PathTables /> },
];

export default routes;
