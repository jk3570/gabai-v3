import React from "react";
import { BarChart, PieChart } from "@mui/x-charts";

// Data for the Bar Graph and Pie Chart
var maleCount = 10;
var femaleCount = 50;

const MyBarGraph = React.memo(() => (
  <BarChart
    xAxis={[{ scaleType: "band", data: ["Sex"] }]}
    series={[
      { data: [maleCount], label: "Male", color: "#38BDF8" },
      { data: [femaleCount], label: "Female", color: "#F472B6" },
    ]}
    width={250}
    height={300}
  />
));

const PieChartComponent = React.memo(() => (
  <PieChart
    series={[
      {
        data: [
          { id: 0, value: maleCount, label: "Male", color: "#38BDF8" },
          { id: 1, value: femaleCount, label: "Female", color: "#F472B6" },
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
