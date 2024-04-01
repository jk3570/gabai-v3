//icon sets
import { RxDashboard } from "react-icons/rx";
import { HiOutlineQueueList } from "react-icons/hi2";
import { AiOutlineSchedule } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { IoMenuSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

import { Link } from "react-router-dom";
/* import "../../css/admin-sidebar.css"; */

import React from 'react';
import Popup from "reactjs-popup";

const LawyerSidebar = () => {

    const label = "block font-normal text-sm"
    const input = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    const button = "flex h-10 px-3 py-2 bg-azure text-white rounded-md justify-center items-center w-[12rem] ml-2 text-sm"
    
    const text = "flex flex-row gap-4 text-1xl items-center";
    const icon = "text-2xl";
    const navList = "p-5 py-2 w-full hover:bg-azure-50 hover:bg-opacity-20"

    return (
      <>
        <Popup
          trigger={
            <button className="relative z-50 justify-center items-center text-3xl cursor-pointer text-label">
            <IoMenuSharp />
            </button>
          }
          modal
          nested
          
        >
          {(close) => (
            <div className="fixed top-0 left-0 flex -translate-y-[0.1rem]">
              {/* "fixed z-50 top-0 left-0 flex w-full h-full items-center justify-center" */}
              <div id="sidebar" 
                className="modal fixed z-40 h-screen w-[320px] border bg-bkg flex flex-col transition duration-200 shadow-lg">

            {/* Top area */}
            <div className="text-content text-2xl">
            <div className="relative z-50 flex left-0 h-[3.875rem] w-[320px] border-b-2 border-white hover:bg-azure-50 hover:bg-opacity-20 p-[1rem]">
                <button className="relative z-50 justify-center items-center font-bold text-label text-3xl cursor-pointer tracking-tighter leading-none">
                <IoCloseSharp 
                className="text-3xl cursor-pointer"
                onClick={() => close()}/>
                </button>
            </div>

            {/* Navigation Area */}
            <nav className="flex flex-col items-start text-content font-normal gap-2 mt-2">
                <div className={navList}>
                <Link
                    to="/lawyer"
                    className={text}
                >
                    <RxDashboard className={icon} />
                    Dashboard
                </Link>
                </div>

                <div className={navList}>
                <Link
                    to="/lawyer/lawyer-request"
                    className={text}
                >
                    <HiOutlineQueueList className={icon} />
                    Request Queue
                </Link>
                </div>

                <div className={navList}>
                <Link
                    to="/lawyer/lawyer-schedule"
                    className={text}
                >
                    <AiOutlineSchedule className={icon} />
                    Scheduled Cases
                </Link>
                </div>

                <div className={navList}>
                <Link 
                    to="/lawyer/lawyer-archive"
                    className={text}>
                    <BsArchive className={icon} />
                    Archived
                </Link>
                </div>
            </nav>
            </div>
              </div> {/*  main modal */}
            </div>
  
          )}
        </Popup>
      </>
    );
  };
  
  export default LawyerSidebar;