import { useAuth0 } from "@auth0/auth0-react";
import AdminMapData from "../components/AdminMapData.tsx";
import { useEffect, useState } from "react";
import NonAdminMapData from "../components/NonAdminMapData.tsx";
import { checkAuth } from "../checkAdminStatus.ts";
const NodeTable = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [authorizedStatus, setStatus] = useState<boolean>(false);
  useEffect(() => {
    const checkRole = async () => {
      const token = await getAccessTokenSilently();
      const result = await checkAuth(token, "mapdata");
      setStatus(result!);
    };
    checkRole().then();
  }, [getAccessTokenSilently]);

  return authorizedStatus ? <AdminMapData /> : <NonAdminMapData />;
};
export default NodeTable;
