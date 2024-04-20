import { Card, CardContent, styled } from "@mui/material";
import { ReactNode } from "react";

const CustomCardContent = styled(CardContent)({
  display: "flex",
  "&:last-child": {
    padding: 0,
    paddingBottom: 0,
  },
});

interface FormContainerProps {
  children: ReactNode;
}

export function FormContainer({ children }: FormContainerProps) {
  return (
    <div className="h-screen overflow-auto">
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center gap-2 mx-5 my-8">
          <Card className="drop-shadow-2xl w-full max-w-5xl rounded-lg my-8 overflow-hidden">
            <CustomCardContent>{children}</CustomCardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FormContainer;
