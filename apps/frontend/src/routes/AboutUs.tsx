import "../styles/ServicesCard.css";
import * as React from "react";
import josephImage from "../../assets/employees/joe-cardarelli.jpeg";
import danielImage from "../../assets/employees/dan-gorbunov.jpeg";
// import FormContainer from "../components/FormContainer.tsx";
import mattImage from "../../assets/employees/matt-brown.jpeg";
// import taehaImage from '../../assets/people/Taeha.png';
import andyImage from "../../assets/employees/andy-truong.jpeg";
import vivekImage from "../../assets/employees/vivek-jagadeesh.jpeg";
import ademImage from "../../assets/employees/adem.jpeg";
import suliImage from "../../assets/employees/sulaiman.jpeg";
import frankyImage from "../../assets/employees/franky.jpeg";
import colinImage from "../../assets/employees/colin.jpeg";
import griffinImage from "../../assets/employees/griffin-brown.jpeg";
import taehaImage from "../../assets/employees/taeha-song.jpeg";
import wongImage from "../../assets/employees/wilsonwong.jpg";
import FormContainer from "../components/FormContainer.tsx";
import EmployeeCard from "../components/EmployeeCard.tsx";
import background from "../../assets/bwh-exterior-default.png";

const employees = [
  { name: "Daniel Gorbunov ", role: "Lead SWE", imageSrc: danielImage },
  { name: "Matthew Brown", role: "Project Manager", imageSrc: mattImage },
  { name: "Andy Troung ", role: "Assistant Lead", imageSrc: andyImage },
  { name: "Vivek Jagadeesh ", role: "Assistant Lead", imageSrc: vivekImage },
  { name: "Mohamed Adem Djadid ", role: "Scrum Master", imageSrc: ademImage },
  { name: "Sulaiman Moukheiber  ", role: "Product Owner", imageSrc: suliImage },
  { name: "Francesco Di Mise ", role: "Documentation", imageSrc: frankyImage },
  { name: "Colin Mascucci ", role: "Frontend", imageSrc: colinImage },
  { name: "Griffin Brown", role: "Algorithm", imageSrc: griffinImage },
  { name: "Taeha Song", role: "Frontend", imageSrc: taehaImage },
  { name: "Joseph Cardarelli", role: "Team Coach", imageSrc: josephImage },
  { name: "Wilson Wong", role: "Professor", imageSrc: wongImage },
];

export default function AboutUs() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 overflow-hidden bg-cover bg-no-repeat bg-center blur-sm"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <FormContainer>
        {/*<div className="bg-lime-900">*/}

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
          <br />
          <p style={{ color: "olive" }}> WPI Computer Science Department</p>
          <p style={{ color: "grey" }}> CS3733-D24 (Software Engineering)</p>
          <br />
          <hr className="pl-96 pr-96" />
          <br />
          {/*<p style={{color: "grey"}}> Professor. Wilson Wong🐻</p>*/}
          <br />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
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
          </div>
        </div>
        {/*</div>*/}
      </FormContainer>
    </div>
  );
}
