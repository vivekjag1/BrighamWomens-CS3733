function ServiceImages(props: { imgPath: string; alt: string }) {
  return (
    <div>
      <div
        style={{
          background:
            "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 15%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)",
          position: "absolute",
          width: "20%",
          height: "100%",
        }}
      ></div>
      <img
        src={props.imgPath}
        alt={props.alt}
        className="w-[40rem] h-[750px] object-cover"
      />
    </div>
  );
}

export default ServiceImages;
