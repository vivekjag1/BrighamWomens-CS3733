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
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";

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

  const [employeesFile, setEmployeesFile] = useState<File | null>(null);
  const { showToast } = useToast();

  const employeeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setEmployeesFile(event.target.files[0]);
    }
  };

  async function downloadFiles() {
    console.log("called download files");

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
          console.log("bad file");
          showToast("File(s) failed validation!", "error");
        } else {
          console.log("success");
          showToast("Employee data uploaded!", "success");
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

  return (
    <div className="h-screen overflow-y-auto">
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
                  <p className="mr-2 font-bold">Employees File:</p>
                  <Button
                    variant="contained"
                    component="label"
                    style={{
                      backgroundColor: employeesFile ? "green" : "#012D5A",
                    }}
                  >
                    {employeesFile ? employeesFile.name : "Upload File"}
                    <input
                      id="importNodeFile"
                      type="file"
                      accept=".csv"
                      name="Import Node File"
                      onChange={employeeFileChange}
                      hidden
                    />
                  </Button>
                </div>
              </div>
              <div className="flex flex-row items-center gap-x-2">
                <div>
                  <Button
                    variant="contained"
                    onClick={uploadFiles}
                    sx={{ backgroundColor: "#012D5A" }}
                    endIcon={<UploadIcon />}
                  >
                    Upload Employee Data
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    onClick={downloadFiles}
                    sx={{ backgroundColor: "#012D5A" }}
                    endIcon={<DownloadIcon />}
                  >
                    Download Employee Data
                  </Button>
                </div>
              </div>
            </>
          )}

          <hr className="m-1" />

          <div className="flex flex-col items-center">
            <EmployeeGetter />
          </div>
        </div>
      </div>
    </div>
  );

  // return authorizedStatus ? <AdminEmployeeTable /> : <NonAdminEmployeeTable />;
};

export default EmployeeTable;
