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
          <Card
            className="shadow-xl drop-shadow w-full max-w-5xl my-8 p-5 overflow-hidden"
            sx={{ borderRadius: "20px" }}
          >
            <CustomCardContent>{children}</CustomCardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FormContainer;
