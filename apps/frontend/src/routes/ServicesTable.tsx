import React from "react";
//import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ServiceRequestGetter } from "../components/ServiceRequestGetter.tsx";

function ServiceTable() {
  return (
    <div className=" h-screen overflow-auto bg-offwhite">
      <div className="w-full justify-items-center">
        <div className="flex flex-col items-center gap-2 mx-5">
          <div className="flex flex-col items-center gap-2 mt-8">
            <h2 className="w-full text-3xl font-bold text-center">
              Service Request Data
            </h2>
            <h2 className="w-full text-md text-center">
              View service request data
            </h2>
            <hr className="pl-96 pr-96 mb-7" />
          </div>
          <ServiceRequestGetter />
        </div>
      </div>
    </div>
  );
}

export default ServiceTable;
