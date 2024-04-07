import { Link } from "react-router-dom";
import medicineIcon from "../../assets/pill-icon.svg";
import ServiceCard from "../components/ServiceCard.tsx";
import paths from "../paths/paths.tsx";

function Services() {
  return (
    <div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-6 mt-8">
          <h2 className="w-95vw text-3xl font-bold text-center">Services</h2>
          <hr className="w-9/12" />
        </div>
        <Link to={paths.MEDICINE_REQUEST}>
          <ServiceCard
            imgPath={medicineIcon}
            alt="capsule and pill icon"
            label="Medicine Delivery"
          />
        </Link>
      </div>
    </div>
  );
}

export default Services;
