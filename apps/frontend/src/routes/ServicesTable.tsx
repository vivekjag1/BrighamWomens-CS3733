import React from "react";
//import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ServiceRequestGetter } from "../components/ServiceRequestGetter.tsx";

function ServiceTable() {
  return (
    <div className=" h-screen overflow-y-scroll">
      <div className="w-full justify-items-center">
        <div className={"flex flex-col items-center gap-5"}>
          <h1 className="pt-9 text-3xl text-center font-bold">
            Service Requests
          </h1>
          <hr className="m-2 pl-96 pr-96" />
          <ServiceRequestGetter />
        </div>
      </div>
    </div>
  );
}

export default ServiceTable;
