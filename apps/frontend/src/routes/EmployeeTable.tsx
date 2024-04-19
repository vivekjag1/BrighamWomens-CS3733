import { Button } from "@mui/material";
import React, { useState } from "react";
import { APIEndpoints } from "common/src/APICommon.ts";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import { useAuth0 } from "@auth0/auth0-react";
import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";
import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
import { useToast } from "../components/useToast.tsx";

const EmployeeTable = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [employeesFile, setEmployeesFile] = useState<File | null>(null);
  const { showToast } = useToast();

  const employeeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setEmployeesFile(event.target.files[0]);
    }
  };

  async function downloadFiles() {
    console.log("called  download files");

    const token = await getAccessTokenSilently();
    const retFromAPI = await MakeProtectedGetRequest(
      APIEndpoints.mapDownload,
      token,
    );

    const employeesBlob = new Blob([retFromAPI.data[1]], {
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
          showToast("Map data uploaded!", "success");
          location.reload();
        }
      } else {
        showToast("One or more map files are missing!", "error");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      showToast("Failed to upload map data!", "error");
    }
  }

  return (
    <div className="h-screen overflow-y-auto">
      <div className="w-full items-center">
        <div className="flex flex-col items-center gap-8 ">
          <div className="flex flex-col items-center gap-2 mt-8">
            <h2 className="w-full text-3xl font-bold text-center">Employees</h2>
            <h2 className="w-full text-md text-center">
              View and modify all employee data
            </h2>
            <hr className="pl-96 pr-96" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex flex-row items-center">
              <p className="mr-2 font-bold">Employees File:</p>
              <Button
                variant="contained"
                component="label"
                style={{ backgroundColor: employeesFile ? "green" : "#012D5A" }}
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

          <div className="flex flex-row items-center gap-2 mb-5 mt-2">
            <div>
              <Button
                variant="contained"
                onClick={uploadFiles}
                sx={{ backgroundColor: "#012D5A" }}
                endIcon={<UploadIcon />}
              >
                Upload Map Data
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                onClick={downloadFiles}
                sx={{ backgroundColor: "#012D5A" }}
                endIcon={<DownloadIcon />}
              >
                Download Map Data
              </Button>
            </div>
          </div>

          <hr className="m-1" />

          <div className="flex flex-col items-center">
            <table className="text-sm text-gray-500 mt-3 shadow-md text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="sr-only">checkbox</label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrape"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="../../assets/temp-employees/default-photo.jpg"
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">Wilson Wong</div>
                      <div className="font-normal text-gray-500">
                        wwong@brighamwomens.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">Teacher</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                      Inctive
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrape"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="../../assets/temp-employees/vivek-jagadeesh.jpeg"
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        Vivek Jagadeesh
                      </div>
                      <div className="font-normal text-gray-500">
                        vjagadeesh@brighamwomens.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">Edger</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      Active
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="checkbox-table-search-2"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="../../assets/temp-employees/andy-truong.jpeg"
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">Andy Truong</div>
                      <div className="font-normal text-gray-500">
                        atruong@brighamwomens.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">Homophobe</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                      Inactive
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="checkbox-table-search-2"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="../../assets/temp-employees/matt-brown.jpeg"
                      alt="Matt image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        Matthew Brown
                      </div>
                      <div className="font-normal text-gray-500">
                        mjbrown2@brighamwomens.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">Janitor</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      Active
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="checkbox-table-search-2"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="../../assets/temp-employees/dan-gorbunov.jpeg"
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        Daniel Gorbunov
                      </div>
                      <div className="font-normal text-gray-500">
                        dgorbunov@brighamwomens.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">AWS/Git God</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                      Inactive
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="checkbox-table-search-2"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="../../assets/temp-employees/joe-cardarelli.jpeg"
                      alt="Joe image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        Joseph Cardarelli
                      </div>
                      <div className="font-normal text-gray-500">
                        kcardarelli@brighamwomens.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">Class</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      Active
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="checkbox-table-search-2"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="../../assets/temp-employees/taeha-song.jpeg"
                      alt="Taeha image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">Taeha Song</div>
                      <div className="font-normal text-gray-500">
                        tsong@brighamwomens.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">Vaper</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                      Inactive
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="checkbox-table-search-2"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="../../assets/temp-employees/franky.jpeg"
                      alt="Joe image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        Francesco Di Mise
                      </div>
                      <div className="font-normal text-gray-500">
                        fmise@brighamwomens.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">Overwatcher</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      Active
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="checkbox-table-search-2"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="../../assets/temp-employees/colin.jpeg"
                      alt="Taeha image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        Colin Masucci
                      </div>
                      <div className="font-normal text-gray-500">
                        cmasucci@brighamwomens.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">Rocket Leaguer</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                      Inactive
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="checkbox-table-search-2"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="../../assets/temp-employees/sulaiman.jpeg"
                      alt="Joe image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        Sulaiman Moukheiber
                      </div>
                      <div className="font-normal text-gray-500">
                        smoukheiber@brighamwomens.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">Lentilist</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      Active
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="checkbox-table-search-2"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="../../assets/temp-employees/griffin-brown.jpeg"
                      alt="Taeha image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        Griffin Brown
                      </div>
                      <div className="font-normal text-gray-500">
                        gbrown@brighamwomens.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">Orchestrator</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                      Inactive
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="checkbox-table-search-2"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="../../assets/temp-employees/adem.jpeg"
                      alt="Joe image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        Mohamed Adem Djadid
                      </div>
                      <div className="font-normal text-gray-500">
                        mdjadid@brighamwomens.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">CEO</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                      Active
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
