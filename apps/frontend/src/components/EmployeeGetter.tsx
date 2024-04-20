import React, { useEffect, useState } from "react";
import { APIEndpoints } from "common/src/APICommon.ts";
import { Employee } from "database";
import { useAuth0 } from "@auth0/auth0-react";
import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
import EmployeeFilterDropdown from "./EmployeeFilterDropdown.tsx";
import { checkAuth } from "../checkAdminStatus.ts";

export function EmployeeGetter() {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterBySearch, setFilterBySearch] = useState("");
  const [filterByPosition, setFilterByPosition] = useState<string[]>([]);
  const [filterByRole, setFilterByRole] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<Employee[]>([]);
  const [selectedRow, setSelectedRow] = useState<Employee | null>(null);

  const { getAccessTokenSilently } = useAuth0();
  const [authorizedStatus, setStatus] = useState<boolean>(false);

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

        console.log("Successfully got data from get request:", res.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    }
    fetchData();
  }, [getAccessTokenSilently, sortOrder]);

  useEffect(() => {
    let data = employeeData;

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
  }, [employeeData, filterByPosition, filterByRole, filterBySearch, sortOrder]);

  // function truncateString(str: string, num: number) {
  //     if (str.length <= num) {
  //         return str;
  //     }
  //     return str.slice(0, num) + "...";
  // }

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

  const handleRowClick = (employee: Employee) => {
    setSelectedRow(employee);
    console.log(selectedRow);
  };

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
      <table className="mx-auto text-sm text-center rtl:text-right text-gray-500 shadow-md mb-10">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 w-[18ch]">
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
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>

            <th scope="col" className="px-6 py-3 w-[18ch]">
              Username
            </th>
            <th scope="col" className="px-6 py-3 w-[15ch]">
              Position
            </th>
            {authorizedStatus && (
              <>
                <th scope="col" className="px-6 py-3 w-[18ch]">
                  Password
                </th>

                <th scope="col" className="px-6 py-3 w-[15ch]">
                  Role
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((employee) => (
            <tr
              className="bg-white border-b h-16 hover:bg-gray-100"
              key={employee.employeeID}
              onClick={() => handleRowClick(employee)}
            >
              <td className="px-6 py-4">{employee.employeeID}</td>
              <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                <img
                  className="w-10 h-10 rounded-full"
                  src={`../../assets/temp-employees/${employee.profilePicture}.jpeg`}
                  alt={`${employee.name} image`}
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    {highlightSearchTerm(employee.name, filterBySearch)}
                  </div>
                </div>
              </td>
              <td>{highlightSearchTerm(employee.userName, filterBySearch)}</td>
              <td>{highlightSearchTerm(employee.position, filterBySearch)}</td>
              {authorizedStatus && (
                <>
                  <td>{employee.password}</td>
                  <td>{highlightSearchTerm(employee.role, filterBySearch)}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
