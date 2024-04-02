import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { APIEndpoints, mapAttributes } from "common/src/api";
import { EdgeGetter } from "../components/EdgeGetter.tsx";
import { NodeGetter } from "../components/NodeGetter.tsx";
const NodeTable = () => {
  const [edgeFile, setEdgeFile] = useState<File | null>(null);
  const [nodeFile, setNodeFile] = useState<File | null>(null);

  const edgeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setEdgeFile(event.target.files[0]);
    }
  };

  const nodeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setNodeFile(event.target.files[0]);
    }
  };

  async function downloadFiles() {
    const retFromAPI = await axios.post("/api/map/exportMap"); //get info from route
    const nodeBlob = new Blob([retFromAPI.data[1]], {
      type: "text/csv;charset =utf-8",
    }); //create blob
    const nodeLink = document.createElement("a"); //create elements as anchor
    const edgeLink = document.createElement("a");
    const edgeBlob = new Blob([retFromAPI.data[0]], {
      type: "text/csv;charset =utf-8",
    }); //create blob
    nodeLink.href = URL.createObjectURL(nodeBlob); //create links
    edgeLink.href = URL.createObjectURL(edgeBlob);
    nodeLink.download = "Nodes"; //name files
    edgeLink.download = "Edges";
    nodeLink.click(); //open them
    edgeLink.click();
  }

  async function uploadFiles() {
    if (edgeFile != null && nodeFile != null) {
      const formData = new FormData();
      formData.append(mapAttributes.nodeMulterKey, nodeFile, nodeFile.name);
      formData.append(mapAttributes.edgeMulterKey, edgeFile, edgeFile.name);
      await axios
        .post(APIEndpoints.mapUpload, formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        })
        .then(() => {
          console.log("success!");
          alert("Map data uploaded!");
        })
        .catch((error) => {
          console.error("Upload failed:", error);
          alert("Failed to upload map data!");
        });
    } else {
      alert("One or more files are missing!");
    }
  }

  return (
    <div className="w-full grid justify-items-center">
      <div>
        <h1 className="pt-9 text-3xl text-center">
          Upload File with Node Data
        </h1>
        <div className="flex justify-end pr-3">
          <Button variant="contained">Export Map Data</Button>
        </div>
        <hr className="m-8" />
        <div className="w-screen h-screen flex flex-col items-center gap-[2vh]">
          <div>
            {" "}
            {/*import/export buttons*/}
            <div className="flex justify-between">
              <div className="flex">
                <p className="mr-2 mt-1">Import Node CSV:</p>
                <input
                  id="csvFile"
                  type="file"
                  accept=".csv"
                  name="Import Node File"
                  onChange={nodeFileChange}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex">
                  <p className="mr-2 mt-1">Import Edge CSV:</p>
                  <input
                    id="csvFile"
                    type="file"
                    accept=".csv"
                    name="Import Edge File"
                    onChange={edgeFileChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button variant="contained" onClick={uploadFiles}>
                Upload Map Data
              </Button>
              <Button variant="contained" onClick={downloadFiles}>
                Download Map Data
              </Button>
            </div>
            <h2 className="text-3xl font-bold mt-[2vh] pt-9">Node Table</h2>
            <table className="text-sm text-center text-gray-500 mt-3">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 drop-shadow-lg">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    nodeID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    xcoord
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ycoord
                  </th>
                  <th scope="col" className="px-6 py-3">
                    floor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    building
                  </th>
                  <th scope="col" className="px-6 py-3">
                    nodeType
                  </th>
                  <th scope="col" className="px-6 py-3">
                    longName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    shortName
                  </th>
                </tr>
              </thead>
              {<NodeGetter />}
            </table>
          </div>
          <div className="w-screen h-screen relative left-64">
            <h2 className="text-3xl font-bold mt-[2vh] left-10 pt-9">
              Edge Table
            </h2>
            <table className="text-sm text-center text-gray-500 mt-3">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 drop-shadow-lg">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    edgeID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    startNodeID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    endNodeID
                  </th>
                </tr>
              </thead>
              {<EdgeGetter />}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeTable;
