function ServiceTable() {
  return (
    <div>
      <div className="m-8">
        <h1 className="text-center text-3xl font-bold">Services Table</h1>
        <div className="relative overflow-x-auto drop-shadow-lg sm:rounded-lg max-w-5xl mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 m-2">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  medicine
                </th>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  floor
                </th>
                <th scope="col" className="px-6 py-3">
                  building
                </th>
                <th scope="col" className="px-6 py-3">
                  room
                </th>
                <th scope="col" className="px-6 py-3">
                  instructions
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

export default ServiceTable;
