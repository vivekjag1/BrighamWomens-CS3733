import { Button } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { APIEndpoints, mapAttributes } from "common/src/api";
import { EdgeGetter } from "../components/EdgeGetter.tsx";
import { NodeGetter } from "../components/NodeGetter.tsx";
const NodeTable = () => {
  const [edgeFile, setEdgeFile] = useState<File | null>(null);
  const [nodeFile, setNodeFile] = useState<File | null>(null);

  const [activeTab, setActiveTab] = useState<string>("node");
  const nodeTableButtonRef = useRef<HTMLButtonElement>(null);
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (nodeTableButtonRef.current) {
      nodeTableButtonRef.current.focus();
    }
  }, []);

  const getButtonClasses = (tabName: string): string => {
    return `inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 ${
      activeTab === tabName
        ? "text-blue-500 border-blue-500" // Active tab styles
        : "border-gray-300 focus:text-blue-500 focus:border-blue-500" // Inactive tab styles
    } focus:outline-none`;
  };

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
    const retFromAPI = await axios.post(APIEndpoints.mapDownload); //get info from route
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
    // try {
    if (edgeFile != null && nodeFile != null) {
      const formData = new FormData();
      formData.append(mapAttributes.nodeMulterKey, nodeFile, nodeFile.name);
      formData.append(mapAttributes.edgeMulterKey, edgeFile, edgeFile.name);
      const res = await axios.post(APIEndpoints.mapUpload, formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });

      if (res.status == 202) {
        console.log("400");
        alert("File(s) failed validation!");
      } else {
        alert("Map data uploaded!");
        console.log("success");
        location.reload();
      }
    }
    // } catch (error) {
    //     console.error("Upload failed:", error);
    //     alert("Failed to upload map data!");
    // }
  }

  // File Validation

  //   if (edgeFile != null && nodeFile != null) {
  //
  //       const formData = new FormData();
  //     formData.append(mapAttributes.nodeMulterKey, nodeFile, nodeFile.name);
  //     formData.append(mapAttributes.edgeMulterKey, edgeFile, edgeFile.name);
  //
  //       await  axios
  //       .post(APIEndpoints.mapUpload, formData, {
  //         headers: {
  //           "Content-Type": `multipart/form-data`,
  //         },
  //       })
  //       .then(() => {
  //         console.log("success!");
  //         alert("Map data uploaded!");
  //       })
  //       .catch((error) => {
  //         console.error("Upload failed:", error);
  //         alert("Failed to upload map data!");
  //       });
  //   } else {
  //     alert("One or more files are missing!");
  //   }
  // }

  return (
    <div className="w-full items-center">
      <h1 className="pt-5 text-3xl text-center font-bold">Upload Map Data</h1>
      <hr className="w-9/12 mx-auto m-4"></hr>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-2 pl-20">
            {/* Import Node CSV */}
            <div className="flex flex-row items-center pl-4">
              <p className="mr-2">Import Node CSV:</p>
              <input
                id="importNodeFile"
                type="file"
                accept=".csv"
                name="Import Node File"
                onChange={nodeFileChange} // Ensure this function is defined in your component
              />
            </div>
            {/* Import Edge CSV */}
            <div className="flex flex-row items-center pl-4">
              <p className="mr-2">Import Edge CSV:</p>
              <input
                id="importEdgeFile"
                type="file"
                accept=".csv"
                name="Import Edge File"
                onChange={edgeFileChange} // Ensure this function is defined in your component
              />
            </div>
          </div>

          {/* Row for Upload and Download Buttons */}
          <div className="flex flex-row items-center gap-2 mb-5 mt-2">
            <div>
              <Button variant="contained" onClick={uploadFiles}>
                Upload Map Data
              </Button>
            </div>
            <div>
              <Button variant="contained" onClick={downloadFiles}>
                Download Map Data
              </Button>
            </div>
          </div>
        </div>

        <hr className="m-1" />
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center justify-center mb-5"
          id="default-tab"
        >
          <li className="mr-2" role="presentation">
            <button
              className={getButtonClasses("node")}
              onClick={() => handleTabChange("node")}
              type="button"
            >
              Node Table
            </button>
          </li>
          <li role="presentation">
            <button
              className={getButtonClasses("edge")}
              onClick={() => handleTabChange("edge")}
              type="button"
            >
              Edge Table
            </button>
          </li>
        </ul>

        {activeTab === "node" && (
          <div>
            {/*<h2 className="text-3xl font-bold">Node Table</h2>*/}
            <table className="text-sm text-center text-gray-500 mt-3 shadow-md">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
        )}

        {activeTab === "edge" && (
          <div>
            {/*<h2 className="text-3xl font-bold">Edge Table</h2>*/}
            <table className="text-sm text-gray-500 mt-3 shadow-md text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
        )}
      </div>
    </div>
  );
};

export default NodeTable;
