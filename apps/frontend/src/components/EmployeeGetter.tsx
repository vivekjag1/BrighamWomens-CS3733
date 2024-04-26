import React, { useEffect, useState } from "react";
import { APIEndpoints } from "common/src/APICommon.ts";
import { Employee } from "database";
import { useAuth0 } from "@auth0/auth0-react";
import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
import EmployeeFilterDropdown from "./EmployeeFilterDropdown.tsx";
import { checkAuth } from "../checkAdminStatus.ts";
import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  TableContainer,
  TableFooter,
  Paper,
  TablePagination,
  Modal,
  Card,
  CardContent,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { useToast } from "./useToast.tsx";
import ButtonBlue from "./ButtonBlue.tsx";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";

interface EmployeeGetterProps {
  uploadTriggered: boolean;
}

export function EmployeeGetter({ uploadTriggered }: EmployeeGetterProps) {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterBySearch, setFilterBySearch] = useState("");
  const [filterByPosition, setFilterByPosition] = useState<string[]>([]);
  const [filterByRole, setFilterByRole] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<Employee[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRow, setSelectedRow] = useState<Employee | null>(null);

  const { getAccessTokenSilently } = useAuth0();
  const [authorizedStatus, setStatus] = useState<boolean>(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [currentEmployeeDelete, setEmployeeDelete] =
    React.useState<Employee | null>(null);
  const [employeesDeleted, setEmployeesDeleted] = React.useState<number[]>([]);
  const [fileModal, setFileModal] = useState<boolean>(false);
  const { showToast } = useToast();

  const handleRowClick = (employee: Employee) => {
    setSelectedRow(employee);
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
    page > -1 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const handleDeleteEmployee = async (employee: Employee) => {
    const token = await getAccessTokenSilently();
    const send = {
      email: employee.email,
      token: token,
    };
    setEmployeesDeleted((prevEmployees) => [
      ...prevEmployees,
      employee.employeeID,
    ]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const rateLeft = await MakeProtectedPostRequest(
      APIEndpoints.deleteEmployee,
      send,
      token,
    );
  };

  const makeDeleteRequest = (employee: Employee) => {
    handleDeleteEmployee(employee).then().catch(console.error);
    showToast("Employee successfully deleted!", "success");
    setDeleteModal(false);
  };

  useEffect(() => {
    const checkRole = async () => {
      const token = await getAccessTokenSilently();
      const result = await checkAuth(token, "employeetable");
      setStatus(result!);
    };
    checkRole().then();
  }, [getAccessTokenSilently]);
  useEffect(() => {
    async function fetchData() {
      const token = await getAccessTokenSilently();

      try {
        const res = await MakeProtectedGetRequest(
          APIEndpoints.employeeGetRequest,
          token,
        );
        const sortedData = res.data.sort((a: Employee, b: Employee) => {
          return sortOrder === "asc"
            ? a.employeeID - b.employeeID
            : b.employeeID - a.employeeID;
        });
        setEmployeeData(sortedData);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    }
    fetchData();
  }, [getAccessTokenSilently, sortOrder]);

  useEffect(() => {
    let data = employeeData;

    if (uploadTriggered) {
      setEmployeesDeleted([]);
      location.reload();
    } else {
      if (employeesDeleted.length > 0) {
        data = employeeData.filter(
          (employee) => !employeesDeleted.includes(employee.employeeID),
        );
      }
    }

    if (filterBySearch) {
      data = data.filter(
        (item) =>
          item.name
            .toString()
            .toLowerCase()
            .includes(filterBySearch.toLowerCase()) ||
          item.userName.toLowerCase().includes(filterBySearch.toLowerCase()) ||
          item.position.toLowerCase().includes(filterBySearch.toLowerCase()) ||
          item.role.toLowerCase().includes(filterBySearch.toLowerCase()),
      );
    }

    if (filterByPosition.length) {
      data = data.filter((item) => filterByPosition.includes(item.position));
    }
    if (filterByRole.length) {
      data = data.filter((item) => filterByRole.includes(item.role));
    }

    const sortedData = data.sort((a, b) => {
      return sortOrder === "asc"
        ? a.employeeID - b.employeeID
        : b.employeeID - a.employeeID;
    });

    //   console.log(employeesDeleted);
    //   if (employeeDelete) {
    //       if(employeesDeleted.length==employeeData.length)
    //       console.log("Filtering out deleted employees");
    //       const updatedFilteredData = sortedData.filter(employee => !employeesDeleted.includes(employee.employeeID));
    //       setFilteredData(updatedFilteredData);
    //       setEmployeeDelete(null);
    //   }
    // else{
    //     setFilteredData(sortedData);
    // }
    setFilteredData(sortedData);
  }, [
    employeeData,
    filterByPosition,
    filterByRole,
    filterBySearch,
    sortOrder,
    employeesDeleted,
    uploadTriggered,
  ]);

  function highlightSearchTerm(text: string, searchTerm: string) {
    if (!searchTerm.trim()) {
      return text;
    }

    const regex = new RegExp(`(${searchTerm})`, "gi");
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

  const SortOrder = () => {
    if (sortOrder == "asc") {
      setSortOrder("desc");
    } else if (sortOrder == "desc") {
      setSortOrder("asc");
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-2 sm:space-y-0 items-center justify-between pb-2">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div>
          <ButtonBlue
            endIcon={<CloudDownloadIcon />}
            onClick={() => setFileModal(true)}
          >
            Download Data
          </ButtonBlue>
        </div>
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
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer className="shadow-md">
          <Table className="text-center text-gray-50">
            <TableHead className="text-xs text-gray-50 uppercase">
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
                <TableCell style={{ width: "18ch", maxWidth: "18ch" }}>
                  Employee ID
                  <button
                    onClick={() => SortOrder()}
                    className="hover:text-blue-700"
                  >
                    <svg
                      className="w-3 h-3 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 20"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </button>
                </TableCell>
                <TableCell style={{ width: "34ch", maxWidth: "34ch" }}>
                  Name
                </TableCell>
                <TableCell style={{ width: "18ch", maxWidth: "18ch" }}>
                  Username
                </TableCell>
                <TableCell style={{ width: "15ch", maxWidth: "15ch" }}>
                  Position
                </TableCell>
                {authorizedStatus && (
                  <>
                    <TableCell style={{ width: "15ch", maxWidth: "15ch" }}>
                      Role
                    </TableCell>
                    <TableCell>
                      <span className="sr-only">Edit</span>
                    </TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => (
                  <TableRow
                    key={employee.employeeID}
                    onClick={() => handleRowClick(employee)}
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
                    <TableCell style={{ width: "18ch", maxWidth: "18ch" }}>
                      {employee.employeeID}
                    </TableCell>
                    <TableCell style={{ width: "34ch", maxWidth: "34ch" }}>
                      <div className="flex items-center whitespace-nowrap">
                        <Avatar
                          src={`../../assets/employees/${employee.profilePicture}.jpeg`}
                          alt={`${employee.name} image`}
                        />
                        <Typography
                          component="div"
                          variant="body2"
                          style={{ marginLeft: 2 }}
                        >
                          <div className="ps-3">
                            <div className="text-base font-semibold text-black text-start">
                              {highlightSearchTerm(
                                employee.name,
                                filterBySearch,
                              )}
                            </div>
                            <div className="font-normal text-gray-500">
                              {highlightSearchTerm(
                                employee.email,
                                filterBySearch,
                              )}
                            </div>
                          </div>
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell style={{ width: "18ch", maxWidth: "18ch" }}>
                      {highlightSearchTerm(employee.userName, filterBySearch)}
                    </TableCell>
                    <TableCell style={{ width: "15ch", maxWidth: "15ch" }}>
                      {highlightSearchTerm(employee.position, filterBySearch)}
                    </TableCell>
                    {authorizedStatus && (
                      <>
                        <TableCell style={{ width: "15ch", maxWidth: "15ch" }}>
                          {highlightSearchTerm(employee.role, filterBySearch)}
                        </TableCell>
                        <TableCell>
                          <DeleteForeverIcon
                            onClick={() => {
                              setDeleteModal(true);
                              setEmployeeDelete(employee);
                            }}
                            className="text-red-500 mb-1 hover:text-red-700"
                          />
                        </TableCell>
                      </>
                    )}
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
                  colSpan={6}
                  count={filteredData.length}
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
        <Modal
          open={deleteModal}
          onClose={() => setDeleteModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
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
              <h1
                className={`text-md font-semibold mb-4 text-secondary text-center`}
              >
                Are you sure you want to delete this user?
              </h1>
              <div className="col-span-2 flex justify-between items-end px-5">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#EA422D",
                    color: "white",
                    width: "8rem",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  endIcon={<ClearIcon />}
                  onClick={() => setDeleteModal(false)}
                >
                  CANCEL
                </Button>

                <Button
                  variant="contained"
                  className="justify-end"
                  style={{
                    backgroundColor: "#012D5A",
                    width: "8rem",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  endIcon={<CheckIcon />}
                  onClick={() =>
                    currentEmployeeDelete
                      ? makeDeleteRequest(currentEmployeeDelete)
                      : null
                  }
                >
                  CONFIRM
                </Button>
              </div>
            </CardContent>
          </Card>
        </Modal>
        <Modal
          open={fileModal}
          onClose={() => setFileModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
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
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.707 6.293a1 1 0 011.414 0L12 10.586l4.879-4.88a1 1 0 111.414 1.414L13.414 12l4.88 4.879a1 1 0 01-1.414 1.414L12 13.414l-4.879 4.88a1 1 0 01-1.414-1.414L10.586 12 5.707 7.121a1 1 0 010-1.414z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <h1
                className={`text-md font-semibold mb-4 text-secondary text-center`}
              >
                File Management
              </h1>
              <div className="flex flex-col m-5">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="small_size"
                >
                  Small file input
                </label>
                <input
                  className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                  id="default_size"
                  type="file"
                />
                <div className="flex items-center justify-center w-full mb-5">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      {/*<p className="text-xs text-gray-500 dark:text-gray-400">CSV</p>*/}
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
                <ButtonBlue component="label" endIcon={<FileUploadIcon />}>
                  TEST BUTTON
                </ButtonBlue>
              </div>
            </CardContent>
          </Card>
        </Modal>
      </Paper>
    </div>
  );
}
