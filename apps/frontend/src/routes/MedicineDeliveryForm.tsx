import { useState } from "react";
import axios from "axios";
import { MedicineDeliveryObject } from "common/src/MedicineDelivery.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NodeDropdown from "../components/NodeDropdown.tsx";
import dayjs, { Dayjs } from "dayjs";
//import {ServiceRequest} from "common/src/ServiceRequest.ts";

const initialState: MedicineDeliveryObject = {
  medicineName: "",
  dosage: "",
  patientName: "",
  serviceRequest: {
    requestingUsername: "",
    location: "",
    priority: "",
    status: "Unassigned",
    description: "",
    requestedTime: dayjs().toISOString(),
  },
};

export function MedicineDeliveryForm() {
  const [medicineDelivery, setMedicineDelivery] =
    useState<MedicineDeliveryObject>(initialState);
  const [date, setDate] = useState<Dayjs>(dayjs());

  const validateForm = () => {
    const isValid =
      medicineDelivery.medicineName &&
      medicineDelivery.dosage &&
      medicineDelivery.patientName &&
      medicineDelivery.serviceRequest.requestingUsername &&
      medicineDelivery.serviceRequest.location &&
      medicineDelivery.serviceRequest.priority;
    return isValid;
  };

  async function submit() {
    console.log(medicineDelivery);
    // const formData = new FormData();
    //
    // formData.append('medicineDelivery.medicineName', medicineDelivery.medicineName);
    // formData.append('medicineDelivery.dosage', medicineDelivery.dosage);
    // formData.append('medicineDelivery.patientName', medicineDelivery.patientName);
    // formData.append('medicineDelivery.userInstructions', medicineDelivery.userInstructions);
    //
    // formData.append('medicineDelivery.request.roomNum', medicineDelivery.request.roomNum);
    // formData.append('medicineDelivery.request.deliveryInstructions', medicineDelivery.request.deliveryInstructions);
    // formData.append('medicineDelivery.request.requestingUsername', medicineDelivery.request.requestingUsername);
    // formData.append('medicineDelivery.request.location', medicineDelivery.request.location);

    if (validateForm()) {
      try {
        // const response = await axios.post('/api/service', formData, {
        //     headers: { 'Content-Type': 'multipart/form-data' },
        // });
        const response = await axios.post(
          APIEndpoints.servicePostRequests,
          medicineDelivery,
          {
            headers: { "Content-Type": "application/json" },
          },
        );

        if (response.status === 200) {
          console.log("Submission successful", response.data);
          alert("Medicine Request sent!");
          clear();
        } else {
          console.error("Submission failed with status:", response.status);
          alert("Medicine Request failed!");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("Medicine Request failed!");
      }
    } else {
      alert("You must fill out all the required information!");
    }
  }

  function clear() {
    setDate(dayjs());
    setMedicineDelivery(initialState);
  }

  return (
    <div className="h-screen ">
      <div className="w-full h-screen bg-gray-200 flex justify-center items-start pt-[3rem]">
        <Card className="drop-shadow-2xl" sx={{ borderRadius: "10px" }}>
          <CardContent>
            <h1 className="text-center font-bold text-3xl text-secondary pt-2 pb-4">
              Medicine Service Request
            </h1>
            <div className="h-auto flex justify-center items-center w-[30rem]">
              <form
                noValidate
                autoComplete="off"
                className="space-y-4 flex flex-col justify-center items-center"
              >
                <TextField
                  label="Requesting Username"
                  variant="outlined"
                  fullWidth
                  sx={{ width: "25rem" }}
                  className="bg-gray-50"
                  InputProps={{ style: { fontSize: ".9rem" } }}
                  InputLabelProps={{
                    style: { color: "#a4aab5", fontSize: ".9rem" },
                  }}
                  size="small"
                  value={medicineDelivery.serviceRequest.requestingUsername}
                  onChange={(e) =>
                    setMedicineDelivery({
                      ...medicineDelivery,
                      serviceRequest: {
                        ...medicineDelivery.serviceRequest,
                        requestingUsername: e.target.value,
                      },
                    })
                  }
                  required
                />

                <NodeDropdown
                  value={medicineDelivery.serviceRequest.location}
                  onChange={(newValue: string) =>
                    setMedicineDelivery((medicineDelivery) => ({
                      ...medicineDelivery,
                      serviceRequest: {
                        ...medicineDelivery.serviceRequest,
                        location: newValue,
                      },
                    }))
                  }
                />

                {/*<TextField*/}
                {/*    label="Location"*/}
                {/*    variant="outlined"*/}
                {/*    fullWidth*/}
                {/*    sx={{width: "25rem"}}*/}
                {/*    className="bg-gray-50"*/}
                {/*    InputProps={{style: {fontSize: ".9rem"}}}*/}
                {/*    InputLabelProps={{*/}
                {/*        style: {color: "#a4aab5", fontSize: ".9rem"},*/}
                {/*    }}*/}
                {/*    size="small"*/}
                {/*    value={medicineDelivery.serviceRequest.location}*/}
                {/*    onChange={(e) =>*/}
                {/*        setMedicineDelivery({*/}
                {/*            ...medicineDelivery,*/}
                {/*            serviceRequest: {*/}
                {/*                ...medicineDelivery.serviceRequest,*/}
                {/*                location: e.target.value,*/}
                {/*            },*/}
                {/*        })*/}
                {/*    }*/}
                {/*    required*/}
                {/*/>*/}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DateTimePicker"]}
                    sx={{ width: "25rem", paddingBottom: ".3rem" }}
                  >
                    <DateTimePicker
                      label="Service Time *"
                      className="bg-gray-50"
                      value={date}
                      onChange={(newValue) => {
                        setMedicineDelivery((currentMedicineDelivery) => ({
                          ...currentMedicineDelivery,
                          serviceRequest: {
                            ...currentMedicineDelivery.serviceRequest,
                            requestedTime: newValue
                              ? newValue.toISOString()
                              : "",
                          },
                        }));
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <TextField
                  label="Medicine Name"
                  variant="outlined"
                  fullWidth
                  sx={{ width: "25rem" }}
                  className="bg-gray-50"
                  InputProps={{ style: { fontSize: ".9rem" } }}
                  InputLabelProps={{
                    style: { color: "#a4aab5", fontSize: ".9rem" },
                  }}
                  size="small"
                  value={medicineDelivery.medicineName}
                  onChange={(e) =>
                    setMedicineDelivery({
                      ...medicineDelivery,
                      medicineName: e.target.value,
                    })
                  }
                  required
                />
                <TextField
                  label="Dosage"
                  variant="outlined"
                  fullWidth
                  sx={{ width: "25rem" }}
                  className="bg-gray-50"
                  InputProps={{ style: { fontSize: ".9rem" } }}
                  InputLabelProps={{
                    style: { color: "#a4aab5", fontSize: ".9rem" },
                  }}
                  size="small"
                  value={medicineDelivery.dosage}
                  onChange={(e) =>
                    setMedicineDelivery({
                      ...medicineDelivery,
                      dosage: e.target.value,
                    })
                  }
                  required
                />

                <TextField
                  label="Patient Name"
                  variant="outlined"
                  fullWidth
                  sx={{ width: "25rem" }}
                  className="bg-gray-50"
                  InputProps={{ style: { fontSize: ".9rem" } }}
                  InputLabelProps={{
                    style: { color: "#a4aab5", fontSize: ".9rem" },
                  }}
                  size="small"
                  value={medicineDelivery.patientName}
                  onChange={(e) =>
                    setMedicineDelivery({
                      ...medicineDelivery,
                      patientName: e.target.value,
                    })
                  }
                  required
                />

                <TextField
                  label="Description (Optional)"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  sx={{ width: "25rem" }}
                  className="bg-gray-50"
                  InputProps={{ style: { fontSize: ".9rem" } }}
                  InputLabelProps={{
                    style: { color: "#a4aab5", fontSize: ".9rem" },
                  }}
                  size="small"
                  value={medicineDelivery.serviceRequest.description}
                  onChange={(e) =>
                    setMedicineDelivery({
                      ...medicineDelivery,
                      serviceRequest: {
                        ...medicineDelivery.serviceRequest,
                        description: e.target.value,
                      },
                    })
                  }
                />

                <FormControl sx={{ width: "25rem" }} size="small">
                  <InputLabel sx={{ color: "#a4aab5", fontSize: ".9rem" }}>
                    Status *
                  </InputLabel>
                  <Select
                    name="status"
                    className="bg-gray-50"
                    sx={{ fontSize: ".9rem" }}
                    label="Status *"
                    value={medicineDelivery.serviceRequest.status}
                    onChange={(e) =>
                      setMedicineDelivery({
                        ...medicineDelivery,
                        serviceRequest: {
                          ...medicineDelivery.serviceRequest,
                          status: e.target.value,
                        },
                      })
                    }
                  >
                    <MenuItem value="Unassigned">Unassigned</MenuItem>
                    <MenuItem value="Assigned">Assigned</MenuItem>
                    <MenuItem value="InProgress">InProgress</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  component="fieldset"
                  margin="normal"
                  sx={{ width: "25rem" }}
                >
                  <FormLabel sx={{ fontSize: ".9rem" }}>Priority *</FormLabel>
                  <RadioGroup
                    row
                    name="priority"
                    value={medicineDelivery.serviceRequest.priority}
                    onChange={(e) =>
                      setMedicineDelivery({
                        ...medicineDelivery,
                        serviceRequest: {
                          ...medicineDelivery.serviceRequest,
                          priority: e.target.value,
                        },
                      })
                    }
                    sx={{ marginLeft: ".52rem" }}
                  >
                    <FormControlLabel
                      value="Low"
                      control={<Radio />}
                      label="Low"
                    />
                    <FormControlLabel
                      value="Medium"
                      control={<Radio />}
                      label="Medium"
                    />
                    <FormControlLabel
                      value="High"
                      control={<Radio />}
                      label="High"
                    />
                    <FormControlLabel
                      value="Emergency"
                      control={<Radio />}
                      label="Emergency"
                    />
                  </RadioGroup>
                </FormControl>
                <div className="flex justify-between w-full mt-4">
                  <Button
                    variant="contained"
                    onClick={clear}
                    style={{
                      backgroundColor: "#EA422D",
                      color: "white",
                      width: "8rem",
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="contained"
                    onClick={submit}
                    className="justify-end"
                    style={{ backgroundColor: "#013B96", width: "8rem" }}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default MedicineDeliveryForm;
