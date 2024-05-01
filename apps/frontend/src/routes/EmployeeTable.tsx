import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { checkAuth } from "../checkAdminStatus.ts";
// import AdminEmployeeTable from "../components/AdminEmployeeTable.tsx";
// import NonAdminEmployeeTable from "../components/NonAdminEmployeeTable.tsx";
import { useToast } from "../components/useToast.tsx";
import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
import { EmployeeGetter } from "../components/EmployeeGetter.tsx";
import ButtonBlue from "../components/ButtonBlue.tsx";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { Card, CardContent, Chip } from "@mui/material";
import EmployeeFilterDropdown from "../components/EmployeeFilterDropdown.tsx";
import CustomModal from "../components/CustomModal.tsx";
import CloseIcon from "@mui/icons-material/Close";

const EmployeeTable = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [authorizedStatus, setStatus] = useState<boolean>(false);
  const [uploadTriggered, setUploadTriggered] = useState<boolean>(false);
  const [fileModal, setFileModal] = useState<boolean>(false);
  const [employeesFile, setEmployeesFile] = useState<File | null>(null);
  const [filterBySearch, setFilterBySearch] = useState("");
  const [filterByPosition, setFilterByPosition] = useState<string[]>([]);
  const [filterByRole, setFilterByRole] = useState<string[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const checkRole = async () => {
      const token = await getAccessTokenSilently();
      const result = await checkAuth(token, "employeetable");
      setStatus(result!);
    };
    checkRole().then();
  }, [getAccessTokenSilently]);

  const employeeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setEmployeesFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    // console.log(event);
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setEmployeesFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  async function downloadFiles() {
    setFileModal(false);
    const token = await getAccessTokenSilently();
    const retFromAPI = await MakeProtectedGetRequest(
      APIEndpoints.employeeDownload,
      token,
    );

    const employeesBlob = new Blob([retFromAPI.data], {
      type: "text/csv;charset =utf-8",
    }); //create blob
    const employeesLink = document.createElement("a");
    employeesLink.href = URL.createObjectURL(employeesBlob); //create links
    employeesLink.download = "Employees"; //name files
    employeesLink.click(); //open them;
    showToast("Employee data downloaded!", "success");
  }

  async function uploadFiles() {
    setFileModal(false);
    try {
      if (employeesFile != null) {
        const formData = new FormData();
        formData.append("Employees", employeesFile, employeesFile.name);
        const token = await getAccessTokenSilently();
        const res = await MakeProtectedPostRequest(
          APIEndpoints.employeePostRequest,
          formData,
          token,
        );
        if (res.status == 202) {
          showToast("File(s) failed validation!", "error");
        } else {
          await makeUsers();
          showToast("Employee data uploaded!", "success");
          setUploadTriggered(true);
          setEmployeesFile(null);
          setTimeout(() => setUploadTriggered(false), 500);
        }
      } else {
        showToast("Employee file missing!", "error");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      showToast("Failed to upload employee data!", "error");
    }
  }

  async function makeUsers() {
    try {
      const token = await getAccessTokenSilently();
      MakeProtectedGetRequest(APIEndpoints.makeEmployee, token);
    } catch (error) {
      console.error("user already exists!");
      return;
    }
  }

  return (
    <div className="h-screen overflow-y-auto bg-offwhite">
      <div className="w-full items-center">
        <div className="flex flex-col items-center gap-5 ">
          <div className="flex flex-col items-center gap-2 mt-8">
            <h2 className="w-full text-3xl font-bold text-center">Employees</h2>
            <h2 className="w-full text-md text-center">
              View and modify all employee data
            </h2>
            <hr className="pl-96 pr-96 h-px mt-3 mb-6 bg-gray-300 border-0" />
          </div>

          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="flex flex-column sm:flex-row flex-wrap space-y-2 sm:space-y-0 items-center justify-between pb-2">
                {authorizedStatus && (
                  <div>
                    <ButtonBlue
                      onClick={() => setFileModal(true)}
                      endIcon={<FolderSharedIcon />}
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
                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-[20rem] bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for Employees"
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
                <div>
                  <EmployeeFilterDropdown
                    filterByPosition={filterByPosition}
                    setFilterByPosition={setFilterByPosition}
                    filterByRole={filterByRole}
                    setFilterByRole={setFilterByRole}
                  />

                  <div
                    id="dropdownBgHover"
                    className="z-10 hidden w-48 bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    <ul
                      className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownBgHoverButton"
                    >
                      <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            id="checkbox-item-4"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="checkbox-item-4"
                            className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            Default checkbox
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            checked
                            id="checkbox-item-5"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="checkbox-item-5"
                            className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            Checked state
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            id="checkbox-item-6"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="checkbox-item-6"
                            className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            Default checkbox
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <EmployeeGetter
                uploadTriggered={uploadTriggered}
                filterBySearch={filterBySearch}
                filterByPosition={filterByPosition}
                filterByRole={filterByRole}
              />
            </div>
          </div>
        </div>
        <CustomModal isOpen={fileModal} onClose={() => setFileModal(false)}>
          <Card
            sx={{
              borderRadius: 2,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              "&:focus": {
                outline: "none",
                border: "none",
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
                Employee Files
              </h1>
              <div className="flex flex-col mx-8">
                <div className="flex flex-col items-center justify-center">
                  <label
                    htmlFor="importNodeFile"
                    className="flex flex-col items-center justify-center w-72 h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
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
                      <div className="flex-grow mt-5">
                        {employeesFile ? (
                          <Chip
                            label={employeesFile.name}
                            onDelete={() => setEmployeesFile(null)}
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
                      id="importNodeFile"
                      type="file"
                      accept=".csv"
                      name="Import Node File"
                      onChange={employeeFileChange}
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

  // return authorizedStatus ? <AdminEmployeeTable /> : <NonAdminEmployeeTable />;
};

export default EmployeeTable;
