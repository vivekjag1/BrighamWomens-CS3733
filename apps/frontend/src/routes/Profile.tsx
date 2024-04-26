import * as React from "react";
import { Card, CardContent, styled } from "@mui/material";
// import josephImage from "../../assets/employees/joe-cardarelli.jpeg";
import { useAuth0 } from "@auth0/auth0-react";

const CustomCardContent = styled(CardContent)({
  display: "flex",
  "&:last-child": {
    padding: 0,
    paddingBottom: 0,
  },
});

export default function Profile() {
  const { user } = useAuth0();

  return (
    <div className="bg-offwhite h-screen">
      <div className="flex justify-center">
        {/*First profile section*/}
        <div className="flex flex-col">
          <Card
            className="shadow-xl drop-shadow m-4"
            sx={{ borderRadius: "20px" }}
          >
            <div className="w-[20vw] h-[94vh] bg-white rounded-[30px] ">
              <CustomCardContent>
                <div className="w-full h-full flex justify-center ">
                  <img
                    className="w-60 h-60 object-cover rounded-full flex justify-center"
                    src={user!.picture}
                    alt="User photo"
                  />
                </div>
              </CustomCardContent>
              <div className="items-center">
                <label className=" text-center">{user!.name}</label>
                <br />
                <label className=" text-center">{user!.email}</label>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col">
          <Card
            className="shadow-xl drop-shadow m-4"
            sx={{ borderRadius: "20px" }}
          >
            <div className="w-[50vw] h-[45vh] bg-white rounded-[30px]">
              <CustomCardContent>Quadrant 2 Content</CustomCardContent>
            </div>
          </Card>

          <Card
            className="shadow-xl drop-shadow m-4"
            sx={{ borderRadius: "20px" }}
          >
            <div className="w-[50vw] h-[45vh] bg-white rounded-[30px]">
              <CustomCardContent>Quadrant 3 Content</CustomCardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
    // </div>
  );
}
