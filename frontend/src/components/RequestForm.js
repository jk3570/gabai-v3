import React, { useState, useEffect, useRef } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import toast, { Toaster } from 'react-hot-toast';

import { BaseURL } from '../BaseURL'

<<<<<<< HEAD
const RequestForm = ({ conversationId, summary, onClose }) => {

        const [formConversationId, setConversationId] = useState(conversationId)
=======
const RequestForm = ({ summary, onClose, handleNewChat, handleConversationClick, conversationTitles, toggleSidebar,showRequestButton, setShowRequestButton, inputVisible, setInputVisible }) => {
>>>>>>> 66d9aea27e57047e66a79694b7f9703669c843e7
        const [formSummary, setFormSummary] = useState(summary);
        const [isChecked, setIsChecked] = useState(false);
        const [firstModalOpen, setFirstModalOpen] = useState(true);
        const [secondModalOpen, setSecondModalOpen] = useState(false);
        const contentRef = useRef(null);

        const openSecondModal = () => {
          setFirstModalOpen(false);
          setSecondModalOpen(true);
        };
      
        const closeModal = () => {
          setFirstModalOpen(false);
          setSecondModalOpen(false);
        };

        const handleCheckboxChange = () => {
            setIsChecked(!isChecked);
        };
          
    const { user } = useAuthContext();
    const [userid, setUserId] = useState(user ? user.userid : '');
    const [status, setStatus] = useState("pending");
    const [firstname, setFirstname] = useState(user ? user.firstname : '');
    const [lastname, setLastname] = useState(user ? user.lastname : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [region, setRegion] = useState(user ? user.region : '');
    const [province, setProvince] = useState(user ? user.province : '');
    const [city, setCity] = useState(user ? user.city : '');
    const [barangay, setBarangay] = useState(user ? user.barangay : '');
    const [address, setAddress] = useState(`${region}, ${province}, ${city}, ${barangay}`);
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false); 


    const input = "flex h-10 w-full rounded-md border border-input bg-gray-400 bg-opacity-20 px-3 py-2 text-xs text-content ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const summaryStyle = "flex h-52 w-full rounded-md border bg-gray-400 bg-opacity-20 rounded-md px-3 py-2 text-xs  text-content ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const button = "flex h-10 px-3 py-2 bg-azure text-white border border-azure rounded-md justify-center items-center w-full text-sm";
    const cancelButton = "flex h-10 px-3 py-2  bg-gray-400 bg-opacity-20 text-label border border-azure rounded-md justify-center items-center w-full text-sm";
    const label = "block font-normal text-sm";

    const successNotif = () => toast.success('Request sent successfully!');
    const failNotif = () => toast.error('Failed to insert data');

    const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
        await axios.post(`http://localhost:4000/form/request`, {
            userid,
            firstname,
            lastname,
            email,
            address,
            status,
            summary: formSummary,
            conversationId: formConversationId // Ensure you include the summary field
        });
        setIsLoading(false);
        successNotif();
        setShowPopup(true);
    } catch (error) {
        setIsLoading(false);
        console.error(error);
        failNotif();
    }
};


    return (
    <div className="fixed z-40 top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-5 bg-black pt-[3.875rem]">

        {/* First Modal */}
        {firstModalOpen && (
        <div id="privacy-notice-modal" className="modal absolute z-50 h-[80%] w-[70%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-2xl bg-bkg text-content flex flex-col justify-center items-center p-5 gap-2"> 
        <h1 className="my-0 text-2xl font-bold">Privacy Notice</h1>
        <div className="flex w-full border-b-2 border-gray"></div>
        <div ref={contentRef} className="h-full overflow-y-scroll no-scrollbar">
            <div id="privacy-notice" className=" text-sm leading-normal flex flex-col gap-2 text-justify">
                <p className="mb-4"><div className="inline-block w-8"></div>We take the privacy of our users seriously and are committed to protecting your personal information. This privacy notice outlines how GabAi collects, uses, and safeguards your data in full compliance with the <i>Data Privacy Act of 2012</i> and <i>National Privacy Commission.</i> By using GabAi, you consent to the practices described below.</p>
                <div>
                    <h2 className="font-bold">Personal Information We Collect and How We Use It</h2>
                <p><div className="inline-block w-8"></div>GabAi collects the following types of personal information, and each type is used for specific purposes:</p>
                </div>
                
                <ul className="flex flex-col gap-2">
                    <li><div className="inline-block w-8"></div><strong>Name:</strong> We collect your name for identity verification and to create a personalized experience. Your name helps us distinguish you from other individuals and ensures that our legal services are provided to the correct person. It also allows us to address you directly, fostering a sense of connection and enhancing your experience.</li>
                    <li><div className="inline-block w-8"></div><strong>Address:</strong> We collect your address for jurisdiction verification. Understanding your geographical location is essential as it helps our lawyers identify and adhere to the relevant laws and regulations governing your specific location. This information can be crucial in addressing jurisdictional issues and providing you with accurate legal advice.</li>
                    <li><div className="inline-block w-8"></div><strong>Email:</strong> Your email address is our primary means of communication. We use it to send notifications, appointment reminders, follow-up messages, and any relevant documentation or agreements. Email communication ensures timely updates and efficient coordination before, during, and after your legal consultations.</li>
                    <li><div className="inline-block w-8"></div><strong>Case Summary:</strong> Providing a summary of your legal case helps our lawyers prepare for consultations and offer targeted legal advice. It enables us to conduct preliminary research, address your specific concerns, and ensure an efficient and effective consultation process. Additionally, your case summary allows us to identify any potential conflicts of interest and handle your confidential information with the utmost integrity, in line with our confidentiality obligations.</li>
                </ul>
                
                <div>   
                <p><div className="inline-block w-8"></div>By checking the box and using GabAi, you consent to the collection, processing, and storage of your personal information as described in this privacy notice. Your data will be handled securely and confidentially, adhering to the Data Privacy Act of 2012 and the guidelines set by the National Privacy Commission.</p>
                </div>
            </div>

        </div>

        <div class="flex items-center mt-6 text-content">
            <input  type="checkbox" 
                    id="agree-checkbox" 
                    class="h-4 w-4 focus:ring-azure-500 border-gray-300 rounded-full" 
                    /* disabled={!isChecked} */
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    />
            <label for="agree-checkbox" class="ml-2 block text-sm">I have read and agree to the Privacy Notice</label>
        </div>

        {isChecked ? (<button className={button} onClick={openSecondModal}>
                        Continue
                    </button> ) : (
                    <div className="flex h-10 px-3 py-2  bg-gray-400 opacity-4  0 text-gray-700 border border-azure rounded-md justify-center items-center w-full text-sm" >
                        Continue    
                    </div>
                    )}
        </div>
        )}
        
        {/* Second Modal */}
        {secondModalOpen && (
        <div className="modal relative z-10 h-auto w-[70%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-2xl bg-bkg text-content flex flex-col justify-center items-center pt-7 py-10 p-6">
            <div className="w-full max-w-md bg-bkg rounded-lg">
                <div className="w-full h-full grid grid-cols-1 gap-2">
                    <div className="flex flex-col justify-center">
                        <h1 className="font-bold text-2xl m-0">
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
                            value={formSummary} // Use formSummary here
                            onChange={e => setFormSummary(e.target.value)} // Update formSummary state on change
                            readOnly
                        ></textarea>

                        <button type="submit" className={button} disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                            <Toaster />
                        </button>
                        
                        <button type="button" className={cancelButton} onClick={onClose}>
                            Cancel
                        </button>
                    </form> 
                </div>
            </div>
        </div>
        )}

        {/* Popup */}
        {showPopup && (
                <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal relative z-10 h-auto w-[70%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-2xl bg-bkg text-content flex flex-col justify-center items-start pt-7 p-6 gap-2">
                        <h1 className="my-0 text-xl font-bold">Request submitted successfully!</h1>
                        <p>Your request has been sent and is waiting to be accepted by an available lawyer. Please wait 5-7 days.</p>
                        <p>Would you like to initiate a new conversation with Gab?</p><br/>
                        <button type="button" className={cancelButton} 
                        onClick={() => { 
                            setShowPopup(false); 
                            onClose(); 
                            handleNewChat();
                            setInputVisible(true); // Show the input field
                            setShowRequestButton(false); // Hide the buttons
                            }}>
                            New Chat
                        </button>
                    </div>
                </div>
            )}
    </div>
    );
};

export default RequestForm;