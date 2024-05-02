import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, PieChart } from "@mui/x-charts";
import { BaseURL } from "../../BaseURL"

function Sex() {
  const [countsByGender, setCountsByGender] = useState([]);

  // Fetch gender counts from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/countsByGender`);
        setCountsByGender(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchData();
  }, []);

  // Extract counts from the fetched data
  const maleCount = countsByGender.find(item => item._id === "Male")?.count || 0;
  const femaleCount = countsByGender.find(item => item._id === "Female")?.count || 0;
  const preferNotToSayCount = countsByGender.find(item => item._id === "Prefer not to say")?.count || 0;
  const lgbtqCount = countsByGender.find(item => item._id === "LGBTQ")?.count || 0;

  return (
    <div className="flex flex-row gap-1 items-center justify-center">
      <div>
        {/* Bar Graph */}
        <BarChart
          xAxis={[{ scaleType: "band", data: ["Gender"] }]}
          series={[
            { data: [maleCount] },
            { data: [femaleCount] },
            { data: [preferNotToSayCount] },
            { data: [lgbtqCount] },
          ]}
          width={250}
          height={300}
        />
      </div>
      <div>
        {/* Pie Chart */}
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: maleCount, label: "Male" },
                { id: 1, value: femaleCount, label: "Female" },
                { id: 2, value: preferNotToSayCount, label: "Prefer not to say" },
                { id: 3, value: lgbtqCount, label: "LGBTQ" },
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
