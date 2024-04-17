import React, { useEffect, useState } from "react";
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

const statusOptions = ["Unassigned", "Assigned", "InProgress", "Closed"];

export function ServiceRequestGetter() {
  const [requestData, setRequestData] = useState<ServiceRequest[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterBySearch, setFilterBySearch] = useState("");
  const [filterByPriority, setFilterByPriority] = useState<string[]>([]);
  const [filterByStatus, setFilterByStatus] = useState<string[]>([]);
  const [filterByType, setFilterByType] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<ServiceRequest[]>([]);
  const [priorityOrder, setPriorityOrder] = useState<"desc" | "asc" | "">("");
  const [selectedRow, setSelectedRow] = useState<ServiceRequest | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessTokenSilently();

      try {
        const res = await MakeProtectedGetRequest(
          APIEndpoints.serviceGetRequests,
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

        console.log("Successfully got data from get request:", res.data);
      } catch (error) {
        console.error("Error fetching service requests:", error);
      }
    }
    fetchData();
  }, [getAccessTokenSilently, sortOrder]);

  async function handleStatusChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    serviceID: number,
  ) {
    const newStatus = event.target.value;

    const updatedRequests = requestData.map((request) => {
      if (request.serviceID === serviceID) {
        return { ...request, status: newStatus };
      }
      return request;
    });

    setRequestData(updatedRequests);

    const updateData = {
      serviceID: serviceID,
      status: newStatus,
    };

    try {
      const token = await getAccessTokenSilently();
      const response = await axios.patch(
        APIEndpoints.servicePutRequests,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Status updated successfully", response.data);
      showToast("Status updated successfully!", "success");
    } catch (error) {
      console.error("Error updating status", error);
      showToast("Status update failed!", "error");
    }
  }

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
    filterByType,
    filterByPriority,
    filterByStatus,
    filterBySearch,
    sortOrder,
    priorityOrder,
  ]);

  function truncateString(str: string, num: number) {
    if (str.length <= num) {
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
    console.log(request);
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
      <table className="w-70vw mx-auto text-sm text-center rtl:text-right text-gray-500 shadow-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 w-[17ch]">
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
            </th>
            <th scope="col" className="px-6 py-3 w-[20ch]">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
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
            </th>
            <th scope="col" className="px-6 py-3">
              Requesting Username
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-3 py-3 w-[14ch]">
              Assigned To
            </th>

            <th scope="col" className="px-6 py-3">
              Requested Time
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((request) => (
            <tr
              className="bg-white border-b h-16 hover:bg-gray-100"
              key={request.serviceID}
              onClick={() => handleRowClick(request)}
            >
              <td className="px-6 py-4">{request.serviceID}</td>
              <td>{highlightSearchTerm(request.type, filterBySearch)}</td>
              <td className="px-6 py-4">
                <select
                  value={request.status}
                  onChange={(e) => handleStatusChange(e, request.serviceID)}
                  onClick={(e) => e.stopPropagation()}
                  className="border border-gray-300 rounded px-3 py-1 text-center"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option === "InProgress" ? "In Progress" : option}
                    </option>
                  ))}
                </select>
              </td>
              <td className="flex justify-center items-center space-x-2 px-6 pt-[26px]">
                <span
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
                ></span>
                <span>{truncateString(request.priority, 10)}</span>
              </td>
              <td className="px-6 py-4">
                {highlightSearchTerm(
                  truncateString(request.requestingUsername, 15),
                  filterBySearch,
                )}
              </td>
              <td className="px-4 py-4">
                {highlightSearchTerm(
                  truncateString(request.location, 15),
                  filterBySearch,
                )}
              </td>
              <td className="px-5 py-4">
                {request.description && request.description.trim() !== ""
                  ? truncateString(request.description, 20)
                  : "N/A"}
              </td>
              <td className="px-6 py-4">
                {highlightSearchTerm(
                  truncateString(request.assignedTo, 15),
                  filterBySearch,
                )}
              </td>
              <td className="px-6 py-4">
                {truncateString(
                  dayjs
                    .tz(request.requestedTime.toString(), "America/New_York")
                    .toString(),
                  16,
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRow && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[1px]"
          onClick={() => setSelectedRow(null)}
        >
          <div className="relative">
            <Card
              sx={{ borderRadius: 2 }}
              className="drop-shadow-2xl w-full max-w-lg ml-[9%] pl-4 pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <CardContent>
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedRow(null)}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6.707 6.293a1 1 0 011.414 0L12 10.586l4.879-4.88a1 1 0 111.414 1.414L13.414 12l4.88 4.879a1 1 0 01-1.414 1.414L12 13.414l-4.879 4.88a1 1 0 01-1.414-1.414L10.586 12 5.707 7.121a1 1 0 010-1.414z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <h1
                  className={`text-2xl font-semibold mb-4 text-secondary text-center`}
                >
                  {selectedRow.type.replace(/([A-Z])/g, " $1").trim()} Details
                </h1>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedRow).map(
                    ([key, value]) =>
                      key !== "type" && (
                        <div key={key}>
                          <label className="font-medium mb-2">{key}:</label>
                          <CustomTextField
                            value={
                              key.toLowerCase().includes("time") && value
                                ? (() => {
                                    console.log("Original value:", value);
                                    const estTime = dayjs
                                      .utc(value)
                                      .tz("America/New_York")
                                      .format(
                                        "ddd, DD MMM YYYY HH:mm:ss [GMT]",
                                      );
                                    console.log("EST Time:", estTime);
                                    return estTime;
                                  })()
                                : key === "description" &&
                                    (!value || String(value).trim() === "")
                                  ? "N/A"
                                  : key === "status" && value === "InProgress"
                                    ? "In Progress"
                                    : value
                            }
                            sx={{ width: "13rem" }}
                          />
                        </div>
                      ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
