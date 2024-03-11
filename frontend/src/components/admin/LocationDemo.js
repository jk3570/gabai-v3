import React from "react";
import { BarChart, PieChart } from "@mui/x-charts";

// Data for the Bar Graph and Pie Chart
var region1 = 10;
var region2 = 50;
var region3 = 100;
var region4a = 150;
var region4b = 100;
var region5 = 100;
var region6 = 100;
var region7 = 100;
var region8 = 100;
var region9 = 100;
var region10 = 100;
var region11 = 100;
var region12 = 100;
var region13 = 100;
var ncr = 100;
var car = 100;
var barmm = 100;

const MyBarGraph = React.memo(() => (
  <BarChart
    xAxis={[{ scaleType: "band", data: ["Region"] }]}
    series={[
      { data: [region1], label: "Region 1 - Ilocos Region" },
      { data: [region2], label: "Region 2 - Cagayan Valley" },
      { data: [region3], label: "Region 3 - Central Luzon" },
      { data: [region4a], label: "Region 4a - CALABARZON" },
      { data: [region4b], label: "Region 4b - MIMAROPA" },
      { data: [region5], label: "Region 5 - Bicol Region" },
      { data: [region6], label: "Region 6 - Western Visayas" },
      { data: [region7], label: "Region 7 - Central Visayas" },
      { data: [region8], label: "Region 8 - Eastern Visayas" },
      { data: [region9], label: "Region 9 - Zamboanga Peninsula" },
      { data: [region10], label: "Region 10 - Northern Mindanao" },
      { data: [region11], label: "Region 11 - Davao Region" },
      { data: [region12], label: "Region 12 - Soccsksargen" },
      { data: [region13], label: "Region 13 - Caraga" },
      { data: [ncr], label: "NCR - National Capital Region" },
      { data: [car], label: "CAR - Cordillera Administrative Region" },
      {
        data: [barmm],
        label: "BARMM - Bangsamoro Autonomous Region in Muslim Mindanao",
      },
    ]}
    width={300}
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
          { id: 0, value: region1, label: "Region 1 - Ilocos Region" },
          { id: 1, value: region2, label: "Region 2 - Cagayan Valley" },
          { id: 2, value: region3, label: "Region 3 - Central Luzon" },
          { id: 3, value: region4a, label: "Region 4a - CALABARZON" },
          { id: 4, value: region4b, label: "Region 4b - MIMAROPA" },
          { id: 5, value: region5, label: "Region 5 - Bicol Region" },
          { id: 6, value: region6, label: "Region 6 - Western Visayas" },
          { id: 7, value: region7, label: "Region 7 - Central Visayas" },
          { id: 8, value: region8, label: "Region 8 - Eastern Visayas" },
          { id: 9, value: region9, label: "Region 9 - Zamboanga Peninsula" },
          { id: 10, value: region10, label: "Region 10 - Northern Mindanao" },
          { id: 11, value: region11, label: "Region 11 - Davao Region" },
          { id: 12, value: region12, label: "Region 12 - Soccsksargen" },
          { id: 13, value: region13, label: "Region 13 - Caraga" },
          { id: 14, value: ncr, label: "NCR - National Capital Region" },
          {
            id: 15,
            value: car,
            label: "CAR - Cordillera Administrative Region",
          },
          {
            id: 16,
            value: barmm,
            label: "BARMM - Bangsamoro Autonomous Region in Muslim Mindanao",
          },
        ],
      },
    ]}
    width={300}
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

function Sex() {
  return (
    <div className="flex flex-row gap-1 items-center justify-center h-100 text-azure">
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
