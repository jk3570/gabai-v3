import React, { useState, useEffect } from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import axios from 'axios';
import { BaseURL } from "../../BaseURL"

function Sex() {
  const [countsByAge, setCountsByAge] = useState({});

  // Fetch age counts from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/countsByAge`);
        setCountsByAge(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchData();
  }, []);

  // Extract counts from the fetched data
  const ageCategories = Object.keys(countsByAge);
  const ageCounts = Object.values(countsByAge);

  // Prepare data for BarChart and PieChart
  const barChartData = ageCategories.map((category, index) => ({
    data: [ageCounts[index]],
    label: category
  }));

  const pieChartData = ageCategories.map((category, index) => ({
    id: index,
    value: ageCounts[index],
    label: category
  }));

  return (
    <div className="flex flex-row gap-1 items-center justify-center text-azure">
      <div>
        {/* Bar Graph */}
        <BarChart
          xAxis={[{ scaleType: "band", data: ["Age"] }]}
          series={barChartData}
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
      </div>
      <br />
      <div>
        {/* Pie Chart */}
        {ageCategories.length > 0 && ageCounts.length > 0 ? (
          <PieChart
            series={[{ data: pieChartData }]}
            width={400}
            height={200}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Sex;
