import * as React from "react";
import { Card, CardContent, styled } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { Collapse, CollapseProps } from "@mui/material";
// import { useProfile } from "../useProfile.ts";
import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import { useEffect } from "react";

const CustomCollapse = Collapse as React.FC<CollapseProps>;

const CustomCardContent = styled(CardContent)({
  display: "flex",
  "&:last-child": {
    padding: 0,
    paddingBottom: 0,
  },
});

export default function Profile() {
  const [open] = React.useState(true);
  const { getAccessTokenSilently, user } = useAuth0();
  const [role, setRole] = React.useState<string>();
  const [position, setPosition] = React.useState<string>();
  // const [employee, setEmployee] = useState<Employee>();
  useEffect(() => {
    async function getUser() {
      try {
        const token = await getAccessTokenSilently();
        if (!user) {
          console.log("no user");
          return;
        } else console.log(user);

        const userData = {
          userName: user!.name,
        };
        const res = await MakeProtectedPostRequest(
          APIEndpoints.fetchUser,
          userData,
          token,
        );
        setRole(res.data.role);
        setPosition(res.data.position);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }
    getUser();
  }, [getAccessTokenSilently, user]);

  // console.log(emp);

  // console.log(emp.position);
  return (
    <div className="bg-offwhite h-screen">
      <div className="flex justify-center">
        {/*First profile section*/}
        <div className="flex flex-col">
          <Card
            className="shadow-xl drop-shadow m-4"
            sx={{ borderRadius: "20px" }}
          >
            <div className="w-[20vw] h-[94vh] bg-white rounded-[30px]">
              <CustomCardContent>
                <div className="w-full h-full flex justify-center ">
                  <img
                    className="w-60 h-60 object-cover rounded-full flex justify-center"
                    src={user!.picture}
                    alt="User photo"
                  />
                </div>
              </CustomCardContent>
              <div className=" flex flex-col relative">
                <p
                  className="w-full text-2xl font-bold text-center p-1 "
                  style={{ color: "#012D5A" }}
                >
                  {user!.name}
                </p>
                <div className="inline-flex items-center justify-center w-full">
                  <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700 " />
                  <div className="absolute px-2 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                    <span className="shrink px-1 pb-1 color:red">
                      {" "}
                      Information
                    </span>
                  </div>
                </div>
                <label className="text-xl text-center">
                  {" "}
                  Account type: {role}
                </label>
                <label className="text-xl text-center">
                  Position: {position}
                </label>
                <label className=" text-center">{user!.email}</label>
                <div className="inline-flex items-center justify-center w-full">
                  <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700 " />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col ">
          <CustomCollapse in={open}>
            <Card
              className="shadow-xl drop-shadow m-4"
              sx={{ borderRadius: "20px" }}
            >
              <div className="w-[50vw] h-[43.5vh] bg-white rounded-[30px] ">
                <h1 className="w-full text-2xl font-bold text-center mt-3 ">
                  {" "}
                  Completed Service Requests
                  <hr className="h-px mb-4 mt-3 bg-gray-200 border-0 dark:bg-gray-700" />
                </h1>
                <CustomCardContent>
                  {/*<PieChart*/}
                  {/*  series={[*/}
                  {/*    {*/}
                  {/*      data: [*/}
                  {/*        { id: 0, value: 10, label: 'series A' },*/}
                  {/*        { id: 1, value: 15, label: 'series B' },*/}
                  {/*        { id: 2, value: 20, label: 'series C' },*/}
                  {/*      ],*/}
                  {/*    },*/}
                  {/*  ]}*/}
                  {/*  width={400}*/}
                  {/*  height={200}*/}
                  {/*/>*/}
                </CustomCardContent>
              </div>
            </Card>
          </CustomCollapse>

          <CustomCollapse in={open}>
            <Card
              className="shadow-xl drop-shadow m-4"
              sx={{ borderRadius: "20px" }}
            >
              <div className="w-[50vw] h-[43.5vh] bg-white rounded-[30px] ">
                <h1 className="w-full text-2xl font-bold text-center mt-3 ">
                  {" "}
                  Pending Service Requests
                  <hr className="h-px mb-4 mt-3 bg-gray-200 border-0 dark:bg-gray-700" />
                </h1>

                <CustomCardContent></CustomCardContent>
              </div>
            </Card>
          </CustomCollapse>
        </div>
      </div>
    </div>
    // </div>
  );
}
