import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";

import toast, { Toaster } from 'react-hot-toast';

//components and pages
import Sidebar from "../../components/admin/AdminSidebar.js";
import AllDemo from "../../components/admin/AllDemo";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import TotalList from "../../components/admin/TotalList";
import "../../css/admin-dashboard.css";
import { BaseURL } from "../../BaseURL";
import iconAzure from "../../img/iconAzure.png";

//AuthContext provider
import { useAuthContext } from "../../hooks/useAuthContext";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function AdminDashboard() {
  const { user, dispatch } = useAuthContext();
  const name = `${user.firstname} ${user.lastname}`;
  const [totalUsers, setTotalUsers] = useState(0);
  const [countsByGender, setCountsByGender] = useState([]);
  const [countsByRegion, setCountsByRegion] = useState([]);
  const [countsByAge, setCountsByAge] = useState({});
  const [totalForms, setTotalForms] = useState(0);
  const [totalAccepts, setTotalAccepts] = useState(0);
  const [totalArchives, setTotalArchives] = useState(0);
  const [totalCases, setTotalCases] = useState(0);

  useEffect(() => {
    // Calculate the sum of totalForms, totalAccepts, and totalArchives
    const sum = totalForms + totalAccepts + totalArchives;
    
    // Set the sum to totalCases
    setTotalCases(sum);
  }, [totalForms, totalAccepts, totalArchives]);

  // Fetch counts by age from the server
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

  // Fetch counts by region from the server
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

  // Fetch counts by gender from the server
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
  
  // Fetch total user count from the server
  useEffect(() => {
    axios.get(`http://localhost:4000/user/total`)
      .then(response => {
        setTotalUsers(response.data.totalUsers);
      })
      .catch(error => {
        console.error('Error fetching total count:', error);
      });
  }, []);

  //form cases
  useEffect(() => {
    axios.get(`http://localhost:4000/form/total`)
      .then(response => {
        setTotalForms(response.data.totalForms);
      })
      .catch(error => {
        console.error('Error fetching total count:', error);
      });
  }, []);

//accept cases
  useEffect(() => {
    axios.get(`http://localhost:4000/accept/total`)
      .then(response => {
        setTotalAccepts(response.data.totalAccepts);
      })
      .catch(error => {
        console.error('Error fetching total count:', error);
      });
  }, []);

//request cases
  useEffect(() => {
    axios.get(`http://localhost:4000/archive/total`)
      .then(response => {
        setTotalArchives(response.data.totalArchives);
      })
      .catch(error => {
        console.error('Error fetching total count:', error);
      });
  }, []);

  // Prepare user data for PDF report
  const generateReport = () => {
    const userData = {
      totalUsers: totalUsers,
      totalCases: totalCases,
      male: 0,
      female: 0,
      preferNotToSay: 0,
      lgbtq: 0,
      region1: 0,
      region2: 0,
      region3: 0,
      region4a: 0,
      region4b: 0,
      region5: 0,
      region6: 0,
      region7: 0,
      region8: 0,
      region9: 0,
      region10: 0,
      region11: 0,
      region12: 0,
      regionncr: 0,
      regioncar: 0,
      regionarmm: 0,
      regioncaraga: 0,
      age1820: 0,
      age2130: 0,
      age3140: 0,
      age4150: 0,
      age5160: 0,
      age60Above: 0,
    };

    // Update userData with gender distribution from countsByGender
    countsByGender.forEach(item => {
      if (item._id === "Male") {
        userData.male = item.count;
      } else if (item._id === "Female") {
        userData.female = item.count;
      } else if (item._id === "Prefer not to say") {
        userData.preferNotToSay = item.count;
      } else if (item._id === "LGBTQ") {
        userData.lgbtq = item.count;
      }
    });

    // Update userData with region distribution from countsByRegion
    countsByRegion.forEach(item => {
      switch(item._id) {
        case "Region I (Ilocos Region)":
          userData.region1 = item.count;
          break;
        case "Region II (Cagayan Valley)":
          userData.region2 = item.count;
          break;
        case "Region III (Central Luzon)":
          userData.region3 = item.count;
          break;
        case "Region IV-A (CALABARZON)":
          userData.region4a = item.count;
          break;
        case "Region IV-B (MIMAROPA)":
          userData.region4b = item.count;
          break;
        case "Region V (Bicol Region)":
          userData.region5 = item.count;
          break;
        case "Region VI (Western Visayas)":
          userData.region6 = item.count;
          break;
        case "Region VII (Central Visayas)":
          userData.region7 = item.count;
          break;
        case "Region VIII (Eastern Visayas)":
          userData.region8 = item.count;
          break;
        case "Region IX (Zamboanga Peninzula)":
          userData.region9 = item.count;
          break;
        case "Region X (Northern Mindanao)":
          userData.region10 = item.count;
          break;
        case "Region XI (Davao Region)":
          userData.region11 = item.count;
          break;
        case "Region XII (SOCCSKSARGEN)":
          userData.region12 = item.count;
          break;
        case "National Capital Region (NCR)":
          userData.regionncr = item.count;
          break;
        case "Cordillera Administrative Region (CAR)":
          userData.regioncar = item.count;
          break;
        case "Autonomous Region in Muslim Mindanao (ARMM)":
          userData.regionarmm = item.count;
          break;
        case "Region XIII (CARAGA)":
          userData.regioncaraga = item.count;
          break;
        default:
          break;
      }
    });

    // Update userData with age distribution from countsByAge
    Object.entries(countsByAge).forEach(([ageRange, count]) => {
      switch (ageRange) {
        case '18-20':
          userData.age1820 = count;
          break;
        case '21-30':
          userData.age2130 = count;
          break;
        case '31-40':
          userData.age3140 = count;
          break;
        case '41-50':
          userData.age4150 = count;
          break;
        case '51-60':
          userData.age5160 = count;
          break;
        case '60 above':
          userData.age60Above = count;
          break;
        default:
          break;
      }
    });

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const docDefinition = {
      content: [
        { text: "Report of Data Summary", style: "title" },
        { text: `Generated by: ${name}`, style: "generate" },
        { text: `Date: ${currentDate}`, style: "generate" },
        { text: `Time: ${currentTime}`, style: "generate" },
        { text: `Total Users: ${userData.totalUsers}`, margin: [0, 10, 0, 0] },
        { text: `Total Cases: ${userData.totalCases}`, margin: [0, 5, 0, 0] },
        {
          text: `Gender Distribution:
          • Male: ${userData.male}
          • Female: ${userData.female}
          • Prefer Not to Say: ${userData.preferNotToSay}
          • LGBTQ+: ${userData.lgbtq}`,
          margin: [0, 5, 0, 0]
        },
        {
          text: `Age Distribution:
          • 18-20: ${userData.age1820}
          • 21-30: ${userData.age2130}
          • 31-40: ${userData.age3140}
          • 41-50: ${userData.age4150}
          • 51-60: ${userData.age5160}
          • 60 and above: ${userData.age60Above}`,
          margin: [0, 5, 0, 0]
        },
        {
          text: `Location Distribution (Region):
          • Region I (Ilocos Region): ${userData.region1}
          • Region II (Cagayan Valley): ${userData.region2}
          • Region III (Central Luzon): ${userData.region3}
          • Region IV-A (CALABARZON): ${userData.region4a}
          • Region IV-B (MIMAROPA): ${userData.region4b}
          • Region V (Bicol Region): ${userData.region5}
          • Region VI (Western Visayas): ${userData.region6}
          • Region VII (Central Visayas): ${userData.region7}
          • Region VIII (Eastern Visayas): ${userData.region8}
          • Region IX (Zamboanga Peninzula): ${userData.region9}
          • Region X (Northern Mindanao): ${userData.region10}
          • Region XI (Davao Region): ${userData.region11}
          • Region XII (SOCCSKSARGEN): ${userData.region12}
          • National Capital Region (NCR): ${userData.regionncr}
          • Cordillera Administrative Region (CAR): ${userData.regioncar}
          • Autonomous Region in Muslim Mindanao (ARMM): ${userData.regionarmm}
          • Region XIII (CARAGA): ${userData.regioncaraga}`,
          margin: [0, 5, 0, 0]
        },
        {
          text:
            "This report presents information on the current demographics of GabAi. It outlines the total count of individuals, the breakdown of gender, total cases reported, age demographics, and geographical (region) distribution. By grasping these elements, proactive steps can be implemented to tackle discrimination and foster diversity and inclusivity within the workplace in the Philippines.",
          margin: [0, 10, 0, 20],
          alignment: "justify"
        },
      ],
      styles: { 
        title: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        generate: {
          fontSize: 10,
          bold: false,
          margin: [0, 0, 0, 0],
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - GabAi</title>
      </Helmet>
      <Toaster />
      <div className="relative z-10 w-full mt-[4rem] md:mt-[3.875rem] flex flex-col justify-start items-center min-h-screen max-md:p-1 bg-bkg text-content">
        <div id="main-content" className="flex flex-col w-full mx-auto max-w-5xl">
          <div className="mt-0">
            <h1 className="text-2xl font-semibold">Welcome, {name}!</h1>
          </div>
          <TotalList />
          <div className="flex flex-col justify-stretch items-stretch mt-2">
            <AllDemo />
          </div>
        </div>
        <br/>
        <button
          onClick={generateReport}
          className="rounded-xl bg-azure-500 px-4 py-1.5 text-white hover:scale-[1.1] transition-all duration-100 ease-in-out relative z-10 after:absolute after:-z-20  after:h-1 after:w-1 after:bg-azure-300 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[50] after:hover:transition-all after:hover:duration-650 after:transition-all after:duration-300 hidden md:block"
        >
          Generate Report
        </button>
      </div>
    </>
  );
}

export default AdminDashboard;
