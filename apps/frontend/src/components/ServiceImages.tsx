function ServiceImages(props: { imgPath: string; alt: string }) {
  return (
    <div className="flex justify-center items-center w-full">
      <img className="w-8/12" src={props.imgPath} alt={props.alt} />
    </div>
  );
}

export default ServiceImages;
