import React, { createContext, useState } from "react";

interface ToastContextType {
  showToast: (message: string, type: "success" | "error" | "warning") => void;
  hideToast: (id: number) => void;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "warning";
  isVisible: boolean;
}

export const ToastContext = createContext<ToastContextType>({
  showToast: (message: string, type: "success" | "error" | "warning") => {
    console.error(
      "showToast function called without a ToastProvider:",
      message,
      type,
    );
  },
  hideToast: (id: number) => {
    console.error("hideToast function called without a ToastProvider", id);
  },
});

const iconStyles = {
  success: {
    svgPath:
      "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z",
    svgClass: "text-green-500 bg-green-100",
  },
  error: {
    svgPath:
      "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z",
    svgClass: "text-red-500 bg-red-100",
  },
  warning: {
    svgPath:
      "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z",
    svgClass: "text-yellow-500 bg-yellow-100",
  },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    message: string,
    type: "success" | "error" | "warning",
  ) => {
    const id = new Date().getTime();
    if (toasts.length > 0 && message == toasts[0].message) {
      return;
    } else {
      setToasts((prevToasts) => [
        { id, message, type, isVisible: true },
        ...prevToasts,
      ]);

      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.map((toast) =>
            toast.id === id ? { ...toast, isVisible: false } : toast,
          ),
        );
        setTimeout(() => {
          setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id),
          );
        }, 1500);
      }, 5000);
    }
  };

  const hideToast = (id: number) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, isVisible: false } : toast,
      ),
    );
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 1500);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="fixed right-5 z-50 transition-all duration-500 ease-in-out"
          style={{
            top: `${2 + 5 * index}rem`,
            opacity: toast.isVisible ? 1 : 0,
            width: "22rem",
          }}
        >
          <div
            className="flex items-center p-4 mb-4 text-gray-500 bg-white rounded-lg shadow"
            role="alert"
          >
            <div
              className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${iconStyles[toast.type].svgClass} rounded-lg`}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d={iconStyles[toast.type].svgPath} />
              </svg>
              <span className="sr-only">Icon</span>
            </div>
            <div className="ml-3 text-sm font-normal" style={{ flex: 1 }}>
              {toast.message}
            </div>
            <button
              type="button"
              onClick={() => hideToast(toast.id)}
              aria-label="Close"
              className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </ToastContext.Provider>
  );
};
