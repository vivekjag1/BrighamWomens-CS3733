import { Link } from "react-router-dom";
import medicineIcon from "../../assets/pill.svg";
import securityIcon from "../../assets/security-icon.svg";
import roomIcon from "../../assets/room-reserve.svg";
import cleaningIcon from "../../assets/cleaning.svg";
import medicaltoolIcon from "../../assets/medicinetool.svg";
import ServiceCard from "../components/ServiceCard.tsx";
import paths from "../paths/paths.tsx";

function Services() {
  return (
    <div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-6 mt-8">
          <h2 className="w-screen text-4xl font-bold text-center">Services</h2>
          <hr className="w-9/12" />
        </div>
        <div className="flex justify-center gap-8">
          <Link to={paths.MEDICINE_REQUEST}>
            <ServiceCard
              imgPath={medicineIcon}
              alt="capsule and pill icon"
              label="Medicine Delivery"
            />
          </Link>
          <Link to={paths.MEDICAL_DEVICE_DELIVERY}>
            <ServiceCard
              imgPath={medicaltoolIcon}
              alt="capsule and pill icon"
              label="Medical Device Delivery"
            />
          </Link>
        </div>
        <div className="flex justify-center gap-8">
          <Link to={paths.SANITATION_FORM}>
            <ServiceCard
              imgPath={cleaningIcon}
              alt="capsule and pill icon"
              label="Sanitation Request"
            />
          </Link>
          <Link to={paths.ROOM_RESERVATION}>
            <ServiceCard
              imgPath={roomIcon}
              alt="capsule and pill icon"
              label="Reserve a Room"
            />
          </Link>
          <Link to={paths.SECURITY_REQUEST}>
            <ServiceCard
              imgPath={securityIcon}
              alt="capsule and pill icon"
              label="Security Request"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Services;
