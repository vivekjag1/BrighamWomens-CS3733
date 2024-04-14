import { useContext } from "react";
import { ToastContext } from "../components/ToastProvider.tsx";

export const useToast = () => useContext(ToastContext);
