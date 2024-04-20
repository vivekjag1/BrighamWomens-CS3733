import { useState } from "react";
import { NodeGetter } from "./NodeGetter.tsx";
import { EdgeGetter } from "./EdgeGetter.tsx";

export default function NonAdminMapData(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("node");
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const getButtonClasses = (tabName: string): string => {
    return `inline-block p-4 rounded-t-lg hover:text-blue-500 hover:border-blue-500 ${
      activeTab === tabName
        ? "text-[#012D5A] border-[#012D5A] border-b-[3px]" // Active tab styles
        : "border-gray-300 border-gray-300 focus:text-blue-500 focus:border-blue-500 border-b-2" // Inactive tab styles
    } focus:outline-none`;
  };
  return (
    <div className=" h-screen overflow-y-scroll bg-gray-50">
      <div className="w-full items-center">
        <div className="flex flex-col items-center gap-8 ">
          <div className="flex flex-col items-center gap-2 mt-8">
            <h2 className="w-full text-3xl font-bold text-center">Map Data</h2>
            <h2 className="w-full text-md text-center">
              View and modify map data files
            </h2>
            <hr className="pl-96 pr-96" />
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center justify-center gap-2"></div>
            </div>

            <hr className="m-1" />
            <ul
              className="flex flex-wrap text-sm font-medium text-center justify-center mb-5"
              id="default-tab"
            >
              <li className="mr-2" role="presentation">
                <button
                  className={getButtonClasses("node")}
                  onClick={() => handleTabChange("node")}
                  type="button"
                >
                  Node Table
                </button>
              </li>
              <li role="presentation">
                <button
                  className={getButtonClasses("edge")}
                  onClick={() => handleTabChange("edge")}
                  type="button"
                >
                  Edge Table
                </button>
              </li>
            </ul>

            {activeTab === "node" && (
              <div className="mx-8">
                <table className="text-sm text-center text-gray-500 mt-3 shadow-md mb-10">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                      <th scope="col" className="px-0 py-3">
                        longName
                      </th>
                      <th scope="col" className="px-0 py-3">
                        shortName
                      </th>
                    </tr>
                  </thead>
                  {<NodeGetter />}
                </table>
              </div>
            )}

            {activeTab === "edge" && (
              <div>
                <table className="text-sm text-gray-500 mt-3 shadow-md text-center mb-10">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        edgeID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        startNodeID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        endNodeID
                      </th>
                    </tr>
                  </thead>
                  {<EdgeGetter />}
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
