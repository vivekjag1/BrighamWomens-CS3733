import axios from "axios";
export async function MakeProtectedPatchRequest(
  apiToCall: string,
  data: object,
  token: string,
) {
  const retVal = await axios.patch(apiToCall, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return retVal;
}
