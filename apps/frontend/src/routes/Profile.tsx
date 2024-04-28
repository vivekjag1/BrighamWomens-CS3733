import * as React from "react";
import { Button, Card, CardContent, TextField, styled } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { Collapse, CollapseProps } from "@mui/material";
import { MakeProtectedPostRequest } from "../MakeProtectedPostRequest.ts";
// import { MakeProtectedGetRequest } from "../MakeProtectedGetRequest.ts";

import { APIEndpoints } from "common/src/APICommon.ts";
import { useEffect } from "react";
import { Employee } from "database";
import ButtonRed from "../components/ButtonRed.tsx";
import ButtonBlue from "../components/ButtonBlue.tsx";
import LogoutIcon from "@mui/icons-material/Logout";
import PasswordIcon from "@mui/icons-material/Password";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
const CustomCollapse = Collapse as React.FC<CollapseProps>;
import Modal from "@mui/material/Modal";
import { ClearIcon } from "@mui/x-date-pickers/icons";
import CheckIcon from "@mui/icons-material/Check";
import { useToast } from "../components/useToast.tsx";

const CustomCardContent = styled(CardContent)({
  display: "flex",
  "&:last-child": {
    padding: 0,
    paddingBottom: 0,
  },
});

export default function Profile() {
  const { showToast } = useToast();

  const { logout } = useAuth0();
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  const [open] = React.useState(true);
  const [passwordModal, setPasswordModal] = React.useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = React.useState(false);
  // const setOpen = () => setModelOpen(true);
  const setClosed = () => setPasswordModal(false);
  const { getAccessTokenSilently, user } = useAuth0();
  const [employee, setEmployee] = React.useState<Employee>();
  const handleChangePassword = async () => {
    setPasswordModal(true);
  };
  const handleDeleteAccountRequest = async () => {
    setDeleteAccountModal(true);
  };

  const handleSubmitDeleteAccount = async () => {
    setDeleteAccountModal(false);
    const token = await getAccessTokenSilently();
    const account = {
      email: user!.email,
      userName: user!.name,
    };
    await MakeProtectedPostRequest(APIEndpoints.deleteEmployee, account, token);
    showToast("Account deleted!", "success");
    handleLogout();
  };

  const handleSubmitNewPassword = async () => {
    setClosed();
    const token = await getAccessTokenSilently();
    const tempPW = {
      newPass: password,
      userID: user!.sub,
      userName: user!.name,
    };
    await MakeProtectedPostRequest(APIEndpoints.changePassword, tempPW, token);
    showToast("Password Changed!", "success");
  };

  // const getAllServiceReqs = async () => {
  //   const token = await getAccessTokenSilently();
  //   const requests = await MakeProtectedGetRequest(
  //     APIEndpoints.serviceGetRequests,
  //     token,
  //   );
  //   return requests.data;
  // };
  //take it away colin!
  // const filterServiceReqs = async () => {
  //   const allRequests = await getAllServiceReqs();
  //   const filteredServiceReqs = allRequests.filter((employee: Employee) => {
  //     user!.name === employee.name;
  //   });
  //   return filteredServiceReqs;
  // };

  // const [employee, setEmployee] = useState<Employee>();
  useEffect(() => {
    async function getUser() {
      try {
        const token = await getAccessTokenSilently();
        const userData = {
          userName: user!.name,
        };
        const res = await MakeProtectedPostRequest(
          APIEndpoints.fetchUser,
          userData,
          token,
        );
        setEmployee(res.data);
        console.log("i am inside the use effect!");
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }
    getUser();
  }, [getAccessTokenSilently, user]);

  // console.log(emp);

  // console.log(emp.position);
  console.log(employee);
  const [password, setPassword] = React.useState<string>("");
  return (
    <>
      <Modal
        open={passwordModal}
        onClose={setClosed}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            borderRadius: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            "&:focus": {
              outline: "none",
              border: "none",
              boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.5)",
            },
          }}
          className="drop-shadow-2xl px-5 pb-2 w-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <CardContent>
            <h1
              className={`text-md font-semibold mb-4 text-secondary text-center`}
            >
              Set your new password:
            </h1>
            <div className="col-span-2 flex justify-center items-end px-5">
              <div className=" mb-4   flex flex-col col-span-2j ustify-center items-center ">
                <TextField
                  label="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="col-span-2 flex justify-between items-end px-5">
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#EA422D",
                      color: "white",
                      width: "8rem",
                      fontFamily: "Poppins, sans-serif",
                    }}
                    endIcon={<ClearIcon />}
                    onClick={() => setPasswordModal(false)}
                  >
                    CANCEL
                  </Button>

                  <Button
                    variant="contained"
                    className="justify-end"
                    style={{
                      backgroundColor: "#012D5A",
                      width: "8rem",
                      fontFamily: "Poppins, sans-serif",
                    }}
                    endIcon={<CheckIcon />}
                    onClick={() => handleSubmitNewPassword()}
                  >
                    CONFIRM
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Modal>
      <Modal
        open={deleteAccountModal}
        onClose={() => setClosed()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            borderRadius: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            "&:focus": {
              outline: "none",
              border: "none",
              boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.5)",
            },
          }}
          className="drop-shadow-2xl px-5 pb-2 w-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <CardContent>
            <h1
              className={`text-md font-semibold mb-4 text-secondary text-center`}
            >
              Are you sure you want to delete your account?
            </h1>
            <div className="col-span-2 flex justify-between items-end px-5">
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#EA422D",
                  color: "white",
                  width: "8rem",
                  fontFamily: "Poppins, sans-serif",
                }}
                endIcon={<ClearIcon />}
                onClick={() => setClosed()}
              >
                CANCEL
              </Button>

              <Button
                variant="contained"
                className="justify-end"
                style={{
                  backgroundColor: "#012D5A",
                  width: "8rem",
                  fontFamily: "Poppins, sans-serif",
                }}
                endIcon={<CheckIcon />}
                onClick={handleSubmitDeleteAccount}
              >
                CONFIRM
              </Button>
            </div>
          </CardContent>
        </Card>
      </Modal>

      <div className="bg-offwhite h-screen">
        <div className="flex justify-center">
          {/*First profile section*/}
          <div className="flex flex-col">
            <Card
              className="shadow-xl drop-shadow m-4"
              sx={{ borderRadius: "20px" }}
            >
              <div className="w-[20vw] h-[94vh] bg-white rounded-[30px] flex flex-col  items-center">
                <CustomCardContent>
                  <div className="text-secondary flex flex-col justify-center items-center font-bold  text-4xl">
                    Your Account
                    <br />
                    <div className="w-full h-full flex flex-col justify-center items-center">
                      <img
                        className="w-60 h-60 object-cover rounded-full mt-6"
                        src={user!.picture}
                        alt="user profile picture"
                      />
                    </div>
                  </div>
                </CustomCardContent>
                <div className=" flex flex-col relative">
                  <p
                    className="w-full text-2xl font-bold text-center p-1 "
                    style={{ color: "#012D5A" }}
                  >
                    {user!.name}
                  </p>
                  {employee && (
                    <>
                      <label className="text-l text-center">
                        {" "}
                        Account type: {employee.role}
                      </label>

                      <label className="text-l text-center">
                        Position: {employee.position}
                      </label>
                      <label className="text-l text-center">
                        Last Update: {user!.updated_at}
                      </label>
                    </>
                  )}
                  <label className=" text-l text-center">
                    Email: {user!.email}
                  </label>
                  <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700 " />
                  </div>
                  <div className="flex justify-center w-full">
                    <ButtonBlue
                      onClick={handleChangePassword}
                      endIcon={<PasswordIcon />}
                      style={{ width: "13rem" }}
                    >
                      Change Password
                    </ButtonBlue>
                  </div>

                  <div className="flex justify-center w-full mt-6">
                    <ButtonRed
                      onClick={handleLogout}
                      endIcon={<LogoutIcon />}
                      style={{ width: "13rem" }}
                    >
                      Log Out
                    </ButtonRed>
                  </div>
                  <div className="flex justify-center w-full mt-6">
                    <ButtonRed
                      onClick={handleDeleteAccountRequest}
                      endIcon={<PersonRemoveIcon />}
                      style={{ width: "13rem" }}
                    >
                      Delete Account
                    </ButtonRed>
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
                  <CustomCardContent></CustomCardContent>
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
    </>
    // </div>
  );
}
