function NodeTable() {
  return (
    <div>
      <div className="w-screen flex flex-col align-center">
        <h1 className="text-center text-3xl font-bold">Node Table</h1>
        <input type="file" accept=".csv" />
        <div className="relative overflow-x-auto drop-shadow-lg sm:rounded-lg max-w-5xl mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 m-2">
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
                <th scope="col" className="px-6 py-3">
                  longName
                </th>
                <th scope="col" className="px-6 py-3">
                  shortName
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default NodeTable;
