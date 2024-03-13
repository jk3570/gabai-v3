import React from "react";
import { BarChart, PieChart } from "@mui/x-charts";

// Data for the Bar Graph and Pie Chart

const MyBarGraph = React.memo(() => (
  <BarChart
    xAxis={[{ scaleType: "band", data: ["Age"] }]}
    series={[
      { data: ["10"], label: "18-20" },
      { data: ["20"], label: "21-30" },
      { data: ["20"], label: "31-40" },
      { data: ["20"], label: "41-50" },
      { data: ["20"], label: "51-59" },
      { data: ["20"], label: "60 above" },
    ]}
    width={250}
    height={300}
    slotProps={{
      legend: {
        direction: "row",
        position: { vertical: "bottom", horizontal: "middle" },
        padding: 0,
        hidden: true,
      },
    }}
  />
));

const PieChartComponent = React.memo(() => (
  <PieChart
    series={[
      {
        data: [
          { id: 0, value: "10", label: "18-20" },
          { id: 1, value: "20", label: "21-30" },
          { id: 2, value: "20", label: "31-40" },
          { id: 3, value: "20", label: "41-50" },
          { id: 4, value: "20", label: "51-59" },
          { id: 5, value: "20", label: "60 above" },
        ],
      },
    ]}
    width={400}
    height={200}
  />
));

function Sex() {
  return (
    <div className="flex flex-row gap-1 items-center justify-center text-azure">
      <div>
        {/* Bar Graph */}
        <MyBarGraph />
      </div>

      <br />
      <div>
        <PieChartComponent />
      </div>
    </div>
  );
}

export default Sex;
