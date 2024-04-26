import React from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import { HiOutlineQueueList } from "react-icons/hi2";
import useAcceptedRequest from '../../hooks/useAcceptedRequest';
import { useAuthContext } from '../../hooks/useAuthContext';
import { format } from "date-fns";

const UserRequests = () => {
    const { user, dispatch } = useAuthContext();
    const { requestData, loading } = useAcceptedRequest(user.userid); // Pass userid to the hook

    console.log("requestData:", requestData);
    console.log("loading:", loading);

    const button = "flex h-10 w-full px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm hover:bg-azure-300";
    const join = "flex h-5 w-full px-2 py-1 bg-azure text-white rounded-md justify-center items-center text-sm hover:bg-azure-300 hover:scale-[1.02] hover:text-base";

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
                    <div className="fixed z-40 top-0 right-0 flex translate-y-[3.3rem] translate-x-[-4rem]">
                    <div className="modal relative max-h-96 w-96 rounded-2xl bg-bkg flex flex-col shadow-lg border border-gray-400 border-opacity-20">

                    <div className="relative z-50 bg-bkg w-full p-3 gap-3 border-b border-opacity-20 border-gray-400">
                        <div className="text-md font-medium text-label">
                            Your Requests
                        </div>
                    </div>

                    <div className="relative max-h-96 w-96 rounded-b-2xl bg-bkg flex flex-col overflow-clip">
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
                                                <div className="flex w-full text-sm font-medium bg-bkg bg-opacity-[80%] border border-azure-200 rounded-md px-2 py-1">
                                                {format(
                                  new Date(user.date ?? ""),
                                  "MMMM dd, yyyy"
                                )}
                                                </div>
                                            </div>
                                            <div className="w-[35%]">
                                                <label className="text-xs text-opacity-[80%]">Time:</label>
                                                <div className="flex w-full text-sm font-medium bg-bkg bg-opacity-[80%] border border-azure-200 rounded-md px-2 py-1">
                                                 {(() => {
                                  // Append a dummy date to the time string
                                  const dateTimeString = `2000-01-01 ${user.time}`;
                                  // Parse the concatenated string as a Date object
                                  const parsedDate = new Date(dateTimeString);
                                  // Format the parsed date in 12-hour time format
                                  return parsedDate.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  });
                                })()}
                                                </div>
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
                                    </div>
                                    ))
                                )}
                            </div>
                    </div>
                        </div>
                    </div>
                )}
            </Popup>
        </>
    );
};

export default UserRequests;
