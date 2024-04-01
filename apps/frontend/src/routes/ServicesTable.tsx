function ServicesTable() {
  return (
    <div>
      <div className="m-8">
        <h1 className="text-3xl text-center">Upload File with Node Data</h1>
        <hr className="m-8" />
        <div className="w-screen h-screen flex flex-col items-center gap-[2vh]">
          <h1 className="text-center text-3xl font-bold">Services Table</h1>
          <div className="relative overflow-x-auto drop-shadow-lg sm:rounded-lg max-w-5xl mx-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 m-2">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ServiceID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    timeStamp
                  </th>
                  <th scope="col" className="px-6 py-3">
                    roomNum
                  </th>
                  <th scope="col" className="px-6 py-3">
                    deliveryInstructions
                  </th>
                  <th scope="col" className="px-6 py-3">
                    requestingUsername
                  </th>
                  <th scope="col" className="px-6 py-3">
                    locationType
                  </th>
                  <th scope="col" className="px-6 py-3">
                    medicineName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    dosage
                  </th>
                  <th scope="col" className="px-6 py-3">
                    patientName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    useInstructions
                  </th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesTable;
