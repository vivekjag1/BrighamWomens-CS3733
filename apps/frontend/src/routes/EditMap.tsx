import MapEditingComponent from "../components/MapEditingComponent.tsx";
import MapEditButton from "../components/MapEditButton.tsx";
import { useState } from "react";
import { APIEndpoints } from "common/src/APICommon.ts";
import { Node, Edge } from "database";
import axios from "axios";

function EditMap() {
  const [coords, setCoords] = useState<number[][]>([
    [0, 0],
    [0, 0],
  ]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  async function formHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevent page refresh

    await axios
      .get(APIEndpoints.mapGetNodes)
      .then((response) => {
        setNodes(response.data);
      })
      .catch(console.error);

    await axios
      .get(APIEndpoints.mapGetEdges)
      .then((response) => {
        setEdges(response.data);
      })
      .catch(console.error);

    setCoords([[0, 0]]);

    console.log(nodes);
    console.log(edges);
  }

  return (
    <div>
      <div className="relative">
        <MapEditingComponent coords={coords} />
        <div className="absolute top-4 left-4">
          <MapEditButton onSubmit={formHandler} />
        </div>
      </div>
    </div>
  );
}

export default EditMap;
