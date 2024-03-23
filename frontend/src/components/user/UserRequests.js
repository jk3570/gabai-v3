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
  const button = "flex h-10 w-full px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm"

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
          <div className="fixed z-50 top-0 right-0 flex translate-y-[3.3rem] translate-x-[-4rem]">
            <div className="modal relative max-h-96 w-96 overflow-y-auto border rounded-2xl bg-white flex flex-col p-3 shadow-lg">

                <div className="relative flex flex-col gap-2">
                    <div className="text-md font-medium">
                        Your Requests</div>
                    <div className="relative flex w-full h-40 bg-white text-sm font-normal shadow-md rounded-md"></div>
                    <div className="relative flex w-full h-40 bg-white text-sm font-normal shadow-md rounded-md"></div>
                    <div className="relative flex w-full h-40 bg-white text-sm font-normal shadow-md rounded-md"></div>
                </div>
            </div> {/*  main modal */}
          </div>

        )}
      </Popup>
    </>
  );
};

export default UserRequests;
