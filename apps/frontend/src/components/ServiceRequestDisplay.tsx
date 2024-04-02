export function ServiceRequestDisplay(props: {
  feedback: {
    serviceID: string;
    type: string;
    roomNum: string;
    deliveryInstructions: string;
    requestingUsernmae: string;
    timeStamp: string;
    location: string;
  };
}) {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4">{props.feedback.serviceID}</td>
      <td className="px-6 py-4">{props.feedback.type}</td>
      <td className="px-6 py-4">{props.feedback.roomNum}</td>
      <td className="px-6 py-4">{props.feedback.deliveryInstructions}</td>
      <td className="px-6 py-4">{props.feedback.requestingUsernmae}</td>
      <td className="px-6 py-4">{props.feedback.timeStamp}</td>
      <td className="px-6 py-4">{props.feedback.location}</td>
    </tr>

    // <div
    //     className={
    //         "justify-items-center w-full text-2xl border-2 border-gray-400 rounded-2xl p-10 flex flex-col gap-5 rounded-2"
    //     }
    // >
    //     <div className={"flex flex-col justify-items-center gap-2 px-10"}>
    //         <h1>Name:</h1>
    //         <p className={"pl-16"}>{props.feedback.serviceID}</p>
    //     </div>
    //     <div className={"flex flex-col justify-items-center gap-2 px-10"}>
    //         <h1>Feedback:</h1>
    //         <p className={"pl-16"}>{props.feedback.type}</p>
    //     </div>
    // </div>
  );
}
