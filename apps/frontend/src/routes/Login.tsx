import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import bwhLogoSemiNaked from "../../assets/bwh-logo-semi-naked.svg";

function Login() {
  const { loginWithRedirect } = useAuth0();
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
    });
    console.log("hello world");
  }

  return (
    <div className="h-screen w-screen bg-cover bg-[url('../../assets/bwh-exterior-default.png')]  relative">
      <div className="h-screen w-screen relative flex flex-col justify-center items-center">
        <form
          className="flex flex-col items-start justify-start align-middle gap-2 p-8 bg-white rounded-2xl dropshadow-2xlg hover:ring-white hover:ring-8 absolute"
          onSubmit={handleLogin}
        >
          <button type="submit" className="flex flex-col items-center gap-2 ">
            <img
              className="w-[500px] h-[60px]"
              src={bwhLogoSemiNaked}
              alt="Brigham and Women's Hospital Logo"
            />
            {/*<p className="font-bold text-3xl text-blue-900">Welcome Back!</p>*/}
            <p className="font-bold text-2xl text-blue-900">Click to Login</p>
          </button>
        </form>
      </div>
    </div>
  );
}

// function AuthZeroLogin() {
//   const navigate = useNavigate();
//
//   return (
//     <Auth0Provider
//       useRefreshTokens
//       cacheLocation="localstorage"
//       domain="dev-7eoh0ojk0tkfhypo.us.auth0.com"
//       clientId="U8XpuA4s1L8lmd1avUIOupo1494YlppB"
//       onRedirectCallback={(appState) => {
//           navigate(appState?.returnTo || window.location.pathname);
//
//       }}
//       authorizationParams={{
//         redirect_uri: window.location.origin,
//         audience: "/api",
//         scope: "openid profile email offline_access",
//       }}
//     >
//       <Login />
//     </Auth0Provider>
//   );
// }

export default Login;
