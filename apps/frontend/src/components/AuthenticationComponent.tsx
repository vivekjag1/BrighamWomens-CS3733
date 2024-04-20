import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

interface AuthGuardProps {
  component: React.ComponentType;
}

export default function AuthComp(props: AuthGuardProps): JSX.Element {
  const Component = withAuthenticationRequired(props.component, {
    onRedirecting: () => {
      return <div>Loading!</div>;
    },
  });
  return <Component />;
}
