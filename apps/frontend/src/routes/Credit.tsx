import "../styles/ServicesCard.css";
import * as React from "react";

// import FormContainer from "../components/FormContainer.tsx";

import { Link } from "react-router-dom";

// import taehaImage from '../../assets/people/Taeha.png';
import background from "../../assets/bwh-exterior-default.png";
import { Card, CardContent, styled } from "@mui/material";
import paths from "../common/paths.tsx";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import danielImage from "../../assets/employees/dan-gorbunov.jpeg";
import CreditCard from "../components/CreditCard.tsx";
import webstormImage from "../../assets/webstormpics.png";

const CustomCardContent = styled(CardContent)({
  display: "flex",
  "&:last-child": {
    padding: 0,
    paddingBottom: 0,
  },
});

const tools = [
  { name: "Webstorm ", imageSrc: webstormImage },
  { name: "Webstorm ", imageSrc: webstormImage },
  { name: "Webstorm ", imageSrc: webstormImage },
  { name: "Webstorm ", imageSrc: webstormImage },
  { name: "Webstorm ", imageSrc: webstormImage },
  { name: "Webstorm ", imageSrc: webstormImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
  { name: "Webstorm ", imageSrc: danielImage },
];

export default function Credit() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 overflow-hidden bg-cover bg-no-repeat bg-center blur-sm"
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
                  }}
                  className="custom-form-container"
                >
                  <div className="flex items-center justify-between w-full">
                    <Link
                      to={paths.ABOUT_US}
                      onClick={() => paths.ABOUT_US}
                      className="flex items-center flex-row"
                    >
                      <ArrowBackIosIcon />
                      <span>About Us</span>
                    </Link>
                    <h1 className="text-4xl flex-grow text-center"> CREDIT</h1>
                  </div>
                  <br />
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
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
                    {tools.map((tool, index) => (
                      <div key={index}>
                        <CreditCard name={tool.name} imageSrc={tool.imageSrc} />
                      </div>
                    ))}
                  </div>
                  Tools
                  <br />
                  <br />
                  webstorm :https://www.jetbrains.com/webstorm/
                  <br />
                  github : https://github.com/
                  <br />
                  taiga : https://taiga.io/
                  <br />
                  AWS : https://aws.amazon.com/
                  <br />
                  cloud flare: https://www.cloudflare.com/en-gb/
                  <br />
                  docker : https://www.docker.com/
                  <br />
                  <br />
                  Other stuff
                  <br />
                  Project
                  <br />
                  Typescript: https://www.typescriptlang.org/
                  <br />
                  react : https://react.dev/
                  <br />
                  yarn : https://yarnpkg.com/
                  <br />
                  nodejs : https://nodejs.org/en
                  <br />
                  turbo: https://turbo.build/
                  <br />
                  vite : https://vitest.dev/
                  <br />
                  Prettier : https://prettier.io/
                  <br />
                  eslint : https://eslint.org/
                  <br />
                  husky :https://typicode.github.io/husky/
                  <br />
                  ts-node: https://typestrong.org/ts-node/docs/
                  <br />
                  nodemon: https://www.npmjs.com/package/nodemon
                  <br />
                  postgreSQL : https://www.postgresql.org/
                  <br />
                  prismaORM : https://www.prisma.io/
                  <br />
                  expressjs : https://expressjs.com/
                  <br />
                  traefik : https://doc.traefik.io/traefik/
                  <br />
                  Multer: https://www.npmjs.com/package/multer
                  <br />
                  Auth0: https://www.npmjs.com/package/multer
                  <br />
                  material ui :https://mui.com/
                  <br />
                  tailwind: https://tailwindcss.com/
                  <br />
                  axios : https://www.npmjs.com/package/axios
                  <br />
                  bootstrap: https://getbootstrap.com/
                  <br />
                  framer motion:https://www.framer.com/motion/
                  <br />
                  flowbite: https://flowbite.com/
                  <br />
                  Tan stake table:https://tanstack.com/table/v8
                  <br />
                  <div>
                    <br />
                    <p style={{ color: "#012D5A", textAlign: "center" }}>
                      {" "}
                      "Thanks to Brigham and Womens Hospital and their
                      represenative, Andrew Shin."{" "}
                    </p>
                    <label className="animate-pulse">
                      {" "}
                      The B&WH maps and data used in this app are copyrighted
                      and for educational use only.{" "}
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
