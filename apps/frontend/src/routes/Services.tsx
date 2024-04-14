import { Link } from "react-router-dom";
import medicineIcon from "../../assets/medicine-icon.svg";
import securityIcon from "../../assets/security-icon.svg";
import roomIcon from "../../assets/room-icon.svg";
import sanitationIcon from "../../assets/sanitation-icon.svg";
import deviceIcon from "../../assets/device-icon.svg";
import ServiceCard from "../components/ServiceCard.tsx";
import paths from "../paths/paths.tsx";

function Services() {
  return (
    <div className="">
      <div className="flex flex-col items-center gap-8 ">
        <div className="flex flex-col items-center gap-2 mt-8">
          <h2 className="w-full text-3xl font-bold text-center">
            Service Requests
          </h2>
          <h2 className="w-full text-md text-center">
            Submit a service request
          </h2>
          <hr className="pl-96 pr-96" />
        </div>
        <div className="flex justify-center gap-8">
          <Link to={paths.MEDICINE_REQUEST}>
            <ServiceCard
              imgPath={medicineIcon}
              alt="pill icon"
              label="Medicine Delivery"
            />
          </Link>
          <Link to={paths.MEDICAL_DEVICE_DELIVERY}>
            <ServiceCard
              imgPath={deviceIcon}
              alt="device icon"
              label="Medical Device Delivery"
            />
          </Link>
        </div>
        <div className="flex justify-center gap-8">
          <Link to={paths.SANITATION_FORM}>
            <ServiceCard
              imgPath={sanitationIcon}
              alt="sanitation icon"
              label="Sanitation Request"
            />
          </Link>
          <Link to={paths.ROOM_RESERVATION}>
            <ServiceCard
              imgPath={roomIcon}
              alt="room icon"
              label="Reserve a Room"
            />
          </Link>
          <Link to={paths.SECURITY_REQUEST}>
            <ServiceCard
              imgPath={securityIcon}
              alt="security icon"
              label="Security Request"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Services;
