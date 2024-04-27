// import { useEffect, useState } from "react";
// import { APIEndpoints } from "common/src/APICommon.ts";
// import { Employee } from "database";
// import { MakeProtectedPostRequest } from "./MakeProtectedPostRequest.ts";
// import { useAuth0 } from "@auth0/auth0-react";
//
// export const useProfile = () => {
//   const [employees, setEmployees] = useState<Employee>();
//   const { getAccessTokenSilently } = useAuth0();
//   useEffect(() => {
//     async function getUser() {
//       const token = await getAccessTokenSilently();
//       const { user } = useAuth0();
//
//       try {
//         const sendToDb = {
//           userName: user!.name,
//         };
//         const res = await MakeProtectedPostRequest(
//           APIEndpoints.fetchUser,
//           sendToDb,
//           token,
//         );
//         setEmployees(res.data);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       }
//     }
//     getUser();
//   }, [getAccessTokenSilently]);
//
//   return employees;
// };
