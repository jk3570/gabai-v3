import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { HiOutlineQueueList } from "react-icons/hi2";
import useAcceptedRequest from '../../hooks/useAcceptedRequest';
import { useAuthContext } from '../../hooks/useAuthContext';
import { format } from "date-fns";

const UserBurgerMenu = () => {
    const { user, dispatch } = useAuthContext();
    const { requestData, loading } = useAcceptedRequest(user.userid); // Pass userid to the hook

    console.log("requestData:", requestData);
    console.log("loading:", loading);
    
    const button = "flex h-10 w-full px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm hover:bg-azure-300";
    const join = "flex h-5 w-full px-2 py-1 bg-azure text-white rounded-md justify-center items-center text-sm hover:bg-azure-300 hover:scale-[1.02] hover:text-base";


    const navList = "p-5 py-2 w-full hover:bg-azure-50 hover:bg-opacity-20"

    return( 
        <div  id="sidebar" 
              className="relative z-40 h-screen border bg-bkg text-content flex flex-col transition duration-200 shadow-lg">
            <div className="text-content text-2xl">
    
            {/* Top area */}
              <div className="relative z-50 flex justify-between left-0 h-[3.875rem] w-full border-b-2 border-white bg-azure-50 bg-opacity-10 p-[0.9rem] pl-1">
              <div></div>
              {/* Search Icon */}
              <Link to="/search">
                <div className="flex items-center justify-center p-1 text-label">
                  <FaSearch className="text-2xl hover:scale-[1.1] transition-all duration-200 ease-in-out" />
                </div>
              </Link>

              </div>
  
              <div className="flex flex-col justify-start h-full w-full">
              <div className="relative z-50 bg-bkg w-full p-3 gap-3 border-b border-opacity-20 border-gray-400">
                        <div className="text-md font-medium text-label">
                            Your Requests
                        </div>
                    </div>

                    <div className="relative h-[33rem] w-full bg-bkg flex flex-col overflow-clip">
                            <div className="relative flex flex-col gap-5 p-3 overflow-y-scroll border-r border-gray-400 border-opacity-20">
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (
                                    requestData.map((user) => (
                                    <div key={user._id} className="relative w-full h-auto flex flex-col bg-gray-300 bg-opacity-30 text-sm text-content font-normal shadow-md rounded-md p-3 border border-gray-400 border-opacity-20">
                                        
                                    <div className="flex flex-col gap-2"> 
                                        <div className="text-base font-bold text content">
                                            <h2>Case Summary</h2>
                                        </div>
 
                                        <div className="flex flex-row gap-2">
                                            <div className="font-medium text-sm">
                                                Schedule
                                            </div>
                                            <div className="w-full py-[0.5rem]">
                                                <div className="border-t-2 border-gray-200 border-opacity-20"></div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row gap-2 w-full">
                                            <div className="w-[65%]">
                                                <label className="text-xs text-opacity-[80%]">Date:</label>
                                                <div className="flex w-full text-sm font-medium bg-bkg bg-opacity-[80%] border border-azure-200 rounded-md px-2 py-1">{user.date}</div>
                                            </div>
                                            <div className="w-[35%]">
                                                <label className="text-xs text-opacity-[80%]">Time:</label>
                                                <div className="flex w-full text-sm font-medium bg-bkg bg-opacity-[80%] border border-azure-200 rounded-md px-2 py-1">{user.time}</div>
                                            </div>
                                        </div>

                                        <div>
                                                <label className="text-xs text-opacity-[80%]">Lawyer Name:</label>
                                                <div className="flex w-full text-sm font-medium bg-bkg bg-opacity-[80%] border border-azure-200 rounded-md px-2 py-1">{user.lawyername}</div>
                                        </div>

                                        <div className="flex w-full justify-end mt-2">
                                            <div className="w-[50%] justify-end">
                                                <button className={button}>
                                                <Link to={`/user/video-conference/${user.meetingId}`}>Meet Lawyer</Link>
                                                </button>
                                            </div>
                                        </div>
                                    </div>



                                        {/* <div>
                                            <p>Name: {user.firstname} {user.lastname}</p>
                                            <p>Email: {user.email}</p>
                                        </div> */}

                                        {/* <div>
                                            <h3><b>Schedule</b></h3>
                                                <div className="flex flex-row justify-between">
                                                <p>Date: {user.date}</p>
                                                <p>Time: {user.time}</p>
                                                </div>

                                            <p>Lawyer Name: {user.lawyername}</p>
                                        </div>
                                        
                                        <div className="w-[50%] justify-end">
                                            <button className={button}>
                                            <Link to={`/user/video-conference/${user.meetingId}`}>Join</Link>
                                            </button>
                                        </div> */}
                                            


                                    </div>
                                    ))
                                )}
                            </div>
                    </div>
              </div>

            </div>
          </div>
    );
};

export default UserBurgerMenu;

