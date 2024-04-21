import { Link } from "react-router-dom";
import medicineIcon from "../../assets/medicine-icon.svg";
import securityIcon from "../../assets/security-icon.svg";
import roomIcon from "../../assets/room-icon.svg";
import sanitationIcon from "../../assets/sanitation-icon.svg";
import deviceIcon from "../../assets/device-icon.svg";
import ServiceCard from "../components/ServiceCard.tsx";
import paths from "../paths/paths.tsx";
import giftIcon from "../../assets/gift_delivery.svg";

function Services() {
  return (
    <div className="bg-offwhite h-screen">
      <div className="flex flex-col items-center gap-8 ">
        <div className="flex flex-col items-center gap-2 mt-8">
          <h2 className="w-full text-3xl font-bold text-center">
            Service Requests
          </h2>
          <h2 className="w-full text-md text-center">
            Submit a service request
          </h2>
          <hr className="pl-96 pr-96 " />
        </div>

        <div className="flex justify-center gap-8 ">
          <Link
            to={paths.MEDICINE_REQUEST}
            className=" serviceCard medicineDelivery ]  "
          >
            <ServiceCard
              imgPath={medicineIcon}
              alt="pill icon"
              label="Medicine"
            />
          </Link>
          <Link
            to={paths.MEDICAL_DEVICE_DELIVERY}
            className="serviceCard medicalDelivery"
          >
            <ServiceCard
              imgPath={deviceIcon}
              alt="device icon"
              label="Medical Devices"
            />
          </Link>
          <Link to={paths.ROOM_RESERVATION} className="serviceCard reserveRoom">
            <ServiceCard imgPath={roomIcon} alt="room icon" label="Rooms" />
          </Link>
        </div>
        <div className="flex justify-center gap-8">
          <Link
            to={paths.SANITATION_FORM}
            className="serviceCard sanitationRequest"
          >
            <ServiceCard
              imgPath={sanitationIcon}
              alt="sanitation icon"
              label="Sanitation"
            />
          </Link>
          <Link
            to={paths.SECURITY_REQUEST}
            className="serviceCard securityRequest"
          >
            <ServiceCard
              imgPath={securityIcon}
              alt="security icon"
              label="Security"
            />
          </Link>
          <Link to={paths.GIFT_DELIVERY} className="serviceCard giftDelivery">
            <ServiceCard imgPath={giftIcon} alt="device icon" label="Gifts" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Services;
