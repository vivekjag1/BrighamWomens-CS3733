import { useState } from "react";
import { MedicineDeliveryObject } from "common/src/MedicineDelivery.ts";
import { APIEndpoints } from "common/src/APICommon.ts";
import { FormControl } from "@mui/material";
import NodeDropdown from "../../components/NodeDropdown.tsx";
import EmployeeDropdown from "../../components/EmployeeDropdown.tsx";
import dayjs, { Dayjs } from "dayjs";
import FormContainer from "../../components/FormContainer.tsx";
import CustomTextField from "../../components/CustomTextField.tsx";
import CustomStatusDropdown from "../../components/CustomStatusDropdown.tsx";
import CustomPrioritySelector from "../../components/CustomPrioritySelector.tsx";
import CustomDatePicker from "../../components/CustomDatePicker.tsx";
import { useToast } from "../../components/useToast.tsx";
import { MakeProtectedPostRequest } from "../../MakeProtectedPostRequest.ts";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonBlue from "../../components/ButtonBlue.tsx";
import ButtonRed from "../../components/ButtonRed.tsx";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import medicineImage from "../../../assets/medicinedelivery.jpg";

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
    assignedTo: "Unassigned",
  },
};

export function MedicineForm() {
  const { getAccessTokenSilently } = useAuth0();

  const [medicineDelivery, setMedicineDelivery] =
    useState<MedicineDeliveryObject>(initialState);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const { showToast } = useToast();
  const isEmployeeDisabled = ["Unassigned"].includes(
    medicineDelivery.serviceRequest.status,
  );

  const validateForm = () => {
    const { status, assignedTo } = medicineDelivery.serviceRequest;
    const requiresEmployee = ["Assigned", "InProgress", "Closed"].includes(
      status,
    );

    return (
      medicineDelivery.medicineName &&
      medicineDelivery.dosage &&
      medicineDelivery.patientName &&
      medicineDelivery.serviceRequest.location &&
      medicineDelivery.serviceRequest.requestingUsername &&
      medicineDelivery.serviceRequest.location &&
      medicineDelivery.serviceRequest.priority &&
      (!requiresEmployee || (requiresEmployee && assignedTo))
    );
  };

  async function submit() {
    const token = await getAccessTokenSilently();

    if (validateForm()) {
      try {
        const response = await MakeProtectedPostRequest(
          APIEndpoints.postServiceRequest,
          medicineDelivery,
          token,
        );
        if (response.status === 200) {
          // alert("Medicine Request sent!");
          showToast("Medicine Request sent!", "success");
          clear();
        } else {
          console.error("Submission failed with status:", response.status);
          //alert("Medicine Request failed!");
          showToast("Medicine Request failed!", "error");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        showToast("Medicine Request failed!", "error");
      }
    } else {
      //alert("You must fill out all the required information!");
      showToast("Fill out all the required information!", "warning");
    }
  }

  function clear() {
    setDate(dayjs());
    setMedicineDelivery(initialState);
  }

  return (
    <div className="bg-offwhite">
      <FormContainer imgPath={medicineImage} alt={"Medicine Delivery"}>
        <div>
          <p className="text-center text-sm text-secondary">Made by Matthew</p>
          <h1 className="text-center font-bold text-3xl text-secondary pt-4 pb-4">
            Medicine Service Request
          </h1>
          <div className="h-auto flex justify-center items-center w-[30rem]">
            <form
              noValidate
              autoComplete="off"
              className="space-y-4 flex flex-col justify-center items-center"
            >
              <EmployeeDropdown
                value={medicineDelivery.serviceRequest.requestingUsername}
                sx={{ width: "25rem", padding: 0 }}
                label="Requesting Employee *"
                onChange={(newValue) =>
                  setMedicineDelivery((medicineDelivery) => ({
                    ...medicineDelivery,
                    serviceRequest: {
                      ...medicineDelivery.serviceRequest,
                      requestingUsername: newValue,
                    },
                  }))
                }
                disabled={false}
              />
              <NodeDropdown
                value={medicineDelivery.serviceRequest.location}
                sx={{ width: "25rem", padding: 0 }}
                label="Location *"
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

              <CustomDatePicker
                value={date}
                onChange={(newValue) => {
                  const isValid = newValue && dayjs(newValue).isValid();
                  setMedicineDelivery((currentMedicineDelivery) => ({
                    ...currentMedicineDelivery,
                    serviceRequest: {
                      ...currentMedicineDelivery.serviceRequest,
                      requestedTime: isValid ? newValue.toISOString() : "",
                    },
                  }));
                }}
              />

              <CustomTextField
                label="Medicine Name"
                value={medicineDelivery.medicineName}
                onChange={(e) =>
                  setMedicineDelivery({
                    ...medicineDelivery,
                    medicineName: e.target.value,
                  })
                }
                required
              />

              <CustomTextField
                label="Dosage"
                value={medicineDelivery.dosage}
                onChange={(e) =>
                  setMedicineDelivery({
                    ...medicineDelivery,
                    dosage: e.target.value,
                  })
                }
                required
              />

              <CustomTextField
                label="Patient Name"
                value={medicineDelivery.patientName}
                onChange={(e) =>
                  setMedicineDelivery({
                    ...medicineDelivery,
                    patientName: e.target.value,
                  })
                }
                required
              />

              <CustomTextField
                label="Description (Optional)"
                multiline
                rows={3}
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
                <CustomStatusDropdown
                  value={medicineDelivery.serviceRequest.status}
                  onChange={(e) => {
                    const newStatus = e.target.value
                      ? e.target.value.toString()
                      : "";
                    let newAssignedTo =
                      medicineDelivery.serviceRequest.assignedTo;

                    if (newStatus === "Unassigned") {
                      newAssignedTo = "Unassigned";
                    } else {
                      newAssignedTo = "";
                    }

                    setMedicineDelivery({
                      ...medicineDelivery,
                      serviceRequest: {
                        ...medicineDelivery.serviceRequest,
                        status: newStatus,
                        assignedTo: newAssignedTo,
                      },
                    });
                  }}
                />
              </FormControl>

              <EmployeeDropdown
                value={medicineDelivery.serviceRequest.assignedTo}
                sx={{ width: "25rem", padding: 0 }}
                label="Assigned Employee *"
                onChange={(newValue: string) => {
                  let newStatus = medicineDelivery.serviceRequest.status;

                  if (newValue && newStatus === "Unassigned") {
                    newStatus = "Assigned";
                  }

                  setMedicineDelivery((medicineDelivery) => ({
                    ...medicineDelivery,
                    serviceRequest: {
                      ...medicineDelivery.serviceRequest,
                      assignedTo: newValue,
                      status: newStatus,
                    },
                  }));
                }}
                disabled={isEmployeeDisabled}
              />

              <FormControl
                component="fieldset"
                margin="normal"
                sx={{ width: "25rem" }}
              >
                <CustomPrioritySelector
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
                />
              </FormControl>
              <div className="flex justify-around w-full mt-4">
                <ButtonRed
                  onClick={clear}
                  endIcon={<ClearIcon />}
                  style={{ width: "8rem" }}
                >
                  Clear
                </ButtonRed>
                <ButtonBlue
                  onClick={submit}
                  endIcon={<CheckIcon />}
                  style={{ width: "8rem" }}
                >
                  Submit
                </ButtonBlue>
              </div>
            </form>
          </div>
        </div>
      </FormContainer>
    </div>
  );
}

export default MedicineForm;
