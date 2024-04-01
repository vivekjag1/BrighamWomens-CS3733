import { Button } from "@mui/material";
import { ChangeEvent } from "react";
import axios from "axios";
import { APIEndpoints, mapAttributes } from "common/src/api";

function NodeTable() {
  async function csvHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files!.length != 0) {
      const formData = new FormData();
      const file = e.target.files![0];
      const fileName = file.name;

      formData.append(mapAttributes.edgeFileName, file, fileName);

      try {
        await axios.post(APIEndpoints.mapUpload, formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        });

        alert("File uploaded!");
      } catch {
        alert("File failed to upload!");
      }
    } else {
      alert("No file was submitted");
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl text-center">Upload File with Node Data</h1>
        <hr className="m-8" />
        <div className="w-screen h-screen flex flex-col items-center gap-[2vh]">
          <h2 className="text-3xl font-bold mt-[2vh]">Node Table</h2>
          <div>
            <div className="flex justify-between">
              <div className="flex">
                <p className="mr-2 mt-1">Import CSV:</p>
                <input
                  id="csvFile"
                  type="file"
                  accept=".csv"
                  name="Import CSV"
                  onChange={csvHandler}
                />
              </div>
              <Button variant="contained">Export CSV</Button>
            </div>
            <table className="text-sm text-center text-gray-500 mt-3">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 drop-shadow-lg">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    nodeID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    xcoord
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ycoord
                  </th>
                  <th scope="col" className="px-6 py-3">
                    floor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    building
                  </th>
                  <th scope="col" className="px-6 py-3">
                    nodeType
                  </th>
                  <th scope="col" className="px-6 py-3">
                    longName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    shortName
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-11">
                  <td>ACONF00102</td>
                  <td>1580</td>
                  <td>2538</td>
                  <td>2</td>
                  <td>BTM</td>
                  <td>HALL</td>
                  <td>Hall</td>
                  <td>Hall</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </div>
  );
}

export default NodeTable;
