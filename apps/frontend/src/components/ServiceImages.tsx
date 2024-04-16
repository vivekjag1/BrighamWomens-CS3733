function ServiceImages(props: { imgPath: string; alt: string }) {
  return (
    <div className="w-full h-full">
      <img
        src={props.imgPath}
        alt={props.alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default ServiceImages;
