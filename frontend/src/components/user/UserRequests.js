import React, { useState} from "react";
import Popup from "reactjs-popup";
/* import ProfileSettings from "../ProfileSettings"; */
import { Link } from "react-router-dom";

import { HiOutlineQueueList } from "react-icons/hi2";

import UserProfile from "../user/UserProfile.js";



const UserRequests = () => {

    const firstName = "Firstname";
    const lasttName = "Lastname";
    const email = "email@email.com";
    const themes = "Themes";

  const text = "flex w-full p-1 px-4"
  const options = "flex flex-row justify-between w-full p-1 px-4 hover:bg-azure-50 hover:bg-opacity-20 cursor pointer"
  const icon = "text-xl";
  const button = "flex h-10 w-full px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm hover:bg-azure-300 hover:scale-[1.02] hover:text-base"

  return (
    <>
      <Popup
        trigger={
          <button className="flex items-center justify-center">
                <HiOutlineQueueList className="text-3xl hover:scale-[1.1] transition-all duration-200 ease-in-out"/>
          </button>
        }
        modal
        nested
        
      >
        {(close) => (
          <div className="fixed z-30 top-0 right-0 flex translate-y-[3.3rem] translate-x-[-4rem]">
            <div className="modal relative max-h-96 w-96 border rounded-2xl bg-white flex flex-col shadow-lg">

              <div className="absolute z-50 bg-white w-full p-3 gap-3 shadow-lg">
                <div>
                <Link to="/gab/chat" className={button}>
                    Chat
                </Link>
                </div>
                <div className="text-md font-medium mt-3">
                        Your Requests</div>
              </div>
              

                <div className="relative grid-col gap-3 p-3 pt-[6rem] overflow-y-scroll ">
                    <div className="relative w-full h-40 bg-gray-100 text-sm font-normal shadow-md rounded-md my-2"></div>
                    <div className="relative w-full h-40 bg-gray-100 text-sm font-normal shadow-md rounded-md my-2"></div>
                    <div className="relative w-full h-40 bg-gray-100 text-sm font-normal shadow-md rounded-md my-2"></div>
                </div>
            </div> {/*  main modal */}
          </div>

        )}
      </Popup>
    </>
  );
};

export default UserRequests;
