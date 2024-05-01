export function readMapDataFile(contents: string) {
  return contents
    .split("\r\n") // crlf
    .slice(1, -1) // remove header and extra line at bottom
    .map((row) => row.split(",")); // split (csv)
}

export function readEmployeeFile(csvData: string) {
  const rows = csvData.split("\r\n"); // crlf
  return rows.map((row) => row.split(",")); // split (csv)
}
