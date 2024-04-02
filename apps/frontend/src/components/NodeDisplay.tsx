export function NodeDisplay(props: {
  nodeRequest: {
    nodeID: string;
    xcoord: string;
    ycoord: string;
    floor: string;
    building: string;
    nodeType: string;
    longName: string;
    shortName: string;
  };
}) {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4">{props.nodeRequest.nodeID}</td>
      <td className="px-6 py-4">{props.nodeRequest.xcoord}</td>
      <td className="px-6 py-4">{props.nodeRequest.ycoord}</td>
      <td className="px-6 py-4">{props.nodeRequest.floor}</td>
      <td className="px-6 py-4">{props.nodeRequest.building}</td>
      <td className="px-6 py-4">{props.nodeRequest.nodeType}</td>
      <td className="px-6 py-4">{props.nodeRequest.longName}</td>
      <td className="px-6 py-4">{props.nodeRequest.shortName}</td>
    </tr>
  );
}
