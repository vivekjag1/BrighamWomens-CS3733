import MedicineIcon from "../../assets/medicine-icon.png";
import { Link } from "react-router-dom";

function Services() {
  return (
    //page together
    <div>
      {/*page title*/}
      <div className="text-center text-blue-900 text-[40px] font-bold font-['Roboto'] leading-[42px] tracking-tight">
        Services
      </div>
      <Link to="/MedicineRequest">
        {/* box with service*/}
        <div className="max-width: 24rem border-2 shadow-md">
          {" "}
          {/* container for button*/}
          <div className="w-36 h-36">
            {" "}
            {/*icon*/}
            <img src={MedicineIcon} alt={"Image of pill and bottle"} />
          </div>
          <div className="text-center text-black text-2xl font-normal font-['Roboto']">
            Medicine Request
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Services;
