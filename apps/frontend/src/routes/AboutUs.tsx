import "../styles/ServicesCard.css";
import FormContainer from "../components/FormContainer.tsx";
import * as React from "react";
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import ListSubheader from '@mui/material/ListSubheader';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';
import danielImage from "../../assets/people/Daniel.png";
// import mattImage from '../../assets/people/Matt.png';
// import taehaImage from '../../assets/people/Taeha.png';

// import ademImage from '../../assets/people/Adem.png';
export function AboutUs() {
  return (
    <FormContainer>
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
        <div className="-m-1 flex flex-wrap md:-m-2">
          <div className="flex w-1/3 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <img
                alt="Danielle Image"
                className="block h-full w-full rounded-lg object-cover object-center"
                src={danielImage}
              />
            </div>
          </div>
          <div className="flex w-1/3 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
              />
            </div>
          </div>
          <div className="flex w-1/3 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
              />
            </div>
          </div>
          <div className="flex w-1/3 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
              />
            </div>
          </div>
          <div className="flex w-1/3 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp"
              />
            </div>
          </div>
          <div className="flex w-1/3 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
              />
            </div>
          </div>
        </div>
      </div>
    </FormContainer>
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
