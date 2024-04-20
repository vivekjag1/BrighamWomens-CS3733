import { jwtDecode } from "jwt-decode";
export async function checkAuth(token: string, pageName: string) {
  const decoded = jwtDecode(token);
  if (decoded && "permissions" in decoded) {
    const permissions = decoded["permissions"];
    if ((permissions as string[]).includes(`edit:${pageName}`)) {
      return true;
    } else {
      return false;
    }
  }
}
