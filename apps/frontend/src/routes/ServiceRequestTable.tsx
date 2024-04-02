import React from "react";
//import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ServiceRequestGetter } from "../components/ServiceRequestGetter.tsx";

function App() {
  return (
    <div className="w-full grid justify-items-center">
      <div className={"flex flex-col gap-5"}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 m-2">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Service ID
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Room Number
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Instructions
              </th>
              <th scope="col" className="px-6 py-3">
                Requesting Username
              </th>
              <th scope="col" className="px-6 py-3">
                Timestamp
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
            </tr>
          </thead>
          {<ServiceRequestGetter />}
        </table>
      </div>
    </div>
  );
}

export default App;
