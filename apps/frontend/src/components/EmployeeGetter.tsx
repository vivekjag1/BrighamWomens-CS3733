import React, { useEffect, useState } from "react";
import { APIEndpoints } from "common/src/APICommon.ts";
import { Employee } from "database";
import { useAuth0 } from "@auth0/auth0-react";
import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
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
  Card,
  CardContent,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { useToast } from "./useToast.tsx";
import andyImage from "../../assets/employees/atruong.jpeg";
import vivekImage from "../../assets/employees/vjagadeesh.jpeg";
import ademImage from "../../assets/employees/mdjadid.jpeg";
import suliImage from "../../assets/employees/smoukheiber.jpeg";
import frankyImage from "../../assets/employees/fmise.jpeg";
import colinImage from "../../assets/employees/cmasucci.jpeg";
import griffinImage from "../../assets/employees/gbrown.jpeg";
import taehaImage from "../../assets/employees/tsong.jpeg";
import wongImage from "../../assets/employees/wwong.jpg";
import mattImage from "../../assets/employees/mbrown.jpeg";
import danielImage from "../../assets/employees/dgorbunov.jpeg";
import josephImage from "../../assets/employees/jcardarelli.jpeg";
import CustomModal from "./CustomModal.tsx";

interface EmployeeGetterProps {
  uploadTriggered: boolean;
  filterBySearch: string;
  filterByPosition: string[];
  filterByRole: string[];
}

const definedEmployees = [
  { name: "Daniel Gorbunov ", imageSrc: danielImage },
  { name: "Matthew Brown", imageSrc: mattImage },
  { name: "Andy Truong", imageSrc: andyImage },
  { name: "Vivek Jagadeesh", imageSrc: vivekImage },
  { name: "Mohamed Adem Djadid", imageSrc: ademImage },
  { name: "Sulaiman Moukheiber ", imageSrc: suliImage },
  { name: "Francesco Di Mise", imageSrc: frankyImage },
  { name: "Colin Masucci", imageSrc: colinImage },
  { name: "Griffin Brown", imageSrc: griffinImage },
  { name: "Taeha Song", imageSrc: taehaImage },
  { name: "Joseph Cardarelli", imageSrc: josephImage },
  { name: "Wilson Wong", imageSrc: wongImage },
];

export function EmployeeGetter({
  uploadTriggered,
  filterBySearch,
  filterByRole,
  filterByPosition,
}: EmployeeGetterProps) {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
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
    showToast("employee successfully deleted!", "success");
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
  }, [getAccessTokenSilently, sortOrder, uploadTriggered]);

  useEffect(() => {
    let data = employeeData;

    if (uploadTriggered) {
      setEmployeesDeleted([]);
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

  function getEmployeeImageSrc(employeeName: string) {
    const employee = definedEmployees.find(
      (definedEmployee) => definedEmployee.name.trim() === employeeName.trim(),
    );
    return employee ? employee.imageSrc : undefined;
  }

  return (
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
                  <TableCell style={{ width: "35ch", maxWidth: "35ch" }}>
                    <div className="flex items-center whitespace-nowrap">
                      <Avatar
                        {...(getEmployeeImageSrc(employee.name)
                          ? { src: getEmployeeImageSrc(employee.name) }
                          : {})}
                        alt={`${employee.name} image`}
                      >
                        {employee.name.charAt(0)}
                      </Avatar>
                      <Typography
                        component="div"
                        variant="body2"
                        style={{ marginLeft: 2 }}
                      >
                        <div className="ps-3">
                          <div className="text-base font-semibold text-black text-start">
                            {highlightSearchTerm(employee.name, filterBySearch)}
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
                          style={{ cursor: "pointer" }}
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
      <CustomModal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
        <Card
          sx={{
            borderRadius: 2,
            "&:focus": {
              outline: "none",
              border: "none",
              boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.5)",
            },
          }}
          className="drop-shadow-2xl p-3"
          onClick={(e) => e.stopPropagation()}
        >
          <CardContent className="flex flex-col gap-2">
            <h1 className={`text-md font-semibold text-secondary text-center`}>
              Are you sure you want to delete this user?
            </h1>
            <div className="col-span-2 flex justify-center gap-8">
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
      </CustomModal>
    </Paper>
  );
}
