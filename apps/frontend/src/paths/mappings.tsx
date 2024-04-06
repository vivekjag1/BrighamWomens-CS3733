import paths from "./paths.tsx";
import Home from "../routes/Home.tsx";
import Services from "../routes/Services.tsx";
import FormStarter from "../routes/FormStarter.tsx";
import SecurityRequest from "../routes/SecurityRequest.tsx";
import ServicesTable from "../routes/ServicesTable.tsx";
import PathTables from "../routes/PathTables.tsx";
import MedicineDeliveryForm from "../routes/MedicineDeliveryForm.tsx";

const routes = [
  { path: paths.HOME, element: <Home /> },
  { path: paths.SERVICES, element: <Services /> },
  { path: paths.MEDICINE_REQUEST, element: <MedicineDeliveryForm /> },
  { path: paths.SERVICES_DATA, element: <ServicesTable /> },
  { path: paths.MAP_DATA, element: <PathTables /> },
  { path: paths.FORM_STARTER, element: <FormStarter /> },
  { path: paths.SECURITY_REQUEST, element: <SecurityRequest /> },
];

export default routes;
