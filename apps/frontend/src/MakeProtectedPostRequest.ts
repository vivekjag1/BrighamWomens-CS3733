import axios from "axios";

export async function MakeProtectedPostRequest(
  apiToCall: string,
  dataToSend: object,
  token: string,
) {
  const data = await axios.post(apiToCall, dataToSend, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
