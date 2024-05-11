import React, { useState} from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";

//AuthContext provider
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom"
import { IoPersonCircle } from "react-icons/io5";


import UserProfile from "./user/UserProfile.js";
import ThemesDropdown from "./ThemesDropdown.js";



const ProfileDropdown = ({ gPic }) => {

const navigate = useNavigate()


const { user, dispatch } = useAuthContext();


const handleLogout = () => {
    // Remove user from local storage
    localStorage.removeItem("user");
    localStorage.setItem("hasShownToast", "false");
    // Dispatch logout action
    dispatch({ type: "LOGOUT" });
    navigate('/')
  };

  const email = user ? user.email : null;
  const firstname = user ? user.firstname : null;
  const lastname = user ? user.lastname : null;
  
  const options = "flex flex-row justify-between w-full p-1 px-4 hover:bg-azure-50 hover:bg-opacity-20 cursor-pointer"
  const icon = "text-xl";
  const button = "flex h-10 w-full px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm hover:bg-azure-300"

  return (
    <>
      <Popup
        trigger={
          <button className="bg-label text-bkg rounded-full h-[2rem] w-[2rem] flex items-center text-5xl justify-center overflow-clip">


          <IoPersonCircle />
          </button>
        }
        modal
        nested
        
      >
        {(close) => (
          <div className="fixed z-50 top-0 right-0 flex translate-y-[3.3rem] translate-x-[-1rem]">
            <div className="modal relative h-auto w-64 border rounded-2xl bg-bkg flex flex-col py-3 shadow-lg border-opacity-20 border-gray-400">

                <div className="w-full h-full flex flex-col text-sm font-normal text-content">
                    <div className="flex w-full p-1 px-4 text-base">
                      { firstname } { lastname }
                    </div>

                    <div className="flex w-full p-1 px-4 font-medium">
                        { email }
                    </div>
                    <div className="w-full p-[0.5rem] px-4">
                        <div className="border-t-2 border-opacity-20 border-gray-400"></div>
                    </div>
                    <div className={options}>
                        <ThemesDropdown />
                    </div>
                    <div className="w-full p-[0.5rem] px-4">
                        <div className="border-t-2 border-opacity-20 border-gray-400"></div>
                    </div>
                    <div>
                        <UserProfile />
                        
                    </div>
                    <div className="w-full p-[0.5rem] px-4">
                        <div className="border-t-2 border-opacity-20 border-gray-400"></div>
                    </div >
                    <div className="flex flex-row justify-between w-full p-1 px-4">
                        <button className={button} onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div> {/*  main modal */}
          </div>

        )}
      </Popup>
    </>
  );
};

export default ProfileDropdown;
