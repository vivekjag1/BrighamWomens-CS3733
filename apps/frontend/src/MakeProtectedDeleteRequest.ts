import axios from "axios";
export async function makeProtectedDeleteRequest(
  apiToCall: string,
  data: object,
  token: string,
) {
  const retVal = await axios.delete(apiToCall, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { sentData: data },
  });
  return retVal;
}
