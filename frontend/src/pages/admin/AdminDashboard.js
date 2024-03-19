//modules
import React from "react";
import { Helmet } from "react-helmet";

//components and pages
import Sidebar from "../../components/admin/Sidebar.js";
import AllDemo from "../../components/admin/AllDemo";
import TotalList from "../../components/admin/TotalList";
import Tabs from "../../components/admin/Tabs";

//icon sets

//CSS
import "../../css/admin-dashboard.css";

const totalNoStyle =
  "flex flex-row border-2 rounded-xl h-[8rem] w-[20rem] p-3 justify-between items-center border-black";

function AdminDashboard() {
  const name = "Admin";
  const userCount = 0;
  const caseCount = 0;
  const feedbackCount = 0;

  return (
    <>
      <Helmet>
        {/* Title of the Page */}
        <title>Admin Dashboard - GabAI</title>
      </Helmet>
        <div className="w-full relative px-5 lg:px-0 center mx-auto">
        <div className="relative z-10 flex flex-col justify-center min-h-screen max-md:p-1">
        <div className="flex z-10 flex-row justify-between items-center">
          <div className="flex flex-row h-screen py-[3.875rem] w-full">
           {/*  <div>
              <Sidebar />
            </div> */}
            <div id="main-content" className="flex flex-col w-full mx-auto max-w-6xl">
              {/* Contents */}
              <div className="mt-7">
                <h1 className="text-2xl font-semibold">Welcome, {name}!</h1>
              </div>

              {/* Shows the Number of Users, Cases, etc. */}
              <TotalList />

             {/*  <div className="flex flex-col justify-stretch w-full mt-2">
                <Tabs />
              </div> */}
              <div className="flex flex-col justify-stretch items-stretch mt-2">
                <AllDemo />
              </div>
            </div>
          </div>
          </div>
        </div>
        </div>
    </>
  );
}

export default AdminDashboard;
