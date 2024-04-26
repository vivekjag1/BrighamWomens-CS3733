/*import { useState } from "react";
import Banner from "../../components/Banner/Banner.tsx";*/
import "./Hero.css";

/*const bannerChildren: JSX.Element = (
  <p>
    <span className="font-bold">Disclaimer: </span>This is a project for WPI CS
    3733 Software Engineering (Prof. Wong) and is not the actual Brigham &
    Women's Hospital Website.
  </p>
);*/

function Hero() {
  /*const [bannerOpen, setBannerOpen] = useState(true);

  const bannerElement = (
    <div className="absolute top-0 left-0 w-full flex justify-center items-center h-[15vh]">
      <Banner onClick={() => setBannerOpen(false)}>
        {bannerChildren}
      </Banner>
    </div>
  );*/

  return (
    <div>
      {/*<div className="hero-hospital-image w-[65%] h-screen"></div>*/}
      <div className="hero-map-image h-screen w-[35%]"></div>
    </div>
  );
}

export default Hero;
