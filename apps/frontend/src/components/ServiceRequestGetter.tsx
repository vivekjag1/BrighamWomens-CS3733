import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { APIEndpoints } from "common/src/APICommon.ts";
import { ServiceRequest } from "database";
import dayjs from "dayjs";
import { useAuth0 } from "@auth0/auth0-react";
import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
import { useToast } from "./useToast.tsx";
import ServiceFilterDropdown from "./ServiceFilterDropdown.tsx";
import { Card, CardContent } from "@mui/material";
import CustomTextField from "./CustomTextField.tsx";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
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
import EmployeeDropdown from "./EmployeeDropdown.tsx";
import { MakeProtectedPatchRequest } from "../MakeProtectedPatchRequest.ts";
import { MakeProtectedDeleteRequest } from "../MakeProtectedDeleteRequest.ts";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import CustomModal from "./CustomModal.tsx";

const statusOptions = ["Unassigned", "Assigned", "InProgress", "Closed"];
dayjs.extend(utc);
dayjs.extend(timezone);

export function ServiceRequestGetter() {
  const [requestData, setRequestData] = useState<ServiceRequest[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterBySearch, setFilterBySearch] = useState("");
  const [filterByEmployee, setFilterByEmployee] = useState<string[]>([]);
  const [filterByPriority, setFilterByPriority] = useState<string[]>([]);
  const [filterByStatus, setFilterByStatus] = useState<string[]>([]);
  const [filterByType, setFilterByType] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<ServiceRequest[]>([]);
  const [priorityOrder, setPriorityOrder] = useState<"desc" | "asc" | "">("");
  const [selectedRow, setSelectedRow] = useState<ServiceRequest | null>(null);
  const [serviceModal, setServiceModal] = React.useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const { showToast } = useToast();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const fetchData = useCallback(async () => {
    const token = await getAccessTokenSilently();

    try {
      const res = await MakeProtectedGetRequest(
        APIEndpoints.getServiceRequest,
        token,
      );
      const sortedData = res.data.sort(
        (a: ServiceRequest, b: ServiceRequest) => {
          return sortOrder === "asc"
            ? a.serviceID - b.serviceID
            : b.serviceID - a.serviceID;
        },
      );
      setRequestData(sortedData);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  }, [getAccessTokenSilently, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function deleteServiceRequest(serviceID: number) {
    closeModal();
    const token = await getAccessTokenSilently();

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await MakeProtectedDeleteRequest(
        `${APIEndpoints.getServiceRequest}/${serviceID}`,
        token,
      );

      setSelectedRow(null);
      showToast("Service Request deleted!", "error");
      fetchData();
    } catch (error) {
      console.error(
        `Error deleting service request with ID ${serviceID}:`,
        error,
      );
    }
  }

  async function handleStatusChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    serviceID: number,
  ) {
    const newStatus = event.target.value;
    const updatedRequests = requestData.map((request) => {
      if (request.serviceID === serviceID) {
        const updatedRequest = {
          ...request,
          status: newStatus,
          assignedTo:
            newStatus === "Unassigned" ? "Unassigned" : request.assignedTo,
        };
        return updatedRequest;
      }
      return request;
    });

    setRequestData(updatedRequests);

    const updateData = {
      serviceID: serviceID,
      status: newStatus,
      ...(newStatus === "Unassigned" && { assignedTo: "Unassigned" }),
    };

    try {
      const token = await getAccessTokenSilently();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await MakeProtectedPatchRequest(
        APIEndpoints.putServiceRequest,
        updateData,
        token,
      );
      showToast("Status updated successfully!", "success");
    } catch (error) {
      console.error("Error updating status", error);
      showToast("Status update failed!", "error");
    }
  }

  const handleEmployeeChange = async (
    newAssignedTo: string,
    serviceID: number,
  ) => {
    const updatedRequests = requestData.map((request) => {
      if (request.serviceID === serviceID) {
        return {
          ...request,
          assignedTo: newAssignedTo,
          status: newAssignedTo !== "Unassigned" ? "Assigned" : "Unassigned",
        };
      }
      return request;
    });

    setRequestData(updatedRequests);

    const updateData = {
      serviceID: serviceID,
      assignedTo: newAssignedTo,
      ...(newAssignedTo !== "Unassigned" && { status: "Assigned" }),
    };

    try {
      const token = await getAccessTokenSilently();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.patch(
        APIEndpoints.putServiceRequest,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      showToast("Assigned employee updated successfully!", "success");
    } catch (error) {
      console.error("Error updating assigned employee", error);
      showToast("Failed to update assigned employee!", "error");
    }
  };

  useEffect(() => {
    let data = requestData;

    if (filterBySearch) {
      data = data.filter(
        (item) =>
          item.location
            .toString()
            .toLowerCase()
            .includes(filterBySearch.toLowerCase()) ||
          item.requestingUsername
            .toLowerCase()
            .includes(filterBySearch.toLowerCase()) ||
          item.assignedTo
            .toLowerCase()
            .includes(filterBySearch.toLowerCase()) ||
          item.type.toLowerCase().includes(filterBySearch.toLowerCase()),
      );
    }

    if (filterByEmployee.length) {
      data = data.filter((item) => filterByEmployee.includes(item.assignedTo));
    }
    if (filterByType.length) {
      data = data.filter((item) => filterByType.includes(item.type));
    }
    if (filterByPriority.length) {
      data = data.filter((item) => filterByPriority.includes(item.priority));
    }
    if (filterByStatus.length) {
      data = data.filter((item) => filterByStatus.includes(item.status));
    }
    let sortedData = data.sort((a, b) => {
      return sortOrder === "asc"
        ? a.serviceID - b.serviceID
        : b.serviceID - a.serviceID;
    });

    if (priorityOrder !== "") {
      sortedData = sortedData.sort((a: ServiceRequest, b: ServiceRequest) => {
        const priorityOrderMap: Record<string, number> = {
          Low: 0,
          Medium: 1,
          High: 2,
          Emergency: 3,
        };

        const priorityA = priorityOrderMap[a.priority];
        const priorityB = priorityOrderMap[b.priority];

        if (priorityOrder === "asc") {
          return priorityA - priorityB;
        } else {
          return priorityB - priorityA;
        }
      });
    }

    setFilteredData(sortedData);
  }, [
    requestData,
    filterByEmployee,
    filterByType,
    filterByPriority,
    filterByStatus,
    filterBySearch,
    sortOrder,
    priorityOrder,
  ]);

  function truncateString(str: string, num: number) {
    if (str.length <= num + 3) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

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

  const handleRowClick = (request: ServiceRequest) => {
    setSelectedRow(request);
    setServiceModal(true);
  };

  const sortPriorityOrder = () => {
    if (priorityOrder == "" || priorityOrder == "desc") {
      setPriorityOrder("asc");
    } else if (priorityOrder == "asc") {
      setPriorityOrder("desc");
    }
  };

  const SortOrder = () => {
    if (sortOrder == "asc") {
      setSortOrder("desc");
      setPriorityOrder("");
    } else if (sortOrder == "desc") {
      setSortOrder("asc");
      setPriorityOrder("");
    }
  };

  function convertToEasternTime(
    utcTime: Date | string | number | null,
    format = "MMM DD, YYYY hh:mm A [EST]",
  ): string {
    if (!utcTime) return "";
    return dayjs.utc(utcTime).tz("America/New_York").format(format);
  }
  interface DeliveryDetailsProps {
    delivery: Record<string, string | number | null>;
    fieldMappings: Record<string, string>;
  }

  function closeModal() {
    setServiceModal(false);
    setSelectedRow(null);
  }

  const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({
    delivery,
    fieldMappings,
  }) => {
    return (
      <div className="grid grid-cols-6 gap-4 col-span-6 mb-6">
        {Object.entries(fieldMappings).map(([key, label]) => (
          <div key={key} className="col-span-2 flex flex-col w-full">
            <label className="font-medium mb-2">{label}:</label>
            {key.includes("Time") ? (
              <CustomTextField
                value={convertToEasternTime(delivery[key])}
                sx={{ width: "100%" }}
              />
            ) : (
              <CustomTextField
                value={delivery[key] || ""}
                sx={{ width: "100%" }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const fieldConfig = {
    medicineDelivery: {
      patientName: "Patient Name",
      medicineName: "Medicine Name",
      dosage: "Dosage",
    },
    SecurityService: {
      securityType: "Security Type",
      numberPeople: "Number of People",
    },
    SanitationService: {
      sanitationType: "Sanitation Type",
      requiredEquipment: "Required Equipment",
    },
    RoomScheduling: {
      reservationReason: "Reservation Reason",
      endTime: "End Time",
    },
    DeviceDelivery: {
      deviceType: "Device Type",
      quantity: "Quantity",
    },
    GiftDelivery: {
      giftType: "Gift Type",
      senderNote: "Sender Note",
    },
    ITRequest: {
      problemType: "Problem Type",
    },
    FoodDeliveryService: {
      protein: "Protein",
      side: "Side",
    },
  };

  const formatModalLabel = (type: string) => {
    return type
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
  };

  return (
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
            placeholder="Search for Service Requests"
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
          <ServiceFilterDropdown
            filterByEmployee={filterByEmployee}
            setFilterByEmployee={setFilterByEmployee}
            filterByType={filterByType}
            setFilterByType={setFilterByType}
            filterByPriority={filterByPriority}
            setFilterByPriority={setFilterByPriority}
            filterByStatus={filterByStatus}
            setFilterByStatus={setFilterByStatus}
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
                <TableCell>
                  Service ID
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
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>
                  Priority
                  <button
                    onClick={sortPriorityOrder}
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
                <TableCell>Requesting Username</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Requested Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((request) => (
                  <TableRow
                    key={request.serviceID}
                    onClick={() => handleRowClick(request)}
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
                      {request.serviceID}
                    </TableCell>
                    <TableCell style={{ width: "18ch", maxWidth: "18ch" }}>
                      {highlightSearchTerm(request.type, filterBySearch)}
                    </TableCell>
                    <TableCell style={{ width: "30ch", maxWidth: "30ch" }}>
                      <select
                        value={request.status}
                        onChange={(e) =>
                          handleStatusChange(e, request.serviceID)
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
                    <TableCell style={{ width: "15ch", maxWidth: "15ch" }}>
                      {highlightSearchTerm(
                        truncateString(request.requestingUsername, 15),
                        filterBySearch,
                      )}
                    </TableCell>
                    <TableCell style={{ width: "15ch", maxWidth: "15ch" }}>
                      {highlightSearchTerm(
                        truncateString(request.location, 15),
                        filterBySearch,
                      )}
                    </TableCell>
                    <TableCell style={{ width: "20ch", maxWidth: "20ch" }}>
                      {request.description && request.description.trim() !== ""
                        ? truncateString(request.description, 18)
                        : "N/A"}
                    </TableCell>
                    <TableCell style={{ width: "30ch", maxWidth: "30ch" }}>
                      <div onClick={(e) => e.stopPropagation()}>
                        <EmployeeDropdown
                          value={request.assignedTo}
                          onChange={(newAssignedTo) =>
                            handleEmployeeChange(
                              newAssignedTo,
                              request.serviceID,
                            )
                          }
                          disableClearable={true}
                          disabled={false}
                        />
                      </div>
                    </TableCell>
                    <TableCell style={{ width: "15ch", maxWidth: "15ch" }}>
                      {truncateString(
                        dayjs
                          .tz(
                            request.requestedTime.toString(),
                            "America/New_York",
                          )
                          .toString(),
                        16,
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 73 * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  colSpan={9}
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
      </Paper>
      <CustomModal isOpen={serviceModal} onClose={() => setServiceModal(false)}>
        {selectedRow && (
          <div
            className="fixed inset-0 flex items-center justify-center"
            onClick={() => closeModal()}
          >
            <div className="relative">
              <Card
                sx={{ borderRadius: 2 }}
                className="drop-shadow-2xl w-[47rem] ml-[5%] px-4 pb-2"
                onClick={(e) => e.stopPropagation()}
              >
                <CardContent>
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => closeModal()}
                  >
                    <CloseIcon />
                  </button>
                  <h1
                    className={`text-2xl font-semibold mb-4 text-secondary text-center`}
                  >
                    {formatModalLabel(selectedRow.type)} Details
                  </h1>
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-2 flex flex-col w-full">
                      <label className="font-medium mb-2">Location:</label>
                      <CustomTextField
                        value={selectedRow.location}
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-span-2 flex flex-col w-full">
                      <label className="font-medium mb-2">
                        Requesting Person:
                      </label>
                      <CustomTextField
                        value={selectedRow.requestingUsername}
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-span-2 flex flex-col w-full">
                      <label className="font-medium mb-2">Assigned To:</label>
                      <CustomTextField
                        value={selectedRow.assignedTo}
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-span-3 flex flex-col w-full">
                      <label className="font-medium mb-2">Priority:</label>
                      <CustomTextField
                        value={selectedRow.priority}
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-span-3 flex flex-col w-full">
                      <label className="font-medium mb-2">Status:</label>
                      <CustomTextField
                        value={selectedRow.status}
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-span-2 flex flex-col w-full">
                      <label className="font-medium mb-2">Entered Time:</label>
                      <CustomTextField
                        value={convertToEasternTime(selectedRow.enteredTime)}
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-span-2 flex flex-col w-full">
                      <label className="font-medium mb-2">
                        Last Updated Time:
                      </label>
                      <CustomTextField
                        value={convertToEasternTime(selectedRow.updatedTime)}
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-span-2 flex flex-col w-full">
                      <label className="font-medium mb-2">
                        Requested Time:
                      </label>
                      <CustomTextField
                        value={convertToEasternTime(selectedRow.requestedTime)}
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-span-6 flex flex-col w-full">
                      <label className="font-medium mb-2">Description:</label>
                      <CustomTextField
                        value={selectedRow.description}
                        multiline
                        rows={4}
                        size="small"
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <hr className="px-80 ml-5 h-px mt-3 mb-1 bg-gray-300 border-0" />
                    <div className="grid grid-cols-6 gap-4 col-span-6 mb-6">
                      {Object.keys(fieldConfig).map((deliveryType) => {
                        //@ts-expect-error needs types
                        const deliveryData = selectedRow[deliveryType];
                        //@ts-expect-error needs types
                        const fieldMapping = fieldConfig[deliveryType];
                        return (
                          deliveryData && (
                            <DeliveryDetails
                              key={deliveryType}
                              delivery={deliveryData}
                              fieldMappings={fieldMapping}
                            />
                          )
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                    <div className="col-span-2 flex justify-between items-end px-0">
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#EA422D",
                          color: "white",
                          width: "100%",
                          maxWidth: "8rem",
                          fontFamily: "Poppins, sans-serif",
                        }}
                        endIcon={<DeleteIcon />}
                        onClick={() =>
                          deleteServiceRequest(selectedRow?.serviceID)
                        }
                      >
                        DELETE
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#012D5A",
                          color: "white",
                          width: "100%",
                          maxWidth: "8rem",
                          fontFamily: "Poppins, sans-serif",
                        }}
                        endIcon={<CloseIcon />}
                        onClick={() => closeModal()}
                      >
                        CLOSE
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CustomModal>
    </div>
  );
}
