import "../styles/ServicesCard.css";
// import FormContainer from "../components/FormContainer.tsx";
import * as React from "react";
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import ListSubheader from '@mui/material/ListSubheader';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';
import josephImage from "../../assets/people/joseph.png";
import danielImage from "../../assets/people/Daniel.png";
import FormContainer from "../components/FormContainer.tsx";
import mattImage from "../../assets/people/Matt.png";
// import taehaImage from '../../assets/people/Taeha.png';
import andyImage from "../../assets/people/Andy.png";
import vivekImage from "../../assets/people/Vivek.png";
import ademImage from "../../assets/people/Adem.png";
import suliImage from "../../assets/people/Suli.png";
import frankyImage from "../../assets/people/Franky.png";
import colinImage from "../../assets/people/Colin.png";
import griffinImage from "../../assets/people/Griffin.png";
import taehaImage from "../../assets/people/Taeha.png";
export function AboutUs() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 className=" text-4xl"> About Us </h1>
      <p style={{ color: "grey" }}> WPI Computer Science Department</p>
      <hr className="pl-96 pr-96" />
      <br />
      <p style={{ color: "grey" }}> CS3733-D24 (Software Engineering)</p>
      <p style={{ color: "grey" }}> Professor. Wilson Wong🐻</p>
      <div
        style={{
          width: "100%",
          height: "25%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <FormContainer>
          <img
            className="block h-full w-20 rounded-lg object-cover object-center"
            src={josephImage}
          />
          <label>
            {" "}
            Joseph cardsasd
            <br /> Team Coach
          </label>
        </FormContainer>
        <FormContainer>
          <img
            className="block h-full w-20 rounded-lg object-cover object-center"
            src={danielImage}
          />
          <label>
            {" "}
            Danielle Godlfioew
            <br /> Lead SWE
          </label>
        </FormContainer>
        <FormContainer>
          <img
            className="block h-full w-20 rounded-lg object-cover object-center"
            src={andyImage}
          />
          <label>
            {" "}
            Andy Troug
            <br /> Assistant Lead
          </label>
        </FormContainer>
      </div>

      <div
        style={{
          width: "100%",
          height: "25%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <FormContainer>
          <img
            className="block h-full w-20 rounded-lg object-cover object-center"
            src={vivekImage}
          />
          <label>
            {" "}
            Vivek jadfasd
            <br /> Assistant Lead
          </label>
        </FormContainer>
        <FormContainer>
          <img
            className="block h-full w-20 rounded-lg object-cover object-center"
            src={mattImage}
          />
          <label>
            {" "}
            MAttherg bowewoe
            <br /> Project Manager
          </label>
        </FormContainer>
        <FormContainer>
          <img
            className="block h-full w-20 rounded-lg object-cover object-center"
            src={ademImage}
          />
          <label>
            {" "}
            Mohalkgnla adem
            <br /> Scrum Master
          </label>
        </FormContainer>
      </div>

      <div
        style={{
          width: "100%",
          height: "20%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <FormContainer>
          <img
            className="block h-full w-20 rounded-lg object-cover object-center"
            src={suliImage}
          />
          <label>
            {" "}
            Sulimanf masdgsdg
            <br /> Product Owner
          </label>
        </FormContainer>
        <FormContainer>
          <img
            className="block h-full w-20 rounded-lg object-cover object-center"
            src={frankyImage}
          />
          <label>
            {" "}
            Frank dmi meiwf
            <br /> Documentation
          </label>
        </FormContainer>
        <FormContainer>
          <img
            className="block h-full w-20 rounded-lg object-cover object-center"
            src={colinImage}
          />
          <label>
            {" "}
            colin masgucci
            <br /> Front-End
          </label>
        </FormContainer>
      </div>

      <div
        style={{
          width: "100%",
          height: "20%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <FormContainer>
          <img
            className="block h-full w-20 rounded-lg object-cover object-center"
            src={griffinImage}
          />
          <label>
            {" "}
            Grifif brown
            <br /> Algorithm
          </label>
        </FormContainer>
        <FormContainer>
          <img
            className="block h-full w-20 rounded-lg object-cover object-center"
            src={taehaImage}
          />
          <label>
            {" "}
            Taeha Song
            <br /> Front-End
          </label>
        </FormContainer>
      </div>
    </div>
  );
}

// const itemData = [
//   {
//     img: danielImage,
//     title: 'Danielle Gorouv',
//     author: 'Lead SWE',
//     rows: 2,
//     cols: 2,
//     featured: true,
//   },
//   {
//     img: mattImage,
//     title: 'Mattew Brown',
//     author: 'Project Manager',
//
//   },
//   {
//     img: taehaImage,
//     title: 'Taeha',
//     author: 'Frontend',
//   },
//
// ];
// export default AboutUs;

{
  /*<h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">*/
}
{
  /*  About Us*/
}
{
  /*</h1>*/
}
{
  /*<FormContainer>*/
}
{
  /*  <ImageList sx={{ width: 500, height: 450 }}>*/
}
{
  /*    <ImageListItem key="Subheader" cols={3}>*/
}
{
  /*      <ListSubheader component="div">Introduce Our Developer</ListSubheader>*/
}
{
  /*    </ImageListItem>*/
}
{
  /*    {itemData.map((item) => (*/
}
{
  /*      <ImageListItem key={item.img}>*/
}
{
  /*        <img*/
}
{
  /*          srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}*/
}
{
  /*          src={`${item.img}?w=248&fit=crop&auto=format`}*/
}
{
  /*          alt={item.title}*/
}
{
  /*          loading="lazy"*/
}
{
  /*        />*/
}
{
  /*        <ImageListItemBar*/
}
{
  /*          title={item.title}*/
}
{
  /*          subtitle={item.author}*/
}
{
  /*          actionIcon={*/
}
{
  /*            <IconButton*/
}
{
  /*              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}*/
}
{
  /*              aria-label={`info about ${item.title}`}*/
}
{
  /*            >*/
}
{
  /*              <InfoIcon />*/
}
{
  /*            </IconButton>*/
}
{
  /*          }*/
}
{
  /*        />*/
}
{
  /*      </ImageListItem>*/
}
{
  /*    ))}*/
}
{
  /*  </ImageList>*/
}
{
  /*</FormContainer>*/
}
