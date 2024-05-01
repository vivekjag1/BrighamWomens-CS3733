import { Card, CardContent, styled } from "@mui/material";
import { ReactNode } from "react";

const CustomCardContent = styled(CardContent)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  "&:last-child": {
    padding: 0,
    paddingBottom: 0,
  },
});

interface FormContainerProps {
  imgPath: string;
  alt: string;
  children: ReactNode;
}

export function FormContainer({ imgPath, alt, children }: FormContainerProps) {
  return (
    <div className="h-screen overflow-auto">
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center gap-2 mx-5 my-[4vh]">
          <Card
            className="shadow-xl drop-shadow w-full max-w-5xl overflow-hidden"
            sx={{ borderRadius: "20px" }}
          >
            <CustomCardContent>
              {children}
              <div>
                <div
                  style={{
                    background:
                      "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.75) 25%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.25) 75%, rgba(255, 255, 255, 0) 100%)",
                    position: "absolute",
                    width: "20%",
                    height: "100%",
                  }}
                ></div>
                <img
                  src={imgPath}
                  alt={alt}
                  className="w-[40rem] h-[750px] object-cover"
                />
              </div>
            </CustomCardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FormContainer;
