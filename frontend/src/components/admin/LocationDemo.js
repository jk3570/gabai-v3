import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, PieChart } from "@mui/x-charts";
import { BaseURL } from "../../BaseURL"

function Sex() {
  const [countsByRegion, setCountsByRegion] = useState([]);

  // Fetch gender counts from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/countsByRegion`);
        setCountsByRegion(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Extract counts from the fetched data
  const region1 = countsByRegion.find(item => item._id === "Region I (Ilocos Region)")?.count || 0;
  const region2 = countsByRegion.find(item => item._id === "Region II (Cagayan Valley)")?.count || 0;
  const region3 = countsByRegion.find(item => item._id === "Region III (Central Luzon)")?.count || 0;
  const region4a = countsByRegion.find(item => item._id === "Region IV-A (CALABARZON)")?.count || 0;
  const region4b = countsByRegion.find(item => item._id === "Region IV-B (MIMAROPA)")?.count || 0;
  const region5 = countsByRegion.find(item => item._id === "Region V (Bicol Region)")?.count || 0;
  const region6 = countsByRegion.find(item => item._id === "Region VI (Western Visayas)")?.count || 0;
  const region7 = countsByRegion.find(item => item._id === "Region VII (Central Visayas)")?.count || 0;
  const region8 = countsByRegion.find(item => item._id === "Region VIII (Eastern Visayas) ")?.count || 0;
  const region9 = countsByRegion.find(item => item._id === "Region IX (Zamboanga Peninzula)")?.count || 0;
  const region10 = countsByRegion.find(item => item._id === "Region X (Northern Mindanao)")?.count || 0;
  const region11 = countsByRegion.find(item => item._id === "Region XI (Davao Region)")?.count || 0;
  const region12 = countsByRegion.find(item => item._id === "Region XII (SOCCSKSARGEN)")?.count || 0;
  const ncr = countsByRegion.find(item => item._id === "National Capital Region (NCR)")?.count || 0;
  const car = countsByRegion.find(item => item._id === "Cordillera Administrative Region (CAR)")?.count || 0;
  const armm = countsByRegion.find(item => item._id === "Autonomous Region in Muslim Mindanao (ARMM)")?.count || 0;
  const caraga = countsByRegion.find(item => item._id === "Region XIII (Caraga)")?.count || 0;

  return (
    <div className="flex flex-col md:flex-row gap-1 items-center justify-center">
      <div>
        {/* Bar Graph */}
        <BarChart
          xAxis={[{ scaleType: "band", data: ["Location (Region)"] }]}
          series={[
            { data: [region1] },
            { data: [region2] },
            { data: [region3] },
            { data: [region4a] },
            { data: [region4b] },
            { data: [region5] },
            { data: [region6] },
            { data: [region7] },
            { data: [region8] },
            { data: [region9] },
            { data: [region10] },
            { data: [region11] },
            { data: [region12] },
            { data: [ncr] },
            { data: [car] },
            { data: [armm] },
            { data: [caraga] },
          ]}
          width={250}
          height={300}
        />
      </div>
      <div style={{ position: 'relative' }}>
        {/* Pie Chart */}
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: region1, label: "Region I (Ilocos Region)" },
                { id: 1, value: region2, label: "Region II (Cagayan Valley)" },
                { id: 2, value: region3, label: "Region III (Central Luzon)" },
                { id: 4, value: region4a, label: "Region IV-A (CALABARZON)" },
                { id: 5, value: region4b, label: "Region IV-B (MIMAROPA)" },
                { id: 6, value: region5, label: "Region V (Bicol Region)" },
                { id: 7, value: region6, label: "Region VI (Western Visayas)" },
                { id: 8, value: region7, label: "Region VII (Central Visayas)" },
                { id: 9, value: region8, label: "Region VIII (Eastern Visayas) " },
                { id: 10, value: region9, label: "Region IX (Zamboanga Peninzula)" },
                { id: 11, value: region10, label: "Region X (Northern Mindanao)" },
                { id: 12, value: region11, label: "Region XI (Davao Region)" },
                { id: 13, value: region12, label: "Region XII (SOCCSKSARGEN)" },
                { id: 14, value: ncr, label: "National Capital Region (NCR)" },
                { id: 15, value: car, label: "Cordillera Administrative Region (CAR)" },
                { id: 16, value: armm, label: "Autonomous Region in Muslim Mindanao (ARMM)" },
                { id: 17, value: caraga, label: "Region XIII (Caraga)" },
              ],
            },
          ]}
          width={500}
          height={200}
        />
      </div>
    </div>
  );
}

export default Sex;