import { checkAuth } from "../checkAdminStatus.ts";
import React, { useEffect, useRef, useState } from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "../components/useToast.tsx";
import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
import { APIEndpoints, FileAttributes } from "common/src/APICommon.ts";
import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
import { NodeGetter } from "../components/NodeGetter.tsx";
import { EdgeGetter } from "../components/EdgeGetter.tsx";
import ButtonBlue from "../components/ButtonBlue.tsx";

const NodeTable = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [authorizedStatus, setStatus] = useState<boolean>(false);
  const [edgeFile, setEdgeFile] = useState<File | null>(null);
  const [nodeFile, setNodeFile] = useState<File | null>(null);

  const [activeTab, setActiveTab] = useState<string>("node");
  const nodeTableButtonRef = useRef<HTMLButtonElement>(null);
  const { showToast } = useToast();

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (nodeTableButtonRef.current) {
      nodeTableButtonRef.current.focus();
    }
  }, []);
  useEffect(() => {
    const checkRole = async () => {
      const token = await getAccessTokenSilently();
      const result = await checkAuth(token, "mapdata");
      setStatus(result!);
    };
    checkRole().then();
  }, [getAccessTokenSilently]);
  const getButtonClasses = (tabName: string): string => {
    return `inline-block p-4 rounded-t-lg hover:text-blue-500 hover:border-blue-500 ${
      activeTab === tabName
        ? "text-[#012D5A] border-[#012D5A] border-b-[3px]" // Active tab styles
        : "border-gray-300 border-gray-300 focus:text-blue-500 focus:border-blue-500 border-b-2" // Inactive tab styles
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
    console.log("called  download files");

    const token = await getAccessTokenSilently();
    const retFromAPI = await MakeProtectedGetRequest(
      APIEndpoints.mapDownload,
      token,
    );
    console.log("hello world");

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
    try {
      if (edgeFile != null && nodeFile != null) {
        const formData = new FormData();
        formData.append(FileAttributes.nodeKey, nodeFile, nodeFile.name);
        formData.append(FileAttributes.edgeKey, edgeFile, edgeFile.name);
        const token = await getAccessTokenSilently();
        const res = await MakeProtectedPostRequest(
          APIEndpoints.mapUpload,
          formData,
          token,
        );
        if (res.status == 202) {
          console.log("bad file");
          showToast("File(s) failed validation!", "error");
        } else {
          console.log("success");
          showToast("Map data uploaded!", "success");
          location.reload();
        }
      } else {
        showToast("One or more map files are missing!", "error");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      showToast("Failed to upload map data!", "error");
    }
  }

  return (
    <div className=" h-screen overflow-y-scroll bg-offwhite">
      <div className="w-full items-center">
        <div className="flex flex-col items-center gap-8 ">
          <div className="flex flex-col items-center gap-2 mt-8">
            <h2 className="w-full text-3xl font-bold text-center">Map Data</h2>
            <h2 className="w-full text-md text-center">
              View and modify map data files
            </h2>
            <hr className="pl-96 pr-96" />
          </div>

          <div className="flex flex-col items-center">
            {authorizedStatus && (
              <>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex flex-row items-center">
                      <ButtonBlue
                        component="label"
                        style={{
                          backgroundColor: nodeFile ? "green" : "",
                        }}
                        endIcon={nodeFile ? undefined : <FileUploadIcon />}
                      >
                        {nodeFile ? "Nodes: " + nodeFile.name : "Node File"}
                        <input
                          id="importNodeFile"
                          type="file"
                          accept=".csv"
                          name="Import Node File"
                          onChange={nodeFileChange}
                          hidden
                        />
                      </ButtonBlue>
                    </div>
                    <div className="flex flex-row items-center">
                      <ButtonBlue
                        component="label"
                        style={{
                          backgroundColor: edgeFile ? "green" : "",
                        }}
                        endIcon={edgeFile ? undefined : <FileUploadIcon />}
                      >
                        {edgeFile ? "Edges: " + edgeFile.name : "Edge File"}
                        <input
                          id="importEdgeFile"
                          type="file"
                          accept=".csv"
                          name="Import Edge File"
                          onChange={edgeFileChange}
                          hidden
                        />
                      </ButtonBlue>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-2 mb-5 mt-2">
                    <div>
                      <ButtonBlue
                        onClick={uploadFiles}
                        endIcon={<CloudUploadIcon />}
                      >
                        Upload
                      </ButtonBlue>
                    </div>
                    <div>
                      <ButtonBlue
                        onClick={downloadFiles}
                        endIcon={<CloudDownloadIcon />}
                      >
                        Download Data
                      </ButtonBlue>
                    </div>
                  </div>
                </div>
              </>
            )}
            <hr className="m-1" />
            <ul
              className="flex flex-wrap text-sm font-medium text-center justify-center mb-5"
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
              <div className="mx-8">
                <table className="text-sm text-center text-gray-500 mt-3 shadow-md mb-10">
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
                      <th scope="col" className="px-0 py-3">
                        longName
                      </th>
                      <th scope="col" className="px-0 py-3">
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
                <table className="text-sm text-gray-500 mt-3 shadow-md text-center mb-10">
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
      </div>
    </div>
  );
};
export default NodeTable;
