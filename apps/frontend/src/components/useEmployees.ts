import { useState, useEffect } from "react";
import { APIEndpoints } from "common/src/APICommon.ts";
import { EmployeeType } from "common/src/EmployeeType.ts";
import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
import { useAuth0 } from "@auth0/auth0-react";

export const useEmployees = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function fetchEmployees() {
      const token = await getAccessTokenSilently();

      try {
        const res = await MakeProtectedGetRequest(
          APIEndpoints.employeeGetRequest,
          token,
        );
        const sortedData = res.data.sort((a: EmployeeType, b: EmployeeType) =>
          a.name.localeCompare(b.name),
        );
        setEmployees(sortedData);

        console.log("Successfully got data from get request:", res.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }

    fetchEmployees();
    console.log("sorted employees", employees);
  }, [getAccessTokenSilently, employees]);

  return employees;
};
