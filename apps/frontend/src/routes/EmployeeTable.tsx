import React, { useEffect, useState } from "react";
// import { APIEndpoints } from "common/src/APICommon.ts";
// import UploadIcon from "@mui/icons-material/Upload";
// import DownloadIcon from "@mui/icons-material/Download";
import { useAuth0 } from "@auth0/auth0-react";
// import { EmployeeGetter } from "../components/EmployeeGetter.tsx";
// import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
// import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
import { checkAuth } from "../checkAdminStatus.ts";
import AdminEmployeeTable from "../components/AdminEmployeeTable.tsx";
import NonAdminEmployeeTable from "../components/NonAdminEmployeeTable.tsx";

const EmployeeTable = () => {
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

  return authorizedStatus ? <AdminEmployeeTable /> : <NonAdminEmployeeTable />;
};

export default EmployeeTable;
