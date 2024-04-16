import { Card } from "@mui/material";

function ServiceImages(props: { imgPath: string; alt: string }) {
  return (
    <div className="flex justify-center items-center w-full">
      <Card className="drop-shadow-2xl rounded-lg">
        <img src={props.imgPath} alt={props.alt} />
      </Card>
    </div>
  );
}

export default ServiceImages;
