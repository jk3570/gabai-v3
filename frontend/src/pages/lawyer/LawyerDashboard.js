import React from "react";
import { Helmet } from "react-helmet";

import { Link } from "react-router-dom";

import { HiMiniQueueList } from "react-icons/hi2";
import { AiFillSchedule } from "react-icons/ai";
import { FaArchive } from "react-icons/fa";

function LawyerDashboard() {
    const name = "Attorney";

    const cardTitle = "text-1xl font-semibold"
    const totalNoStyle =
    "flex flex-row bg-gray-200 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl h-auto w-[35%] text-1xl p-5 justify-start items-center border-azure-500 gap-5 hover:scale-[1.04]";

    return (
        <>
          <Helmet>
            {/* Title of the Page */}
            <title>Admin Dashboard - GabAi</title>
          </Helmet>

        <div className="relative z-10 w-full py-[3.875rem] flex flex-col justify-start min-h-screen max-md:p-1">
            <div id="main-content" className="flex flex-col w-full mx-auto max-w-5xl">
              {/* Contents */}
              <div className="mt-0">
                <h1 className="text-2xl font-semibold">Welcome, {name}!</h1>
              </div>

              <div className="flex flex-row gap-5 mx-auto justify-center shrink self-center w-full">
                
                <Link to="/lawyer/lawyer-request" className={totalNoStyle}>
                    {/* User Count */}
                    <div>
                    <HiMiniQueueList className="h-[4rem] w-[4rem] p-2 fill-azure" />
                    </div>
                    <div className={cardTitle}>
                    Total No. of Users
                    </div>
                </Link>
                

                
                <Link to="/lawyer/lawyer-schedule" className={totalNoStyle}>
                    {/* Case Count */}
                    <div>
                    <AiFillSchedule className="h-[4rem] w-[4rem] fill-azure" />
                    </div>
                    <div className={cardTitle}>
                    Total No. of Cases
                    </div>
                </Link>
                

                
                <Link to="/lawyer/lawyer-archive" className={totalNoStyle}>
                    {/* Feedback Count */}
                    <div>
                    <FaArchive className="h-[4rem] w-[4rem] p-1 fill-azure" />
                    </div>
                    <div className={cardTitle}>
                    Total No. of Feedback
                    </div>
                </Link>
                
                </div>
            </div>
        </div>


          </>
  );
}

export default LawyerDashboard;