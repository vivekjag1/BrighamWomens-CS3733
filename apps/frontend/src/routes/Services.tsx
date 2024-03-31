import MedicineIcon from "../../assets/medicine-icon.png";
import { Link } from "react-router-dom";

function Services() {
  return (
    //page together
    <div className="w-screen h-screen flex-col justify-center">
      {/*page title*/}
      <div className=" text-center text-blue-900 text-[40px] font-bold font-['Roboto'] leading-[42px] tracking-tight">
        Services
      </div>
      <Link to="/MedicineRequest">
        {/* box with service*/}
        <div className="w-screen h-screen relative left-50 bottom-50">
          <div className=" w-72 h-72 flex flex-col justify-center align-content-center 24rem border-2 shadow-md relative hover:bg-zinc-100">
            {/* container for button*/}
            <div className="w-36 h-36 absolute bottom-50 left-12">
              {/*icon*/}
              <img src={MedicineIcon} alt={"Image of pill and bottle"} />
            </div>
            <div className="text-center text-black text-2xl font-normal font-['Roboto'] absolute bottom-10 left-10">
              Medicine Request
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Services;
