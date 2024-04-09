import React from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
// import { IconButton } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import bwhLogoSemiNaked from "../../assets/bwh-logo-semi-naked.svg";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginWithRedirect } = useAuth0();
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await loginWithRedirect({
      appState: {
        returnTo: location.pathname,
      },
    });
    console.log("hello world");
  }

  return (
    <div className="h-screen w-screen bg-cover bg-[url('../../assets/bwh-exterior-default.png')]  relative">
      <div className="h-screen w-screen relative flex flex-col justify-center items-center">
        <form
          className="flex flex-col items-start justify-start align-middle gap-2 p-5 bg-white rounded-2xl dropshadow-2xlg hover:ring-white hover:ring-8 absolute"
          onSubmit={handleLogin}
        >
          <button type="submit" className="flex flex-col items-center gap-2 ">
            <img
              className="w-[500px] h-[60px]"
              src={bwhLogoSemiNaked}
              alt="Brigham and Women's Hospital Logo"
            />
            <p className="font-bold text-3xl text-blue-900">Welcome Back!</p>
            <p className="font-bold text-2xl text-blue-900">Click to Login</p>
            <div className="p-2">
              {/*<IconButton*/}
              {/*    type="submit"*/}
              {/*    size="small"*/}
              {/*    sx={{*/}
              {/*        width: "65px",*/}
              {/*        height: "65px",*/}
              {/*        backgroundColor: "rgb(0, 58, 150)",*/}
              {/*        borderRadius: "10px",*/}
              {/*        "&:hover": {*/}
              {/*            backgroundColor: "hsl(184, 90%, 33%)",*/}
              {/*        },*/}
              {/*    }}*/}
              {/*>*/}
              {/*    <ArrowForwardIcon*/}
              {/*        sx={{*/}
              {/*            color: "rgb(255,255,255)"*/}
              {/*        }}/>*/}
              {/*</IconButton>*/}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

function AuthZeroLogin() {
  const navigate = useNavigate();

  return (
    <Auth0Provider
      useRefreshTokens
      cacheLocation="localstorage"
      domain="dev-7eoh0ojk0tkfhypo.us.auth0.com"
      clientId="U8XpuA4s1L8lmd1avUIOupo1494YlppB"
      onRedirectCallback={() => {
        navigate("/home");
      }}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "/api",
        scope: "openid profile email offline_access",
      }}
    >
      <Login />
    </Auth0Provider>
  );
}

export default AuthZeroLogin;
