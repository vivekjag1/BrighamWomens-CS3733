import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { HighlightScope } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { MouseEvent } from "react";
import { ServiceRequest } from "database";

export default function ElementHighlights(props: {
  requestData: ServiceRequest[];
  filteredData: ServiceRequest[];
}) {
  const [chartType, setChartType] = React.useState("bar");
  const [highlighted, setHighlighted] = React.useState("series");
  const [faded, setFaded] = React.useState("global");

  const allGiftDeliveries = props.requestData.filter(
    (request) => request.type.toString() == "GiftDelivery",
  );
  const myGiftDeliveries = props.filteredData.filter(
    (request) => request.type.toString() == "GiftDelivery",
  );

  const allDeviceDeliveries = props.requestData.filter(
    (request) => request.type.toString() === "DeviceDelivery",
  );
  const myDeviceDeliveries = props.filteredData.filter(
    (request) => request.type.toString() === "DeviceDelivery",
  );

  const allMedicineDeliveries = props.requestData.filter(
    (request) => request.type.toString() === "MedicineDelivery",
  );
  const myMedicineDeliveries = props.filteredData.filter(
    (request) => request.type.toString() === "MedicineDelivery",
  );

  const allRoomSchedulings = props.requestData.filter(
    (request) => request.type.toString() === "RoomScheduling",
  );
  const myRoomSchedulings = props.filteredData.filter(
    (request) => request.type.toString() === "RoomScheduling",
  );

  const allSanitationServices = props.requestData.filter(
    (request) => request.type.toString() === "SanitationService",
  );
  const mySanitationServices = props.filteredData.filter(
    (request) => request.type.toString() === "SanitationService",
  );

  const allSecurityServices = props.requestData.filter(
    (request) => request.type.toString() === "SecurityService",
  );
  const mySecurityServices = props.filteredData.filter(
    (request) => request.type.toString() === "SecurityService",
  );

  const allFoodServices = props.requestData.filter(
    (request) => request.type.toString() === "FoodService",
  );

  const myFoodServices = props.filteredData.filter(
    (request) => request.type.toString() === "FoodService",
  );

  const allITSupportServices = props.filteredData.filter(
    (request) => request.type.toString() === "ITSupport",
  );

  const myITSupportServices = props.filteredData.filter(
    (request) => request.type.toString() === "ITSupport",
  );
  // const allITServices = props.requestData.filter(
  //     (request) => request.type.toString() === "IT",
  // );
  // const myITServices = props.filteredData.filter(
  //     (request) => request.type.toString() === "IT",
  // );
  //
  // const allService = props.requestData.filter(
  //     (request) => request.type.toString() === "########",
  // );
  // const myService = props.filteredData.filter(
  //     (request) => request.type.toString() === "#########",
  // );

  const barChartsParams = {
    series: [
      {
        data: [myGiftDeliveries.length, allGiftDeliveries.length],
        label: "Gift",
      },
      {
        data: [myDeviceDeliveries.length, allDeviceDeliveries.length],
        label: "Device",
      },
      {
        data: [myMedicineDeliveries.length, allMedicineDeliveries.length],
        label: "Medicine",
      },
      {
        data: [myRoomSchedulings.length, allRoomSchedulings.length],
        label: "Rooms",
      },
      {
        data: [mySanitationServices.length, allSanitationServices.length],
        label: "Sanitation",
      },
      {
        data: [mySecurityServices.length, allSecurityServices.length],
        label: "Security",
      },
      {
        data: [myFoodServices.length, allFoodServices.length],
        label: "Food",
        color: "Orange",
      },
      {
        data: [myITSupportServices.length, allITSupportServices.length],
        label: "IT",
        color: "red",
      },
    ],
    height: 250,
  };

  const myPieChartsParams = {
    series: [
      {
        data: [
          { value: myGiftDeliveries.length, label: "Gift" },
          { value: myDeviceDeliveries.length, label: "Device" },
          { value: myMedicineDeliveries.length, label: "Medicine" },
          { value: myRoomSchedulings.length, label: "Rooms" },
          { value: mySanitationServices.length, label: "Sanitation" },
          { value: mySecurityServices.length, label: "Security" },
          { value: myFoodServices.length, label: "Food", color: "Orange" },
          { value: myITSupportServices.length, label: "IT", color: "red" },
        ],
        label: "My Services",
        outerRadius: 100,
        highlighted: { additionalRadius: 10 },
      },
    ],
    height: 250,
    margin: { top: 0, bottom: 0, left: 0 },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const allPieChartsParams = {
    series: [
      {
        data: [
          { value: allGiftDeliveries.length, label: "Gift" },
          { value: allDeviceDeliveries.length, label: "Device" },
          { value: allMedicineDeliveries.length, label: "Medicine" },
          { value: allRoomSchedulings.length, label: "Rooms" },
          { value: allSanitationServices.length, label: "Sanitation" },
          { value: allSecurityServices.length, label: "Security" },
          { value: allFoodServices.length, label: "Food", color: "Orange" },
          { value: allITSupportServices.length, label: "IT", color: "red" },
        ],
        label: "My Services",
        outerRadius: 100,
        highlighted: { additionalRadius: 10 },
      },
    ],
    height: 250,
    margin: { top: 0, bottom: 0, left: 0 },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleChartType = (
    event: MouseEvent<HTMLElement>,
    newChartType: string,
  ) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
    if (newChartType == "bar") {
      setHighlighted("series");
      setFaded("global");
    } else if (newChartType == "pie") {
      setHighlighted("item");
      setFaded("none");
    }
  };

  return (
    <Stack
      direction={{ xs: "column", xl: "row" }}
      spacing={1}
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={handleChartType}
          aria-label="chart type"
          fullWidth
          sx={{
            height: "2rem",
          }}
        >
          {["bar", "pie"].map((type) => (
            <ToggleButton key={type} value={type} aria-label="left aligned">
              {type}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <div className="m-0 p-0 g-0">
          {chartType === "bar" && (
            <div className="flex items-center h-[100%] mt-6">
              <BarChart
                {...barChartsParams}
                xAxis={[
                  { scaleType: "band", data: ["My Services", "All Services"] },
                ]}
                series={barChartsParams.series.map((series) => ({
                  ...series,
                  highlightScope: {
                    highlighted,
                    faded,
                  } as HighlightScope,
                }))}
              />
            </div>
          )}
          {chartType === "pie" && (
            <div className="flex flex-row">
              <PieChart
                {...myPieChartsParams}
                series={myPieChartsParams.series.map((series) => ({
                  ...series,
                  highlightScope: {
                    highlighted,
                    faded,
                  } as HighlightScope,
                }))}
              />
              <PieChart
                {...allPieChartsParams}
                series={allPieChartsParams.series.map((series) => ({
                  ...series,
                  highlightScope: {
                    highlighted,
                    faded,
                  } as HighlightScope,
                }))}
              />
            </div>
          )}
        </div>
      </Box>
    </Stack>
  );
}
