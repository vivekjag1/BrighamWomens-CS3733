import React, { useContext } from "react";
import { FallbackProps } from "react-error-boundary";
import ButtonBlue from "./components/ButtonBlue";
import { ToastContext } from "./components/ToastProvider";

function ErrorFallBack({ error, resetErrorBoundary }: FallbackProps) {
  const { showToast } = useContext(ToastContext); // Accessing the showToast method from ToastContext

  // Trigger a toast when the component mounts
  React.useEffect(() => {
    showToast(`An error occurred: ${error.message}`, "error");
  }, [error, showToast]); // Dependencies include error and showToast to handle changes appropriately

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        background: `linear-gradient(
                     180deg,
                     rgba(0, 41, 76, 0.75),
                     rgba(0, 41, 76, 0.75)
                 ), url('../../../assets/bwh-exterior-default.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center p-10">
        <h1 className="text-5xl font-extrabold text-white mb-4">Error</h1>
        <pre className="text-xl font-medium text-white mb-8">
          Error Message: {error.message}
        </pre>
        <ButtonBlue
          onClick={resetErrorBoundary}
          className="text-xl font-semibold text-white bg-red-600 px-6 py-3 rounded shadow hover:bg-red-700 transition duration-200"
        >
          Try Again
        </ButtonBlue>
      </div>
    </div>
  );
}

export default ErrorFallBack;
