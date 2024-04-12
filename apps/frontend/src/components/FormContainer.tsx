import { Card, CardContent } from "@mui/material";
import { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
}

export function FormContainer({ children }: FormContainerProps) {
  return (
    <div className="h-screen">
      <div className="w-full h-screen bg-gray-200 flex justify-center items-start pt-[3rem]">
        <Card className="drop-shadow-2xl" sx={{ borderRadius: "10px" }}>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FormContainer;