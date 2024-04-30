import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { HighlightScope } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { MouseEvent } from "react";

const barChartsParams = {
  series: [
    { data: [3, 4, 1, 6, 5], label: "A" },
    { data: [4, 3, 1, 5, 8], label: "B" },
    { data: [4, 2, 5, 4, 1], label: "C" },
  ],
  height: 250,
};

const pieChartsParams = {
  series: [
    {
      data: [{ value: 5 }, { value: 10 }, { value: 15 }],
      label: "Series 1",
      outerRadius: 100,
      highlighted: { additionalRadius: 10 },
    },
  ],
  height: 250,
  margin: { top: 0, bottom: 0, left: 100 },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function ElementHighlights() {
  const [chartType, setChartType] = React.useState("bar");
  const [highlighted, setHighlighted] = React.useState("series");
  const [faded, setFaded] = React.useState("global");

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
            <div className="flex flex-row h-[70%]">
              <BarChart
                {...barChartsParams}
                series={barChartsParams.series.map((series) => ({
                  ...series,
                  highlightScope: {
                    highlighted,
                    faded,
                  } as HighlightScope,
                }))}
              />
              <BarChart
                {...barChartsParams}
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
                {...pieChartsParams}
                series={pieChartsParams.series.map((series) => ({
                  ...series,
                  highlightScope: {
                    highlighted,
                    faded,
                  } as HighlightScope,
                }))}
              />
              <PieChart
                {...pieChartsParams}
                series={pieChartsParams.series.map((series) => ({
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
