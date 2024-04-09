import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { BaseURL } from '../BaseURL'

const RequestForm = ({ summary, onClose }) => {
    const { user } = useAuthContext();
    const [userid, setUserId] = useState(user ? user.userid : '');
    const [firstname, setFirstname] = useState(user ? user.firstname : '');
    const [lastname, setLastname] = useState(user ? user.lastname : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [region, setRegion] = useState(user ? user.region : '');
    const [province, setProvince] = useState(user ? user.province : '');
    const [city, setCity] = useState(user ? user.city : '');
    const [barangay, setBarangay] = useState(user ? user.barangay : '');
    const [address, setAddress] = useState(`${region}, ${province}, ${city}, ${barangay}`);
    const [isLoading, setIsLoading] = useState(false);

    const input = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const summaryStyle = "flex h-52 w-full rounded-md border bg-gray rounded-md px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const button = "flex h-10 px-3 py-2 bg-azure text-white rounded-md justify-center items-center w-full text-sm";
    const cancelButton = "flex h-10 px-3 py-2 bg-white text-azure border border-azure rounded-md justify-center items-center w-full text-sm";
    const label = "block font-normal text-sm";

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(`${BaseURL}/form/request`, { userid, firstname, lastname, email, address, summary });
            setIsLoading(false);
            alert('Request sent successfully');
            onClose(); // Close the modal
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            alert('Failed to insert data');
        }
    };

    return (
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
                            <input type="text" className={input} placeholder="First Name" value={firstname} onChange={e => setFirstname(e.target.value)} readOnly />
                            <input type="text" className={input} placeholder="Last Name" value={lastname} onChange={e => setLastname(e.target.value)} readOnly />
                        </div>
                        <input type="email" className={input} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} readOnly />
                        <input type="text" className={input} placeholder="Address" value={address} readOnly />
                        <textarea
                            name="summary"
                            className={summaryStyle}
                            placeholder="Case Summary"
                            value={summary}
                            readOnly
                        ></textarea>
                        <button type="submit" className={button} disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button type="button" className={cancelButton} onClick={onClose}>
                            Cancel
                        </button>
                    </form> 
                </div>
            </div>
        </div>
    );
};

export default RequestForm;
