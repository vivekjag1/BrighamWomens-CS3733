import React from "react";
import { EmployeeGetter } from "./EmployeeGetter";

const EmployeeTable = () => {
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
          <div className="flex flex-col items-center justify-center"></div>
          <hr className="m-1" />
          <div className="flex flex-col items-center">
            <EmployeeGetter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
