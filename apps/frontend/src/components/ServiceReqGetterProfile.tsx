import { ServiceRequest } from "database";
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
import React from "react";

const statusOptions = ["Unassigned", "Assigned", "InProgress", "Closed"];

export function ServiceReqGetterProfile(props: {
  requestData: ServiceRequest[];
  setRequestData: (data: ServiceRequest[]) => void;
  fetchData: () => void;
  handleStatusChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    serviceID: number,
  ) => void;
  SortOrder: () => void;
  sortPriorityOrder: () => void;
  filteredData: ServiceRequest[];
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

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
    page > -1
      ? Math.max(0, (1 + page) * rowsPerPage - props.filteredData.length)
      : 0;

  return (
    <div className="relative">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer className="shadow-md">
          <Table className="text-center text-gray-50e">
            <TableHead className="text-xs text-gray-50 uppercase bg-secondary ">
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
                <TableCell
                  sx={{
                    "& > th": {
                      width: "200px",
                    },
                  }}
                >
                  ID
                  <button
                    onClick={() => props.SortOrder()}
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
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>
                  Priority
                  <button
                    onClick={props.sortPriorityOrder}
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
              </TableRow>
            </TableHead>
            <TableBody>
              {props.filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((request) => (
                  <TableRow
                    key={request.serviceID}
                    //onClick={() => handleRowClick(request)}
                    hover
                    style={{ cursor: "pointer" }}
                    sx={{
                      "& > td": {
                        color: "#6B7280",
                        textAlign: "center",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.875rem",
                        padding: "8px 16px",
                      },
                    }}
                  >
                    <TableCell style={{ width: "18ch", maxWidth: "18ch" }}>
                      {request.serviceID}
                    </TableCell>
                    <TableCell style={{ width: "18ch", maxWidth: "18ch" }}>
                      {request.type}
                    </TableCell>
                    <TableCell style={{ width: "30ch", maxWidth: "30ch" }}>
                      <select
                        value={request.status}
                        onChange={(e) =>
                          props.handleStatusChange(e, request.serviceID)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="border bg-gray-50 border-gray-300 rounded px-3 py-1 text-center"
                      >
                        {statusOptions.map((option) => (
                          <option
                            key={option}
                            value={option}
                            disabled={
                              request.status === "Unassigned" &&
                              option !== "Unassigned"
                            }
                          >
                            {option === "InProgress" ? "In Progress" : option}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell
                      style={{
                        width: "18ch",
                        maxWidth: "18ch",
                        position: "relative",
                        height: "auto",
                        padding: "10px",
                        textAlign: "start",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          transform: "translate(0%, -50%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          left: 0,
                          marginLeft: "18%",
                        }}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            request.priority === "Low"
                              ? "bg-green-500"
                              : request.priority === "Medium"
                                ? "bg-yellow-500"
                                : request.priority === "High"
                                  ? "bg-orange-500"
                                  : request.priority === "Emergency"
                                    ? "bg-red-500"
                                    : "bg-gray-200"
                          }`}
                          style={{ marginRight: "8px" }}
                        ></div>
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "normal",
                          }}
                        >
                          {request.priority}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 47.2 * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[4]}
                  colSpan={9}
                  count={props.filteredData.length}
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
    </div>
  );
}
