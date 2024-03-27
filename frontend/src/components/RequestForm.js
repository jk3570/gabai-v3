import React, { useState } from "react";
import Popup from "reactjs-popup";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import { BaseURL } from "../BaseURL";

const RequestForm = () => {
    const navigate = useNavigate();

    const { user, dispatch } = useAuthContext();

    const userid = user ? user.userid : null;
    const firstname = user ? user.firstname : null;
    const lastname = user ? user.lastname : null;
    const email = user ? user.email : null;
    const region = user ? user.region : null;
    const province = user ? user.province : null;
    const city = user ? user.city : null;
    const barangay = user ? user.barangay : null;
    const address = `${region}, ${province}, ${city}, ${barangay}`;
    const summary = address;


    const input = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const summaryStyle = "flex h-52 w-full rounded-md border bg-gray rounded-md px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const button = "flex h-10 px-3 py-2 bg-azure text-white rounded-md justify-center items-center w-full text-sm";
    const cancelButton = "flex h-10 px-3 py-2 bg-white text-azure border border-azure rounded-md justify-center items-center w-full text-sm";
    const label = "block font-normal text-sm";

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:4000/form/request`, {userid, firstname, lastname, email, address, summary});
            alert('Data inserted successfully');
            navigate('/gab/chat');
        } catch (error) {
            console.error(error);
            alert('Failed to insert data');
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg bg-opacity-25 bg-black">
            <div className="modal relative h-auto w-[70%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-2xl bg-white flex flex-col justify-center items-center pt-7 py-10 p-6">
                <div className="w-full max-w-md bg-white rounded-lg">
                    <div className="w-full h-full grid grid-cols-1 gap-2">
                        <div className="flex flex-col justify-center">
                            <h1 className="font-bold text-3xl m-0">
                                Request Form
                            </h1>
                            <p className={label}>Request <span className="text-azure font-medium">online meeting</span> to a lawyer</p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                            <div className="flex flex-row-1 gap-2">
                                <input type="text" className={input} placeholder="First Name" value={firstname} readOnly />
                                <input type="text" className={input} placeholder="Last Name" value={lastname} readOnly />
                            </div>
                            <input type="email" className={input} placeholder="Email" value={email} readOnly />
                            <input type="text" className={input} placeholder="Address" value={address} readOnly />
                            <textarea
                                name="summary"
                                className={summaryStyle}
                                placeholder="Case Summary"
                                value={address}
                                readOnly
                            ></textarea>
                            <button type="submit" className={button}>
                                Submit
                            </button>
                            <Link to="/gab/chat">
                                <button type="button" className={cancelButton}>
                                    Cancel
                                </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestForm;
