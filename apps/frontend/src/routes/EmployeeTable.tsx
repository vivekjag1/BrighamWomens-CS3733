import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { checkAuth } from "../checkAdminStatus.ts";
// import AdminEmployeeTable from "../components/AdminEmployeeTable.tsx";
// import NonAdminEmployeeTable from "../components/NonAdminEmployeeTable.tsx";
import { useToast } from "../components/useToast.tsx";
import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
import { EmployeeGetter } from "../components/EmployeeGetter.tsx";
import ButtonBlue from "../components/ButtonBlue.tsx";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const EmployeeTable = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [authorizedStatus, setStatus] = useState<boolean>(false);
  const [uploadTriggered, setUploadTriggered] = useState<boolean>(false);

  useEffect(() => {
    const checkRole = async () => {
      const token = await getAccessTokenSilently();
      const result = await checkAuth(token, "employeetable");
      setStatus(result!);
    };
    checkRole().then();
  }, [getAccessTokenSilently]);

  const [employeesFile, setEmployeesFile] = useState<File | null>(null);
  const { showToast } = useToast();

  const employeeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setEmployeesFile(event.target.files[0]);
    }
  };

  async function downloadFiles() {
    const token = await getAccessTokenSilently();
    const retFromAPI = await MakeProtectedGetRequest(
      APIEndpoints.employeeDownload,
      token,
    );

    const employeesBlob = new Blob([retFromAPI.data], {
      type: "text/csv;charset =utf-8",
    }); //create blob
    const employeesLink = document.createElement("a");
    employeesLink.href = URL.createObjectURL(employeesBlob); //create links
    employeesLink.download = "Employees"; //name files
    employeesLink.click(); //open them;
  }

  async function uploadFiles() {
    try {
      if (employeesFile != null) {
        const formData = new FormData();
        formData.append("Employees", employeesFile, employeesFile.name);
        const token = await getAccessTokenSilently();
        const res = await MakeProtectedPostRequest(
          APIEndpoints.employeePostRequest,
          formData,
          token,
        );
        if (res.status == 202) {
          showToast("File(s) failed validation!", "error");
        } else {
          await makeUsers();
          showToast("Employee data uploaded!", "success");
          setUploadTriggered(true);
          setTimeout(() => setUploadTriggered(false), 500);
          location.reload();
        }
      } else {
        showToast("Employee file missing!", "error");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      showToast("Failed to upload employee data!", "error");
    }
  }

  async function makeUsers() {
    try {
      const token = await getAccessTokenSilently();
      MakeProtectedGetRequest(APIEndpoints.makeEmployee, token);
    } catch (error) {
      console.error("user already exists!");
      return;
    }
  }

  return (
    <div className="h-screen overflow-y-auto bg-offwhite">
      <div className="w-full items-center">
        <div className="flex flex-col items-center gap-5 ">
          <div className="flex flex-col items-center gap-2 mt-8">
            <h2 className="w-full text-3xl font-bold text-center">Employees</h2>
            <h2 className="w-full text-md text-center">
              View and modify all employee data
            </h2>
            <hr className="pl-96 pr-96" />
          </div>
          {authorizedStatus && (
            <>
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row items-center">
                  <ButtonBlue
                    component="label"
                    style={{
                      backgroundColor: employeesFile ? "green" : "",
                    }}
                    endIcon={employeesFile ? undefined : <FileUploadIcon />}
                  >
                    {employeesFile ? employeesFile.name : "Employee File"}
                    <input
                      id="importNodeFile" //TODO: remove/rename these
                      type="file"
                      accept=".csv"
                      name="Import Node File"
                      onChange={employeeFileChange}
                      hidden
                    />
                  </ButtonBlue>
                </div>
              </div>
              <div className="flex flex-row items-center gap-x-2">
                <div>
                  <ButtonBlue
                    onClick={uploadFiles}
                    endIcon={<CloudUploadIcon />}
                  >
                    Upload
                  </ButtonBlue>
                </div>
                <div>
                  <ButtonBlue
                    onClick={downloadFiles}
                    endIcon={<CloudDownloadIcon />}
                  >
                    Download Data
                  </ButtonBlue>
                </div>
              </div>
            </>
          )}

          <hr />

          <div className="flex flex-col items-center">
            <EmployeeGetter uploadTriggered={uploadTriggered} />
          </div>
        </div>
      </div>
    </div>
  );

  // return authorizedStatus ? <AdminEmployeeTable /> : <NonAdminEmployeeTable />;
};

export default EmployeeTable;
