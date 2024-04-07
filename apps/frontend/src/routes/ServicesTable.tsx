import React from "react";
//import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ServiceRequestGetter } from "../components/ServiceRequestGetter.tsx";

function ServiceTable() {
  return (
    <div className="w-94 grid justify-items-center">
      <div className={"flex flex-col gap-5"}>
        <h1 className="pt-9 text-3xl text-center font-bold">
          Service Requests
        </h1>
        <hr className="m-2" />
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 m-2 shadow-md">
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

export default ServiceTable;
