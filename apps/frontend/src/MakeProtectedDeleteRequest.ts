import axios from "axios";
export async function MakeProtectedDeleteRequest(
  apiToCall: string,
  token: string,
) {
  const retVal = await axios.delete(apiToCall, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return retVal;
}
