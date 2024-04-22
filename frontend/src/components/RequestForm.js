import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import toast, { Toaster } from 'react-hot-toast';

import { BaseURL } from '../BaseURL'

const RequestForm = ({ summary, onClose }) => {
        const [firstModalOpen, setFirstModalOpen] = useState(true);
        const [secondModalOpen, setSecondModalOpen] = useState(false);
        const contentRef = useRef(null);

  useEffect(() => {
    const contentDiv = contentRef.current;
    const handleScroll = () => {
      if (
        contentDiv.scrollTop + contentDiv.clientHeight >=
        contentDiv.scrollHeight
      ) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    };

    contentDiv.addEventListener('scroll', handleScroll);

    return () => {
      contentDiv.removeEventListener('scroll', handleScroll);
    };
  }, []);

        const openSecondModal = () => {
          setFirstModalOpen(false);
          setSecondModalOpen(true);
        };
      
        const closeModal = () => {
          setFirstModalOpen(false);
          setSecondModalOpen(false);
        };

        const handleCheckboxChange = () => {
            // Do nothing if the checkbox is already checked
            if (!isChecked) {
              setIsChecked(true);
            }
          };
          
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

    const input = "flex h-10 w-full rounded-md border border-input bg-gray-400 bg-opacity-20 px-3 py-2 text-xs text-content ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const summaryStyle = "flex h-52 w-full rounded-md border bg-gray-400 bg-opacity-20 rounded-md px-3 py-2 text-xs  text-content ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const button = "flex h-10 px-3 py-2 bg-azure text-white rounded-md justify-center items-center w-full text-sm";
    const cancelButton = "flex h-10 px-3 py-2  bg-gray-400 bg-opacity-20 text-label border border-azure rounded-md justify-center items-center w-full text-sm";
    const label = "block font-normal text-sm";

    const successNotif = () => toast.success('Request sent successfully!');
    const failNotif = () => toast.error('Failed to insert data');

    const [isChecked, setIsChecked] = useState(false);
        
    useEffect(() => {
        // Function to check if the checkbox is checked
        const handleCheckboxChange = () => {
            const checkbox = document.getElementById('agree-checkbox');
            if (checkbox.checked) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        };
    
        // Attach event listener to the checkbox
        const checkbox = document.getElementById('agree-checkbox');
        checkbox.addEventListener('change', handleCheckboxChange);
    
        // Clean up function to remove event listener
        return () => {
            checkbox.removeEventListener('change', handleCheckboxChange);
        };
    }, []); // Empty dependency array to run effect only once


    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(`${BaseURL}/form/request`, { userid, firstname, lastname, email, address, summary });
            setIsLoading(false);
            successNotif();
            /* alert('Request sent successfully'); */
            setTimeout(() => {
                onClose(); // Close the modal
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            failNotif();
            /* alert('Failed to insert data'); */
        }
    };

    return (
    <div className="fixed z-40 top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-5 bg-black pt-[3.875rem]">

        {/* First Modal */}
        {firstModalOpen && (
        <div id="privacy-notice-modal" className="modal absolute z-50 h-[80%] w-[70%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-2xl bg-bkg text-content flex flex-col justify-center items-center p-5 gap-3"> 
        <h1 className="my-0">Privacy Notice</h1>

        <div ref={contentRef} className="h-full overflow-y-scroll">
            <div id="privacy-notice" className=" text-xs leading-normal">
            <h2 className="font-bold">Submission of Request Form for Lawyer Meeting</h2>
            <p>We respect your privacy and are committed to protecting your personal information. This Privacy Notice outlines the information we collect when you submit a request form for a lawyer meeting and how we use, disclose, and protect that information.</p>

            <h3>1. Information We Collect:</h3>
            <p>When you submit a request form for a lawyer meeting, we may collect the following personal information:
                <ul>
                    <li>Your name</li>
                    <li>Contact information (email address, phone number)</li>
                    <li>Details related to your legal matter or inquiry</li>
                </ul>
            </p>

            <h3>2. How We Use Your Information:</h3>
            <p>We may use the information collected for the following purposes:
                <ul>
                    <li>To schedule and confirm your lawyer meeting appointment</li>
                    <li>To communicate with you regarding your legal matter or inquiry</li>
                    <li>To provide you with legal services, if applicable</li>
                </ul>
            </p>

            <h3>3. Disclosure of Your Information:</h3>
            <p>We may disclose your personal information to:
                <ul>
                    <li>Lawyers and legal professionals within our firm involved in handling your request</li>
                    <li>Third-party service providers who assist us in scheduling appointments or providing legal services</li>
                </ul>
            </p>

            <h3>4. Your Consent:</h3>
            <p>By submitting the request form for a lawyer meeting, you consent to the collection, use, and disclosure of your personal information as described in this Privacy Notice.</p>

            <h3>5. Data Security:</h3>
            <p>We take reasonable steps to protect your personal information from unauthorized access, use, or disclosure. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.</p>

            <h3>6. Retention of Your Information:</h3>
            <p>We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Notice or as required by law.</p>

            <h3>7. Your Rights:</h3>
            <p>You have the right to:
                <ul>
                    <li>Access your personal information and request a copy of it</li>
                    <li>Correct any inaccuracies in your personal information</li>
                    <li>Request the deletion of your personal information, subject to certain exceptions</li>
                </ul>
            </p>

            <h3>8. Contact Us:</h3>
            <p>If you have any questions or concerns about this Privacy Notice or our privacy practices, please contact us at [insert contact information].</p>

            <p>By submitting the request form for a lawyer meeting, you acknowledge that you have read and understood this Privacy Notice and agree to the collection, use, and disclosure of your personal information as described herein.</p>

            <p>This Privacy Notice may be updated from time to time. We encourage you to review it periodically for any changes.</p>

            <p>Last updated: April 19, 2024</p>
            </div>
        </div>

        <div class="flex items-center mt-6 text-content">
            <input  type="checkbox" 
                    id="agree-checkbox" 
                    class="h-4 w-4 focus:ring-azure-500 border-gray-300 rounded-full" 
                    disabled={!isChecked}
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
                            value={summary}
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
    </div>
    );
};

export default RequestForm;
