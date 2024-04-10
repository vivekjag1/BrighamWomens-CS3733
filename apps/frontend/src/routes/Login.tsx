import React from "react";
import "./Login.css";
/*import { useAuth0 } from "@auth0/auth0-react";*/
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  /*const { loginWithRedirect } = useAuth0();*/
  /*  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
    });
    console.log("hello world");
  }*/
  function handlePathfind() {
    navigate("/home");
  }

  return (
    <div>
      <div
        onClick={handlePathfind}
        className="landing-page w-screen h-screen bg-no-repeat bg-cover bg-center"
      >
        <div className="opening-remarks w-screen h-screen flex flex-col justify-center items-center gap-12">
          <h2 className="text-7xl font-semibold text-white">
            Welcome to Brigham and Women's Hospital
          </h2>
          <p className="font-normal text-5xl text-white">
            Navigation made simple
          </p>
          <p className="font-light text-3xl text-white">
            Touch the screen to begin.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
