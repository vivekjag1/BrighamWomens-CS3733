import "./ServiceCard.css";
function ServiceCard(props: { imgPath: string; alt: string; label: string }) {
  return (
    <div className="bg-white w-[16vw] h-[16vw] flex flex-col justify-center items-center gap-4 border-2 border-secondary service-request hover:bg-zinc-200 rounded-3xl shadow-lg drop-shadow">
      <img className="w-8/12" src={props.imgPath} alt={props.alt} />
      <h2 className="text-center font-light text-xl ">{props.label}</h2>
    </div>
  );
}

export default ServiceCard;
