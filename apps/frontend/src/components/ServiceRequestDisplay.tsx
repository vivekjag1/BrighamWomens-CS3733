export function ServiceRequestDisplay(props: {
  request: {
    serviceID: string;
    type: string;
    roomNum: string;
    deliveryInstructions: string;
    requestingUsername: string;
    timeStamp: string;
    location: string;
  };
}) {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4">{props.request.serviceID}</td>
      <td className="px-6 py-4">{props.request.type}</td>
      <td className="px-6 py-4">{props.request.roomNum}</td>
      <td className="px-6 py-4">
        {props.request.deliveryInstructions.trim() === ""
          ? "N/A"
          : props.request.deliveryInstructions}
      </td>
      <td className="px-6 py-4">{props.request.requestingUsername}</td>
      <td className="px-6 py-4">{props.request.timeStamp}</td>
      <td className="px-6 py-4">{props.request.location}</td>
    </tr>
  );
}
