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
import ButtonBlue from "../components/ButtonBlue.tsx";
import { Edge, Node } from "database";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TableFooter,
  Paper,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import NodeFilterDropdown from "../components/NodeFilterDropdown.tsx";

const NodeTable = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [authorizedStatus, setStatus] = useState<boolean>(false);
  const [edgeFile, setEdgeFile] = useState<File | null>(null);
  const [nodeFile, setNodeFile] = useState<File | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [activeTab, setActiveTab] = useState<string>("node");
  const nodeTableButtonRef = useRef<HTMLButtonElement>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filterBySearch, setFilterBySearch] = useState("");
  const [filteredNodes, setFilteredNodes] = useState<Node[]>([]);
  const [filteredEdges, setFilteredEdges] = useState<Edge[]>([]);
  const [filterByFloor, setFilterByFloor] = useState<string[]>([]);
  const [filterByBuilding, setFilterByBuilding] = useState<string[]>([]);
  const [filterByType, setFilterByType] = useState<string[]>([]);
  const { showToast } = useToast();

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - nodes.length) : 0;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(APIEndpoints.mapGetNodes);
        setNodes(res.data);
        console.log("Successfully got node data from get request:", res.data);
      } catch (error) {
        console.error("Error fetching node data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(APIEndpoints.mapGetEdges);
        setEdges(res.data);
        console.log("Successfully got edge data from get request:", res.data);
      } catch (error) {
        console.error("Error fetching edge data:", error);
      }
    }
    fetchData();
  }, []);

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

  useEffect(() => {
    let data = nodes;

    if (activeTab == "node") {
      if (filterBySearch) {
        data = data.filter(
          (item) =>
            item.nodeID
              .toString()
              .toLowerCase()
              .includes(filterBySearch.toLowerCase()) ||
            item.building
              .toLowerCase()
              .includes(filterBySearch.toLowerCase()) ||
            item.nodeType
              .toLowerCase()
              .includes(filterBySearch.toLowerCase()) ||
            item.longName.toLowerCase().includes(filterBySearch.toLowerCase()),
        );
      }
      if (filterByFloor.length) {
        data = data.filter((item) => filterByFloor.includes(item.floor));
      }
      if (filterByBuilding.length) {
        data = data.filter((item) => filterByBuilding.includes(item.building));
      }
      if (filterByType.length) {
        data = data.filter((item) => filterByType.includes(item.nodeType));
      }
      setFilteredNodes(data);
    } else {
      let data = edges;

      if (filterBySearch) {
        data = data.filter(
          (item) =>
            item.edgeID
              .toString()
              .toLowerCase()
              .includes(filterBySearch.toLowerCase()) ||
            item.startNodeID
              .toLowerCase()
              .includes(filterBySearch.toLowerCase()) ||
            item.endNodeID.toLowerCase().includes(filterBySearch.toLowerCase()),
        );
      }

      setFilteredEdges(data);
    }
    //
    // if (filterByType.length) {
    //     data = data.filter((item) => filterByType.includes(item.type));
    // }
    // if (filterByPriority.length) {
    //     data = data.filter((item) => filterByPriority.includes(item.priority));
    // }
    // if (filterByStatus.length) {
    //     data = data.filter((item) => filterByStatus.includes(item.status));
    // }
    // let sortedData = data.sort((a, b) => {
    //     return sortOrder === "asc"
    //         ? a.serviceID - b.serviceID
    //         : b.serviceID - a.serviceID;
    // });
  }, [
    filterBySearch,
    filteredNodes,
    nodes,
    activeTab,
    edges,
    filterByFloor,
    filterByBuilding,
    filterByType,
  ]);

  function highlightSearchTerm(text: string) {
    if (!filterBySearch.trim()) {
      return text;
    }

    const regex = new RegExp(`(${filterBySearch})`, "gi");
    const attributes = text.split(regex);

    return (
      <span>
        {attributes.map((part, index) =>
          regex.test(part) ? (
            <span key={index} className="bg-yellow-100">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </span>
    );
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
            <div className="relative">
              <div className="flex flex-column sm:flex-row flex-wrap space-y-2 sm:space-y-0 items-center justify-between pb-2">
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-[20rem] bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for Map Data"
                    value={filterBySearch}
                    onChange={(e) => setFilterBySearch(e.target.value)}
                  />
                  {filterBySearch && (
                    <button
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setFilterBySearch("")}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {activeTab === "node" && (
                  <div>
                    <NodeFilterDropdown
                      filterByFloor={filterByFloor}
                      setFilterByFloor={setFilterByFloor}
                      filterByBuilding={filterByBuilding}
                      setFilterByBuilding={setFilterByBuilding}
                      filterByType={filterByType}
                      setFilterByType={setFilterByType}
                    />
                  </div>
                )}
              </div>

              {activeTab === "node" && (
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer className="shadow-md">
                    <Table className="text-center text-gray-50e">
                      <TableHead className="text-xs text-gray-50 uppercase bg-secondary">
                        <TableRow
                          sx={{
                            "& > th": {
                              backgroundColor: "#f9fafb",
                              color: "#012D5A",
                              padding: "8px 16px",
                              textAlign: "center",
                              fontFamily: "Poppins, sans-serif",
                              fontSize: "0.76rem",
                              fontWeight: "bold",
                            },
                          }}
                        >
                          <TableCell>Node ID</TableCell>
                          <TableCell>xCoord</TableCell>
                          <TableCell>yCoord</TableCell>
                          <TableCell>Floor</TableCell>
                          <TableCell>Building</TableCell>
                          <TableCell>Node Type</TableCell>
                          <TableCell>Long Name</TableCell>
                          <TableCell>Short Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredNodes
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                          .map((node) => (
                            <TableRow
                              key={node.nodeID}
                              hover
                              style={{ cursor: "pointer" }}
                              sx={{
                                "& > td": {
                                  color: "#6B7280",
                                  textAlign: "center",
                                  fontFamily: "Poppins, sans-serif",
                                  fontSize: "0.875rem",
                                },
                              }}
                            >
                              <TableCell
                                style={{ width: "15ch", maxWidth: "15ch" }}
                              >
                                {highlightSearchTerm(node.nodeID)}
                              </TableCell>
                              <TableCell
                                style={{ width: "10ch", maxWidth: "10ch" }}
                              >
                                {node.xcoord}
                              </TableCell>
                              <TableCell
                                style={{ width: "10ch", maxWidth: "10ch" }}
                              >
                                {node.ycoord}
                              </TableCell>
                              <TableCell
                                style={{ width: "7ch", maxWidth: "7ch" }}
                              >
                                {node.floor}
                              </TableCell>
                              <TableCell
                                style={{ width: "15ch", maxWidth: "15ch" }}
                              >
                                {highlightSearchTerm(node.building)}
                              </TableCell>
                              <TableCell
                                style={{ width: "12ch", maxWidth: "12ch" }}
                              >
                                {highlightSearchTerm(node.nodeType)}
                              </TableCell>
                              <TableCell
                                style={{ width: "30ch", maxWidth: "30ch" }}
                              >
                                {highlightSearchTerm(node.longName)}
                              </TableCell>
                              <TableCell
                                style={{ width: "30ch", maxWidth: "30ch" }}
                              >
                                {node.shortName}
                              </TableCell>
                            </TableRow>
                          ))}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 73 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            colSpan={9}
                            count={nodes.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{
                              ".MuiTablePagination-selectLabel": {
                                fontFamily: "Poppins, sans-serif",
                              },
                              ".MuiTablePagination-select": {
                                fontFamily: "Poppins, sans-serif",
                              },
                              ".MuiButtonBase-root": {
                                fontFamily: "Poppins, sans-serif",
                              },
                              ".MuiTablePagination-selectRoot": {
                                fontFamily: "Poppins, sans-serif",
                              },
                            }}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Paper>
              )}

              {activeTab === "edge" && (
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer className="shadow-md">
                    <Table className="text-center text-gray-50">
                      <TableHead className="text-xs text-gray-50 uppercase bg-secondary">
                        <TableRow
                          sx={{
                            "& > th": {
                              backgroundColor: "#f9fafb",
                              color: "#012D5A",
                              padding: "8px 16px",
                              textAlign: "center",
                              fontFamily: "Poppins, sans-serif",
                              fontSize: "0.76rem",
                              fontWeight: "bold",
                            },
                          }}
                        >
                          <TableCell>Edge ID</TableCell>
                          <TableCell>startNodeID</TableCell>
                          <TableCell>endNodeID</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredEdges
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                          .map((edge) => (
                            <TableRow
                              key={edge.edgeID}
                              hover
                              style={{ cursor: "pointer" }}
                              sx={{
                                "& > td": {
                                  color: "#6B7280",
                                  textAlign: "center",
                                  fontFamily: "Poppins, sans-serif",
                                  fontSize: "0.875rem",
                                },
                              }}
                            >
                              <TableCell
                                style={{ width: "30ch", maxWidth: "30ch" }}
                              >
                                {highlightSearchTerm(edge.edgeID)}
                              </TableCell>
                              <TableCell
                                style={{ width: "20ch", maxWidth: "20ch" }}
                              >
                                {highlightSearchTerm(edge.startNodeID)}
                              </TableCell>
                              <TableCell
                                style={{ width: "20ch", maxWidth: "20ch" }}
                              >
                                {highlightSearchTerm(edge.endNodeID)}
                              </TableCell>
                            </TableRow>
                          ))}
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 73 * emptyRows }}>
                            <TableCell colSpan={3} />
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            colSpan={3}
                            count={edges.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{
                              ".MuiTablePagination-selectLabel": {
                                fontFamily: "Poppins, sans-serif",
                              },
                              ".MuiTablePagination-select": {
                                fontFamily: "Poppins, sans-serif",
                              },
                              ".MuiButtonBase-root": {
                                fontFamily: "Poppins, sans-serif",
                              },
                              ".MuiTablePagination-selectRoot": {
                                fontFamily: "Poppins, sans-serif",
                              },
                            }}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Paper>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NodeTable;
