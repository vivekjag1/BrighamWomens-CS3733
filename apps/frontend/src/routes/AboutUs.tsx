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
import wongImage from "../../assets/temp-employees/wilsonwong.jpg";
import FormContainer from "../components/FormContainer.tsx";
import EmployeeCard from "../components/EmployeeCard.tsx";

const employees = [
  { name: "Danielle gorrovee", role: "Lead SWE", imageSrc: danielImage },
  { name: "Matthew Brown", role: "Project Manager", imageSrc: mattImage },
  { name: "Andy troung", role: "Assistant Lead", imageSrc: andyImage },
  { name: "Vivek Jasdgasd", role: "Assistant Lead", imageSrc: vivekImage },
  { name: "Mohamnad adem", role: "Scrum Master", imageSrc: ademImage },
  { name: "Suliman mosagoij", role: "Product Owner", imageSrc: suliImage },
  { name: "Frankesco di minso", role: "Documentation", imageSrc: frankyImage },
  { name: "Colin Masgucci", role: "Frontend", imageSrc: colinImage },
  { name: "Griffin Brown", role: "Algorithm", imageSrc: griffinImage },
  { name: "Taeha Song", role: "Frontend", imageSrc: taehaImage },
  { name: "Joseph cardsassd", role: "Team Coach", imageSrc: josephImage },
  { name: "Wilson Wong", role: "Professor", imageSrc: wongImage },
];

export default function AboutUs() {
  return (
    <FormContainer>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "2rem",
        }}
        className="custom-form-container"
      >
        <h1 className=" text-4xl"> About Us </h1>
        <p style={{ color: "grey" }}> WPI Computer Science Department</p>
        <hr className="pl-96 pr-96" />
        <br />
        <p style={{ color: "grey" }}> CS3733-D24 (Software Engineering)</p>
        <p style={{ color: "grey" }}> Professor. Wilson Wong🐻</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {employees.map((employee, index) => (
            <div key={index}>
              <EmployeeCard
                name={employee.name}
                role={employee.role}
                imageSrc={employee.imageSrc}
              />
            </div>
          ))}
        </div>
        <div>
          {/*    <img*/}
          {/*      className="w-25 h-40 object-cover rounded-full "*/}
          {/*      src={danielImage}*/}
          {/*      alt=""*/}
          {/*    />*/}
          {/*    <label className="font-semibold"> Vivek jasdgasd </label>*/}
          {/*    <br/> <label>Assistant Lead</label>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <img*/}
          {/*      className="w-25 h-40 object-cover rounded-full  "*/}
          {/*      src={mattImage}*/}
          {/*      alt=""*/}
          {/*    />*/}
          {/*    <label className="font-semibold"> Vivek jasdgasd </label>*/}
          {/*    <br/> <label>Assistant Lead</label>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <img*/}
          {/*      className="w-25 h-40 object-cover rounded-full "*/}
          {/*      src={andyImage}*/}
          {/*      alt=""*/}
          {/*    />*/}
          {/*    <label className="font-semibold"> Vivek jasdgasd </label>*/}
          {/*    <br/> <label>Assistant Lead</label>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <img*/}
          {/*      className="w-25 h-40 object-cover rounded-full "*/}
          {/*      src={vivekImage}*/}
          {/*      alt=""*/}
          {/*    />*/}
          {/*    <label className="font-semibold"> Vivek jasdgasd </label>*/}
          {/*    <br/> <label>Assistant Lead</label>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <img*/}
          {/*      className="w-25 h-40 object-cover rounded-full "*/}
          {/*      src={ademImage}*/}
          {/*      alt=""*/}
          {/*    />*/}
          {/*    <label className="font-semibold"> Vivek jasdgasd </label>*/}
          {/*    <br/> <label>Assistant Lead</label>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <img*/}
          {/*      className="w-25 h-40 object-cover rounded-full "*/}
          {/*      src={suliImage}*/}
          {/*      alt=""*/}
          {/*    />*/}
          {/*    <label className="font-semibold"> Vivek jasdgasd </label>*/}
          {/*    <br/> <label>Assistant Lead</label>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <img*/}
          {/*      className="w-25 h-40 object-cover rounded-full "*/}
          {/*      src={frankyImage}*/}
          {/*      alt=""*/}
          {/*    />*/}
          {/*    <label className="font-semibold"> Vivek jasdgasd </label>*/}
          {/*    <br/> <label>Assistant Lead</label>*/}
          {/*  </div>*/}

          {/*  <div>*/}
          {/*    <img*/}
          {/*      className="w-25 h-40 object-cover rounded-full "*/}
          {/*      src={colinImage}*/}
          {/*      alt=""*/}
          {/*    />*/}
          {/*    <label className="font-semibold"> Vivek jasdgasd </label>*/}
          {/*    <br/> <label>Assistant Lead</label>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <img*/}
          {/*      className="w-25 h-40 object-cover rounded-full "*/}
          {/*      src={griffinImage}*/}
          {/*      alt=""*/}
          {/*    />*/}
          {/*    <label className="font-semibold"> Vivek jasdgasd </label>*/}
          {/*    <br/> <label>Assistant Lead</label>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <img*/}
          {/*      className="w-25 h-40 object-cover rounded-full "*/}
          {/*      src={taehaImage}*/}
          {/*      alt=""*/}
          {/*    />*/}
          {/*    <label className="font-semibold"> Vivek jasdgasd </label>*/}
          {/*    <br/> <label>Assistant Lead</label>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <br />
          <p style={{ color: "#012D5A", textAlign: "center" }}>
            {" "}
            "Thanks to Brigham and Womens Hospital and their represenative,
            Andrew Shin."{" "}
          </p>
          <label className="animate-pulse">
            {" "}
            The B&WH maps and data used in this app are copyrighted and for
            educational use only.{" "}
          </label>

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
        </div>
        {/*  <br/>*/}
      </div>
    </FormContainer>
  );
}
