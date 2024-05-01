import { checkAuth } from "../checkAdminStatus.ts";
import React, { useEffect, useRef, useState } from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "../components/useToast.tsx";
import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
import { APIEndpoints, FileAttributes } from "common/src/APICommon.ts";
import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
import ButtonBlue from "../components/ButtonBlue.tsx";
import { Edge, Node } from "database";
import FolderIcon from "@mui/icons-material/Folder";
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
  CardContent,
  Card,
  Chip,
} from "@mui/material";
import axios from "axios";
import NodeFilterDropdown from "../components/NodeFilterDropdown.tsx";
import EdgeFilterDropdown from "../components/EdgeFilterDropdown.tsx";
// import { AnimatePresence, motion } from "framer-motion";
import CustomModal from "../components/CustomModal.tsx";
import CloseIcon from "@mui/icons-material/Close";

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
  const [filterByEdgeType, setFilterByEdgeType] = useState<string[]>([]);
  const [dataUpdated, setDataUpdated] = useState<boolean>(false);
  const [fileModal, setFileModal] = useState<boolean>(false);
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
      } catch (error) {
        console.error("Error fetching node data:", error);
      }
    }
    fetchData();
  }, [dataUpdated]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(APIEndpoints.mapGetEdges);
        setEdges(res.data);
      } catch (error) {
        console.error("Error fetching edge data:", error);
      }
    }
    fetchData();
  }, [dataUpdated]);

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

  async function downloadFiles() {
    setFileModal(false);
    const token = await getAccessTokenSilently();
    const retFromAPI = await MakeProtectedGetRequest(
      APIEndpoints.mapDownload,
      token,
    );

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
    showToast("Map data downloaded!", "success");
  }

  const handleDrop = (event: React.DragEvent) => {
    // console.log(event);
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (!file) return;

      const fileName = file.name.toLowerCase();
      if (fileName.toLowerCase().includes("node")) {
        setNodeFile(file);
      } else if (fileName.toLowerCase().includes("edge")) {
        setEdgeFile(file);
      } else {
        setFileModal(false);
        showToast(
          "File does not match 'node' or 'edge' naming conventions",
          "error",
        );
      }
    }
  };

  const handleDragOver = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const fileChange = (event: React.BaseSyntheticEvent) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    if (fileName.toLowerCase().includes("node")) {
      setNodeFile(file);
    } else if (fileName.toLowerCase().includes("edge")) {
      setEdgeFile(file);
    } else {
      setFileModal(false);
      showToast(
        "File does not match 'node' or 'edge' naming conventions",
        "error",
      );
    }
  };

  async function uploadFiles() {
    setFileModal(false);
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
          console.error("bad file");
          showToast("File(s) failed validation!", "error");
        } else {
          showToast("Map data uploaded!", "success");
          setEdgeFile(null);
          setNodeFile(null);
          setDataUpdated(true);
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
    if (activeTab == "node") {
      let data = nodes;
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
      if (filterByEdgeType.length) {
        // console.log(filterByEdgeType);
        data = data.filter((item) =>
          filterByEdgeType.some((filterType) =>
            item.edgeID.includes(filterType),
          ),
        );
      }

      setFilteredEdges(data);
    }
  }, [
    filterByEdgeType,
    filterBySearch,
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

  // const modalVariants = {
  //     hidden: {
  //         opacity: 0,
  //         scale: 0.75
  //     },
  //     visible: {
  //         opacity: 1,
  //         scale: 1,
  //         transition: {
  //             duration: 0.5,
  //             type: "spring",
  //             damping: 25,
  //             stiffness: 500
  //         }
  //     }
  // };

  const getButtonClasses = (tabName: string): string => {
    return `inline-block w-full p-2 text-md hover:underline ${
      activeTab === tabName
        ? "text-secondary border-[#012D5A] border-b-[.15rem]"
        : "border-white border-b-2"
    } focus:outline-none`;
  };

  function TabComponent() {
    return (
      <TableRow>
        <TableCell align="center" colSpan={100} sx={{ padding: 0 }}>
          <ul
            className="flex text-sm font-medium text-center justify-center"
            id="default-tab"
            style={{ width: "100%" }}
          >
            <li className="flex-1" role="presentation">
              <button
                className={getButtonClasses("node")}
                onClick={() => handleTabChange("node")}
                type="button"
                style={{ borderTopLeftRadius: ".5rem" }}
              >
                Node Table
              </button>
            </li>
            <li className="flex-1" role="presentation">
              <button
                className={getButtonClasses("edge")}
                onClick={() => handleTabChange("edge")}
                type="button"
                style={{ borderTopRightRadius: ".5rem" }}
              >
                Edge Table
              </button>
            </li>
          </ul>
        </TableCell>
      </TableRow>
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
          </div>

          <div className="flex flex-col items-center">
            <div className="w-[72rem]">
              <div className="relative">
                <div className="flex flex-column sm:flex-row flex-wrap space-y-2 sm:space-y-0 items-center justify-between pb-2">
                  {authorizedStatus && (
                    <div>
                      <ButtonBlue
                        onClick={() => setFileModal(true)}
                        endIcon={<FolderIcon />}
                        style={{ borderRadius: "7px" }}
                      >
                        File Management
                      </ButtonBlue>
                    </div>
                  )}
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
                      className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-[20rem] bg-gray-50 hover:border-blue-500 focus:border-blue-500 focus:outline-none"
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
                  {activeTab === "edge" && (
                    <div>
                      <EdgeFilterDropdown
                        filterByEdgeType={filterByEdgeType}
                        setFilterByEdgeType={setFilterByEdgeType}
                      />
                    </div>
                  )}
                </div>

                {activeTab === "node" && (
                  <Paper
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      borderRadius: ".5rem",
                    }}
                  >
                    <TableContainer className="shadow-md">
                      <Table className="text-center text-gray-50">
                        <TableHead className="text-xs text-gray-50 uppercase">
                          <TabComponent />
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
                                // hover
                                // style={{ cursor: "pointer" }}
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
                  <Paper
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      borderRadius: ".5rem",
                    }}
                  >
                    <TableContainer className="shadow-md">
                      <Table className="text-center text-gray-50">
                        <TableHead className="text-xs text-gray-50 uppercase">
                          <TabComponent />
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
                                // hover
                                // style={{ cursor: "pointer" }}
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
        <CustomModal isOpen={fileModal} onClose={() => setFileModal(false)}>
          <Card
            sx={{
              borderRadius: 2,
              "&:focus": {
                outline: "none",
                boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.5)",
              },
            }}
            className="drop-shadow-2xl px-5 pb-2 w-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setFileModal(false)}
              >
                <CloseIcon />
              </button>
              <h1
                className={`text-2xl font-semibold mb-6 text-secondary text-center`}
              >
                Map Files
              </h1>
              <div className="flex flex-col mx-8">
                <div className="flex flex-col items-center justify-center">
                  <label
                    className="flex flex-col items-center justify-center w-72 h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                    htmlFor="importFile"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <div className="flex flex-col items-center justify-center mt-5">
                      <svg
                        className="w-8 h-8 mb-4 text-secondary"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold text-secondary">
                          Click to browse
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">CSV only</p>
                      <div className="flex-grow mt-5 flex flex-col items-center space-y-2">
                        {nodeFile ? (
                          <Chip
                            label={nodeFile.name}
                            onDelete={() => setNodeFile(null)}
                            className="self-center mb-2"
                            style={{
                              backgroundColor: "#d1d5db",
                              color: "black",
                            }}
                          />
                        ) : (
                          <div className="h-8"></div>
                        )}
                        {edgeFile ? (
                          <Chip
                            label={edgeFile.name}
                            onDelete={() => setEdgeFile(null)}
                            className="self-center"
                            style={{
                              backgroundColor: "#d1d5db",
                              color: "black",
                            }}
                          />
                        ) : (
                          <div className="h-8"></div>
                        )}
                      </div>
                    </div>
                    <input
                      id="importFile"
                      type="file"
                      accept=".csv"
                      onChange={fileChange}
                      hidden
                    />
                  </label>
                  <div className="flex flex-row items-center gap-x-2 my-6">
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
                        Download
                      </ButtonBlue>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CustomModal>
      </div>
    </div>
  );
};
export default NodeTable;
