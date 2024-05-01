import ButtonBlue from "./components/ButtonBlue";
import { FallbackProps } from "react-error-boundary";

function ErrorFallBack(props: FallbackProps) {
  return (
    <div>
      <h1>Something went wrong 🤔</h1>
      <pre className="text-default">{props.error.message}</pre>
      <ButtonBlue onClick={props.resetErrorBoundary}>Back</ButtonBlue>
    </div>
  );
}

export default ErrorFallBack;
