import { Link } from "react-router-dom";
import medicineIcon from "../../../assets/medicine-icon.svg";
import securityIcon from "../../../assets/security-icon.svg";
import roomIcon from "../../../assets/room-icon.svg";
import sanitationIcon from "../../../assets/sanitation-icon.svg";
import deviceIcon from "../../../assets/device-icon.svg";
import ServiceCard from "../../components/service-card/ServiceCard.tsx";
import paths from "../../common/paths.tsx";
import giftIcon from "../../../assets/gift_delivery.svg";
import "./ServiceSelection.css";
import ITIcon from "../../../assets/ITIcon.svg";
import FoodDelverySvg from "../../../assets/FoodDeliverySVG.svg";

function ServiceSelection() {
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
            to={paths.MEDICINE_DELIVERY}
            className="service-request animate-tada"
          >
            <ServiceCard
              imgPath={medicineIcon}
              alt="pill icon"
              label="Medicine"
            />
          </Link>
          <Link
            to={paths.MEDICAL_DEVICE_DELIVERY}
            className="service-request medical-device-delivery animate-tada"
          >
            <ServiceCard
              imgPath={deviceIcon}
              alt="device icon"
              label="Medical Devices"
            />
          </Link>
          <Link
            to={paths.ROOM_RESERVATION}
            className="service-request room-reservation animate-tada"
          >
            <ServiceCard imgPath={roomIcon} alt="room icon" label="Rooms" />
          </Link>
          <Link
            to={paths.GIFT_DELIVERY}
            className="animate-tada service-request gift-delivery"
          >
            <ServiceCard imgPath={giftIcon} alt="device icon" label="Gifts" />
          </Link>
        </div>
        <div className="flex justify-center gap-8">
          <Link
            to={paths.SANITATION_REQUEST}
            className="service-request sanitation-request animate-tada"
          >
            <ServiceCard
              imgPath={sanitationIcon}
              alt="sanitation icon"
              label="Sanitation"
            />
          </Link>
          <Link
            to={paths.SECURITY_REQUEST}
            className="service-request security-request animate-tada"
          >
            <ServiceCard
              imgPath={securityIcon}
              alt="security icon"
              label="Security"
            />
          </Link>
          <Link
            to={paths.FOOD_DELIVERY_REQUEST}
            className="service-request food-delivery animate-tada"
          >
            <ServiceCard
              imgPath={FoodDelverySvg}
              alt="device icon"
              label="Food"
            />
          </Link>
          <Link
            to={paths.IT_REQUEST}
            className="service-request it_support animate-tada"
          >
            <ServiceCard imgPath={ITIcon} alt="IT icon" label="IT Support" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServiceSelection;
