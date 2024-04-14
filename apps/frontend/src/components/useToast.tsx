import { useContext } from "react";
import { ToastContext } from "./ToastProvider.tsx";

export const useToast = () => useContext(ToastContext);
