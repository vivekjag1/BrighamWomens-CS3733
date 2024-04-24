import "../styles/ServicesCard.css";
import * as React from "react";

// import FormContainer from "../components/FormContainer.tsx";

import { Link } from "react-router-dom";
import ArrowBackIosIcon from "../components/ArrowbackIcon.tsx";
// import taehaImage from '../../assets/people/Taeha.png';
import background from "../../assets/bwh-exterior-default.png";
import { Card, CardContent, styled } from "@mui/material";
import paths from "../common/paths.tsx";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CreditCard from "../components/CreditCard.tsx";
import webstormImage from "../../assets/creditpics/webstormpics.png";
import githubImage from "../../assets/creditpics/githubpics.png";
import taigaImage from "../../assets/creditpics/taigapics.png";
import awsImage from "../../assets/creditpics/awspics.png";
import cloudfareImage from "../../assets/creditpics/cloudfarepics.png";
import dockerImage from "../../assets/creditpics/dockerpics.png";
import typescriptImage from "../../assets/creditpics/typescriptpics.png";
import reactImage from "../../assets/creditpics/reactpics.png";
import yarnImage from "../../assets/creditpics/yarn.png";
import nodeImage from "../../assets/creditpics/nodejspics.png";
import turboImage from "../../assets/creditpics/turbopics.svg";
import viteImage from "../../assets/creditpics/vitepics.jpg";
import prettierImage from "../../assets/creditpics/prettierpics.png";
import eslintImage from "../../assets/creditpics/eslintpics.jpg";
import huskyImage from "../../assets/creditpics/huskypics.png";
import tsnodeImage from "../../assets/creditpics/tsnodepics.png";
import nodemonImage from "../../assets/creditpics/nodemonpics.png";
import postgresqlImage from "../../assets/creditpics/postgresqlpics.png";
import prismaImage from "../../assets/creditpics/prismapics.png";
import expressjsImage from "../../assets/creditpics/expressjspics.png";
import traefikImage from "../../assets/creditpics/traefikpics.png";
import multerImage from "../../assets/creditpics/multerpics.png";
import auth0Image from "../../assets/creditpics/auth0pics.png";
import muiImage from "../../assets/creditpics/muipics.png";
import tailwindImage from "../../assets/creditpics/tailwindpics.png";
import axiosImage from "../../assets/creditpics/axiospics.png";
import bootstrapImage from "../../assets/creditpics/bootstrappics.png";
import framerMotionImage from "../../assets/creditpics/framermotionpics.png";
import flowbiteImage from "../../assets/creditpics/flowbitepics.png";
import tanstakeImage from "../../assets/creditpics/tanstakepics.png";

const CustomCardContent = styled(CardContent)({
  display: "flex",
  "&:last-child": {
    padding: 0,
    paddingBottom: 0,
  },
});

const tools = [
  {
    name: "Webstorm ",
    imageSrc: webstormImage,
    url: "https://www.jetbrains.com/webstorm/",
    urlName: "Webstorm Link",
  },
  {
    name: "GitHub ",
    imageSrc: githubImage,
    url: "https://github.com",
    urlName: "Git Hub Link",
  },
  {
    name: "Taiga ",
    imageSrc: taigaImage,
    url: "https://taiga.io",
    urlName: "Taiga Link",
  },
  {
    name: "AWS",
    imageSrc: awsImage,
    url: "https://aws.amazon.com",
    urlName: "AWS Link",
  },
  {
    name: "Cloud Flare ",
    imageSrc: cloudfareImage,
    url: "https://www.cloudflare.com/en-gb/",
    urlName: "Cloud Flare Link",
  },
  {
    name: "Docker ",
    imageSrc: dockerImage,
    url: "https://www.docker.com",
    urlName: "Docker Link",
  },
  {
    name: "Typescript ",
    imageSrc: typescriptImage,
    url: "https://www.typescriptlang.org",
    urlName: "Typescript Link",
  },
  {
    name: "React ",
    imageSrc: reactImage,
    url: "https://react.dev",
    urlName: "React Link",
  },
  {
    name: "Yarn ",
    imageSrc: yarnImage,
    url: "https://yarnpkg.com",
    urlName: "Yarn Link",
  },
  {
    name: "Nodejs ",
    imageSrc: nodeImage,
    url: "https://nodejs.org/en",
    urlName: "Nodejs Link",
  },
  {
    name: "Turbo ",
    imageSrc: turboImage,
    url: "https://turbo.build",
    urlName: "Turbo Link",
  },
  {
    name: "Vite ",
    imageSrc: viteImage,
    url: "https://vitest.dev",
    urlName: "Vite Link",
  },
  {
    name: "Prettier ",
    imageSrc: prettierImage,
    url: "https://prettier.io",
    urlName: "Prettier Link",
  },
  {
    name: "ESlint ",
    imageSrc: eslintImage,
    url: "https://eslint.org",
    urlName: "ESlint Link",
  },
  {
    name: "Husky ",
    imageSrc: huskyImage,
    url: "https://typicode.github.io/husky/",
    urlName: "Husky Link",
  },
  {
    name: "Ts-Node ",
    imageSrc: tsnodeImage,
    url: "https://typestrong.org/ts-node/docs/",
    urlName: "Ts-Node Link",
  },
  {
    name: "Nodemon ",
    imageSrc: nodemonImage,
    url: "https://www.npmjs.com/package/nodemon",
    urlName: "Nodemon Link",
  },
  {
    name: "postgreSQL ",
    imageSrc: postgresqlImage,
    url: " https://www.postgresql.org",
    urlName: "PostgreSQL Link",
  },
  {
    name: "prismaORM ",
    imageSrc: prismaImage,
    url: "https://www.prisma.io",
    urlName: "PrismaORM Link",
  },
  {
    name: "expressjs ",
    imageSrc: expressjsImage,
    url: "https://expressjs.com",
    urlName: "Expressjs Link",
  },
  {
    name: "traefik ",
    imageSrc: traefikImage,
    url: "https://doc.traefik.io/traefik/",
    urlName: "Traefik Link",
  },
  {
    name: "Multer ",
    imageSrc: multerImage,
    url: " https://www.npmjs.com/package/multer",
    urlName: "Multer Link",
  },
  {
    name: "Auth0 ",
    imageSrc: auth0Image,
    url: "https://auth0.com/",
    urlName: "Auth0 Link",
  },
  {
    name: "Material UI",
    imageSrc: muiImage,
    url: "https://mui.com",
    urlName: "Material UI Link",
  },
  {
    name: "Tailwind ",
    imageSrc: tailwindImage,
    url: "https://tailwindcss.com",
    urlName: "Tailwind Link",
  },
  {
    name: "Axios ",
    imageSrc: axiosImage,
    url: "https://www.npmjs.com/package/axios",
    urlName: "Axios Link",
  },
  {
    name: "Bootstrap ",
    imageSrc: bootstrapImage,
    url: "https://getbootstrap.com",
    urlName: "Bootstrap Link",
  },
  {
    name: "Framer Motion ",
    imageSrc: framerMotionImage,
    url: "https://www.framer.com/motion/",
    urlName: "Framer Motion Link",
  },
  {
    name: "Flowbite ",
    imageSrc: flowbiteImage,
    url: "https://flowbite.com",
    urlName: "Flowbite Link",
  },
  {
    name: "Tan stake table ",
    imageSrc: tanstakeImage,
    url: "https://tanstack.com/table/v8",
    urlName: "Tan Stake Link",
  },
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
                      <span className="absolute ml-5">About Us</span>
                    </Link>
                    <h1 className="text-4xl flex-grow text-center mr-6">
                      {" "}
                      CREDITS
                    </h1>
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
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
                    {tools.map((tool, index) => (
                      <div key={index}>
                        <CreditCard
                          name={tool.name}
                          imageSrc={tool.imageSrc}
                          urls={tool.url}
                          urlName={tool.urlName}
                        />
                      </div>
                    ))}
                  </div>
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
