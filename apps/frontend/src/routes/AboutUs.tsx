import * as React from "react";
import josephImage from "../../assets/employees/jcardarelli.jpeg";
import danielImage from "../../assets/employees/dgorbunov.jpeg";
// import FormContainer from "../components/FormContainer.tsx";
import mattImage from "../../assets/employees/mbrown.jpeg";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import andyImage from "../../assets/employees/atruong.jpeg";
import vivekImage from "../../assets/employees/vjagadeesh.jpeg";
import ademImage from "../../assets/employees/mdjadid.jpeg";
import suliImage from "../../assets/employees/smoukheiber.jpeg";
import frankyImage from "../../assets/employees/fmise.jpeg";
import colinImage from "../../assets/employees/cmasucci.jpeg";
import griffinImage from "../../assets/employees/gbrown.jpeg";
import taehaImage from "../../assets/employees/tsong.jpeg";
import wongImage from "../../assets/employees/wwong.jpg";
// import FormContainer from "../components/FormContainer.tsx";
import background from "../../assets/auth0-background.png";
import { Card, CardContent, styled } from "@mui/material";
import ArrowIosForwardComponent from "../components/ArrowComponent.tsx";
import { Link } from "react-router-dom";
import paths from "../common/paths.tsx";
import EmployeeCard from "../components/EmployeeCard.tsx";
import ArrowBackIosIcon from "../components/ArrowbackIcon.tsx";

const employees = [
  {
    name: "Daniel Gorbunov ",
    role: "Lead SWE",
    imageSrc: danielImage,
    quote: '"Have you tried turning it off and on again"',
  },
  {
    name: "Matthew Brown",
    role: "Project Manager",
    imageSrc: mattImage,
    quote: '"Imagination is more important than knowledge"',
  },
  {
    name: "Andy Troung ",
    role: "Assistant Lead",
    imageSrc: andyImage,
    quote: '"Yes Queen" - Andy',
  },
  {
    name: "Vivek Jagadeesh ",
    role: "Assistant Lead",
    imageSrc: vivekImage,
    quote:
      '"Talent sets the floor, character sets the ceiling"\n - Bill Belichick',
  },
  {
    name: "Mohamed Adem Djadid ",
    role: "Scrum Master",
    imageSrc: ademImage,
    quote: "yeet",
  },
  {
    name: "Sulaiman Moukheiber  ",
    role: "Product Owner",
    imageSrc: suliImage,
    quote: "yeet",
  },
  {
    name: "Francesco Di Mise ",
    role: "Documentation",
    imageSrc: frankyImage,
    quote:
      "\"It is said that your life flashes before your eyes just before you die. That is true, it's called Life.”\n" +
      "― Terry Pratchett, The Last Continent",
  },
  {
    name: "Colin Mascucci ",
    role: "Frontend",
    imageSrc: colinImage,
    quote: "yeet",
  },
  {
    name: "Griffin Brown",
    role: "Algorithm",
    imageSrc: griffinImage,
    quote: '"Μνάσεσθαί τινά φαμι καὶ ὔστερον ἀμμέων"',
  },
  {
    name: "Taeha Song",
    role: "Frontend",
    imageSrc: taehaImage,
    quote: '"Carpe diem"',
  },
  {
    name: "Joseph Cardarelli",
    role: "Team Coach",
    imageSrc: josephImage,
    quote: "yeet",
  },
  {
    name: "Wilson Wong",
    role: "Professor",
    imageSrc: wongImage,
    quote: "yeet",
  },
];

const CustomCardContent = styled(CardContent)({
  display: "flex",
  "&:last-child": {
    padding: 0,
    paddingBottom: 0,
  },
});

function AboutUs() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 overflow-hidden bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className="h-screen overflow-auto">
        <div className="flex justify-center w-full">
          <div className="flex flex-col items-center gap-2 mx-5 my-8">
            <Card
              className="shadow-xl drop-shadow w-full max-w-5xl overflow-hidden"
              sx={{ borderRadius: "20px" }}
            >
              <CustomCardContent>
                {/*<div className="bg-lime-900">*/}

                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "2rem",
                    position: "relative",
                  }}
                  className="custom-form-container"
                >
                  {/*<div style={{ display: "flex", alignItems: "center" }}>*/}
                  <div className="flex items-center justify-between w-full">
                    <Link
                      to={paths.HERO}
                      onClick={() => paths.HERO}
                      className="flex items-center flex-row"
                    >
                      <span className="absolute ml-5">Back</span>
                      <ArrowBackIosIcon />
                    </Link>
                    <h1 className="text-4xl flex-grow text-center ml-6">
                      About Us
                    </h1>
                    <Link
                      to={paths.CREDITS}
                      onClick={() => paths.CREDITS}
                      className="flex items-center flex-row"
                    >
                      <span className="absolute right-[30px]"> Credits</span>
                      <ArrowIosForwardComponent />
                    </Link>
                  </div>
                  <p style={{ color: "olive" }}>
                    {" "}
                    WPI Computer Science Department
                  </p>
                  <p style={{ color: "grey" }}>
                    {" "}
                    CS3733-D24 (Software Engineering)
                  </p>
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
                          quote={employee.quote}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <br />
                    <p style={{ color: "#012D5A", textAlign: "center" }}>
                      Thanks to Brigham and Womens Hospital and their
                      represenative, Andrew Shin
                    </p>
                    <label>
                      The B&WH maps and data used in this app are copyrighted
                      and for educational use only
                    </label>
                  </div>
                </div>
              </CustomCardContent>
              {/*</div>*/}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
