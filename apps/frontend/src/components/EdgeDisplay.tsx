export function EdgeDisplay(props: {
  edgeRequest: {
    edgeID: string;
    startNodeID: string;
    endNodeID: string;
  };
}) {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4">{props.edgeRequest.edgeID}</td>
      <td className="px-6 py-4">{props.edgeRequest.startNodeID}</td>
      <td className="px-6 py-4">{props.edgeRequest.endNodeID}</td>
    </tr>
  );
}
