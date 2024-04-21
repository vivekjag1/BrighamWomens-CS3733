import "../styles/ServicesCard.css";
// import FormContainer from "../components/FormContainer.tsx";
import * as React from "react";
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import ListSubheader from '@mui/material/ListSubheader';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';
import josephImage from "../../assets/temp-employees/joe-cardarelli.jpeg";
import danielImage from "../../assets/temp-employees/dan-gorbunov.jpeg";
// import FormContainer from "../components/FormContainer.tsx";
import mattImage from "../../assets/temp-employees/matt-brown.jpeg";
// import taehaImage from '../../assets/people/Taeha.png';
import andyImage from "../../assets/temp-employees/andy-truong.jpeg";
import vivekImage from "../../assets/temp-employees/vivek-jagadeesh.jpeg";
import ademImage from "../../assets/temp-employees/adem.jpeg";
import suliImage from "../../assets/temp-employees/sulaiman.jpeg";
import frankyImage from "../../assets/temp-employees/franky.jpeg";
import colinImage from "../../assets/temp-employees/colin.jpeg";
import griffinImage from "../../assets/temp-employees/griffin-brown.jpeg";
import taehaImage from "../../assets/temp-employees/taeha-song.jpeg";

export default function AboutUs() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="custom-form-container"
    >
      <div
        id="toast-default"
        className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
          {/*<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"*/}
          {/*     viewBox="0 0 18 20">*/}
          {/*  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
          {/*        d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/>*/}
          {/*</svg>*/}
        </div>
        <div className="ms-3 text-sm font-normal">
          Thanks to Brigham and Womens Hospital and their represenative, Andrew
          Shin. .
        </div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-default"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            {/*<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
            {/*      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>*/}
          </svg>
        </button>
      </div>

      <p>
        {" "}
        Thanks to Brigham and Womens Hospital and their represenative, Andrew
        Shin.{" "}
      </p>
      <br />
      <h1 className=" text-4xl"> About Us </h1>
      <p style={{ color: "grey" }}> WPI Computer Science Department</p>
      <hr className="pl-96 pr-96" />
      <br />
      <p style={{ color: "grey" }}> CS3733-D24 (Software Engineering)</p>
      <p style={{ color: "grey" }}> Professor. Wilson Wong🐻</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
        <div>
          <img
            className="w-60 h-80 object-cover rounded-lg "
            src={josephImage}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-60 h-80 object-cover rounded-lg "
            src={danielImage}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-60 h-80 object-cover rounded-lg "
            src={mattImage}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-60 h-80 object-cover rounded-lg"
            src={andyImage}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-60 h-80 object-cover rounded-lg"
            src={vivekImage}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-60 h-80 object-cover rounded-lg"
            src={ademImage}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-60 h-80 object-cover rounded-lg"
            src={suliImage}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-60 h-80 object-cover rounded-lg"
            src={frankyImage}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-60 h-80 object-cover rounded-lg"
            src={colinImage}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-60 h-80 object-cover rounded-lg"
            src={griffinImage}
            alt=""
          />
        </div>
        <div>
          <img
            className="w-60 h-80 object-cover rounded-lg"
            src={taehaImage}
            alt=""
          />
        </div>
      </div>

      {/*  <div*/}
      {/*    style={{*/}
      {/*      width: "70%",*/}
      {/*      height: "20%",*/}
      {/*      display: "flex",*/}
      {/*      flexDirection: "row",*/}
      {/*      justifyContent: "center",*/}
      {/*    }}*/}
      {/*    className="custom-form-container"*/}
      {/*  >*/}
      {/*    <FormContainer >*/}
      {/*      <img*/}
      {/*        className="block h-full w-20 rounded-lg object-cover object-center "*/}
      {/*        src={josephImage}*/}
      {/*      />*/}
      {/*      <label>*/}
      {/*        {" "}*/}
      {/*        Joseph cardsasd*/}
      {/*        <br/> Team Coach*/}
      {/*      </label>*/}
      {/*    </FormContainer>*/}
      {/*    <FormContainer>*/}
      {/*      <img*/}
      {/*        className="block h-full w-20 rounded-lg object-cover object-center"*/}
      {/*        src={danielImage}*/}
      {/*      />*/}
      {/*      <label>*/}
      {/*        {""}*/}
      {/*        Danielle Godlfioew*/}
      {/*        <br/> Lead SWE*/}
      {/*      </label>*/}
      {/*    </FormContainer>*/}
      {/*    <FormContainer>*/}
      {/*      <img*/}
      {/*        className="block h-full w-20 rounded-lg object-cover object-center"*/}
      {/*        src={andyImage}*/}
      {/*      />*/}
      {/*      <label>*/}
      {/*        {" "}*/}
      {/*        Andy Troug*/}
      {/*        <br/> Assistant Lead*/}
      {/*      </label>*/}
      {/*    </FormContainer>*/}
      {/*  </div>*/}

      {/*  <div*/}
      {/*    style={{*/}
      {/*      width: "70%",*/}
      {/*      height: "20%",*/}
      {/*      display: "flex",*/}
      {/*      flexDirection: "row",*/}
      {/*      justifyContent: "center",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <FormContainer>*/}
      {/*      <img*/}
      {/*        className="block h-full w-40 rounded-lg object-cover object-center"*/}
      {/*        src={vivekImage}*/}
      {/*      />*/}

      {/*      <label>*/}
      {/*        {" "}*/}
      {/*        Vivek jadfasd*/}
      {/*        <br/> Assistant Lead*/}
      {/*      </label>*/}
      {/*    </FormContainer>*/}
      {/*    <FormContainer>*/}
      {/*      <img*/}
      {/*        className="block h-full w-20 rounded-lg object-cover object-center"*/}
      {/*        src={mattImage}*/}
      {/*      />*/}
      {/*      <label>*/}
      {/*        {" "}*/}
      {/*        MAttherg bowewoe*/}
      {/*        <br/> Project Manager*/}
      {/*      </label>*/}
      {/*    </FormContainer>*/}
      {/*    <FormContainer>*/}
      {/*      <img*/}
      {/*        className="block h-full w-20 rounded-lg object-cover object-center"*/}
      {/*        src={ademImage}*/}
      {/*      />*/}
      {/*      <label>*/}
      {/*        {" "}*/}
      {/*        Mohalkgnla adem*/}
      {/*        <br/> Scrum Master*/}
      {/*      </label>*/}
      {/*    </FormContainer>*/}

      {/*  </div>*/}

      {/*  <div*/}
      {/*    style={{*/}
      {/*      width: "70%",*/}
      {/*      height: "20%",*/}
      {/*      display: "flex",*/}
      {/*      flexDirection: "row",*/}
      {/*      justifyContent: "center",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <FormContainer>*/}
      {/*      <img*/}
      {/*        className="block h-full w-20 rounded-lg object-cover object-center"*/}
      {/*        src={suliImage}*/}
      {/*      />*/}
      {/*      <label>*/}
      {/*        {" "}*/}
      {/*        Sulimanf masdgsdg*/}
      {/*        <br/> Product Owner*/}
      {/*      </label>*/}
      {/*    </FormContainer>*/}
      {/*    <FormContainer>*/}
      {/*      <img*/}
      {/*        className="block h-full w-20 rounded-lg object-cover object-center"*/}
      {/*        src={frankyImage}*/}
      {/*      />*/}
      {/*      <label>*/}
      {/*        {" "}*/}
      {/*        Frank dmi meiwf*/}
      {/*        <br/> Documentation*/}
      {/*      </label>*/}
      {/*    </FormContainer>*/}
      {/*    <FormContainer>*/}
      {/*      <img*/}
      {/*        className="block h-full w-20 rounded-lg object-cover object-center"*/}
      {/*        src={colinImage}*/}
      {/*      />*/}
      {/*      <label>*/}
      {/*        {" "}*/}
      {/*        colin masgucci*/}
      {/*        <br/> Front-End*/}
      {/*      </label>*/}
      {/*    </FormContainer>*/}
      {/*  </div>*/}

      {/*  <div*/}
      {/*    style={{*/}
      {/*      width: "70%",*/}
      {/*      height: "20%",*/}
      {/*      display: "flex",*/}
      {/*      flexDirection: "row",*/}
      {/*      justifyContent: "center",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <FormContainer>*/}
      {/*      <img*/}
      {/*        className="block h-full w-20 rounded-lg object-cover object-center"*/}
      {/*        src={griffinImage}*/}
      {/*      />*/}
      {/*      <label>*/}
      {/*        {" "}*/}
      {/*        Grifif brown*/}
      {/*        <br/> Algorithm*/}
      {/*      </label>*/}
      {/*    </FormContainer>*/}
      {/*    <FormContainer>*/}
      {/*      <img*/}
      {/*        className="block h-full w-20 rounded-lg object-cover object-center"*/}
      {/*        src={taehaImage}*/}
      {/*      />*/}
      {/*      <label>*/}
      {/*        {" "}*/}
      {/*        Taeha Song*/}
      {/*        <br/> Front-End*/}
      {/*      </label>*/}
      {/*    </FormContainer>*/}
      {/*  </div>*/}
      {/*  <br/>*/}
      {/*  <label> The B&WH maps and data used in this app are copyrighted and for educational use only. </label>*/}
    </div>
  );
}
