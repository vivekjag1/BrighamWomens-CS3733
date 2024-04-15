import { Card, CardContent } from "@mui/material";
import { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
}

export function FormContainer({ children }: FormContainerProps) {
  return (
    <div className="flex justify-center items-center w-full min-h-screen py-8 px-4">
      <Card className="drop-shadow-2xl w-full max-w-lg rounded-lg">
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}

export default FormContainer;
