import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import "../routes/hero/Hero.css";
import "../routes/hero/Hero.css";
interface AuthGuardProps {
  component: React.ComponentType;
}

export default function AuthComp(props: AuthGuardProps): JSX.Element {
  const Component = withAuthenticationRequired(props.component, {
    onRedirecting: () => {
      return (
        <div>
          <div className="landing-page w-screen h-screen bg-no-repeat bg-cover bg-center">
            <div className="text-fade-in w-screen h-screen flex flex-col justify-center items-center gap-8">
              <p className="text-[3vw] font-semibold text-white">
                Brigham and Women's Hospital
              </p>
              <p className="font-light text-[2vw] text-white animate-pulse">
                Loading
              </p>
            </div>
          </div>
        </div>
      );
    },
  });

  return <Component />;
}
