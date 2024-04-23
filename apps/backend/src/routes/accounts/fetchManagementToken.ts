import axios from "axios";

export async function getManagementToken() {
  try {
    const options = {
      method: "POST",
      url: "https://dev-7eoh0ojk0tkfhypo.us.auth0.com/oauth/token",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "Q0waW2OD3mUhGlULzLuwcLYIo6ljxh6J",
        client_secret:
          "-IkESmF3DM1UFxwZI1p8EilRpJKtflImoTuHgU8dqa1hp_CEMJGQuZ4iHNdaIKDU",
        audience: "https://dev-7eoh0ojk0tkfhypo.us.auth0.com/api/v2/",
      }),
    };
    const data = await axios.request(options);
    return data.data["access_token"];
  } catch (error) {
    console.error(error);
  }
}
