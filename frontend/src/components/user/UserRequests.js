import React from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import { HiOutlineQueueList } from "react-icons/hi2";
import useAcceptedRequest from '../../hooks/useAcceptedRequest';

const UserRequests = () => {
    const { requestData, loading } = useAcceptedRequest();

    const button = "flex h-10 w-full px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm hover:bg-azure-300 hover:scale-[1.02] hover:text-base";
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
                        <div className="modal relative max-h-96 w-96 rounded-2xl bg-white flex flex-col shadow-lg">
                            <div className="relative z-50 bg-white w-full p-3 gap-3 border-b">
                                <div>
                                    <Link to="/gab/chat" className={button}>Chat</Link>
                                </div>
                                <div className="text-md font-medium mt-3">Your Requests</div>
                            </div>
                            <div className="relative max-h-96 w-96 rounded-b-2xl bg-white flex flex-col overflow-clip">
                                <div className="relative grid-col gap-3 p-3 pt-0 overflow-y-scroll">
                                    {loading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        requestData.map((user) => (
                                            <div key={user._id} className="relative w-full h-40 bg-gray-100 text-sm font-normal shadow-md rounded-md my-2">
                                                <p>Name: {user.firstname} {user.lastname}</p>
                                                <p>Email: {user.email}</p>
                                                <br/>
                                                <h3><b>Schedule</b></h3>
                                                <p>Date: {user.date}</p>
                                                <p>Time: {user.time}</p>
                                                <p>Lawyer Name: {user.lawyername}</p>
                                                 <button className={join}>Join</button>
                                                <p></p>

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
