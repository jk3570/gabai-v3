import React, { useState, useEffect } from 'react';
import useUserRequestDataLawyer from '../../hooks/useUserRequestDataLawyer';
import Pagination from '@mui/material/Pagination';
import ReactPaginate from 'react-paginate';
import Stack from '@mui/material/Stack';
import Popup from 'reactjs-popup';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import { BaseURL } from '../../BaseURL'
import toast, { Toaster } from "react-hot-toast";
import JoinScreen from "../../components/lawyer/video-call/JoinScreen";
import MeetingView from "../../components/lawyer/video-call/MeetingView";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "../../API";
import { Helmet } from "react-helmet";
import { IoIosMore } from "react-icons/io";

const LawyerRequestTable = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();
  const [isMeetingIdGenerated, setIsMeetingIdGenerated] = useState(false);
  const [isDateTimeFilled, setIsDateTimeFilled] = useState(false);

  const fname = user ? user.firstname : null;
  const lname = user ? user.lastname : null;
  const lawyeremail  = user ? user.email : null;
  const lawyername = `${fname} ${lname}`;

  const [meetingId, setMeetingId] = useState(null);
  const [myId, setMyId] = useState(null);

  const { userRequestDataLawyer, loadingPendingLawyer } = useUserRequestDataLawyer();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    userid: '',
    lawyeremail: lawyeremail,
    lawyeruserid: '',
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    summary: '',
    time: '',
    date: '',
    lawyername: lawyername,
    meetingId: '',
  });
  const itemsPerPage = 6;

  const summaryStyle = "flex h-52 w-full rounded-md border bg-gray-400 bg-opacity-20 rounded-md px-3 py-2 text-xs  text-content ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
  const input = "flex h-auto w-full rounded-md border border-input bg-gray-400 bg-opacity-20 px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const button = "flex h-10 px-1 py-1 bg-azure text-white rounded-md justify-center items-center w-full text-xs  cursor-pointer";
  const cancelButton = "flex h-10 px-3 py-2 bg-white text-azure border border-azure rounded-md justify-center items-center w-full text-sm  cursor-pointer";
  const label = "block font-normal text-sm";

  if (loadingPendingLawyer) {
    return <div>Loading...</div>;
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); 
  };

  const generateMeetingId = async () => {
    const newMeetingId = await createMeeting({ token: authToken });
    return newMeetingId;
  };

  const onCreateClick = async () => {
    const meetingId = await generateMeetingId();
    setMeetingId(meetingId);
    setMyId(meetingId);
    setIsMeetingIdGenerated(true);
      toast.success("Meeting ID Generated!", {
        position: "bottom-center",
        duration: 5000,

      })
  };

  const handleSubmit = async (event, user) => {
    event.preventDefault();

      // Get today's date
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Parse the selected date from the form
      const selectedDate = new Date(formData.date);

      // Check if the selected date is today or in the past
      if (selectedDate <= today) {

         toast.error("Please select a future date for the consultation.", {
        position: "bottom-center",
        duration: 5000,

      })
       
        return; // Prevent further execution of the function
      }

    const id = user.userid
    console.log(id)
    try {
      const formDataFromUser = {
        userid: user.userid,
        lawyeremail: lawyeremail,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        summary: user.summary,
        time: formData.time,
        date: formData.date,
        lawyername: lawyername,
        meetingId: meetingId,
      };
      console.log(formDataFromUser)
      const response = await axios.post(`${BaseURL}/accept/confirm`, formDataFromUser);
      

      if (response.status === 201) {
        toast.success("Request accepted successfully!", {
        position: "bottom-center",
        duration: 5000,

      })

        await axios.delete(`${BaseURL}/form/delete/${id}`)

        // navigate('/lawyer/lawyer-schedule');
      } else {
         toast.error("Failed to process request", {
        position: "bottom-center",
        duration: 5000,

      })
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleDateChange = (e) => {
    setFormData({ ...formData, date: e.target.value });
    setIsDateTimeFilled(!!e.target.value && !!formData.time);
  };

  const handleTimeChange = (e) => {
    setFormData({ ...formData, time: e.target.value });
    setIsDateTimeFilled(!!e.target.value && !!formData.date);
  };

  const filteredData = userRequestDataLawyer.filter((user) =>
    Object.values(user).some((field) =>
      field && field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const cardsData = filteredData
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    .map((user) => (
      <div key={user._id} className="relative w-full h-auto flex flex-row bg-gray-200 bg-opacity-20 justify-between hover:bg-azure-50 hover:bg-opacity-10 p-3 text-sm text-content rounded-md border border-gray-400 border-opacity-20 shadow-md hover:-translate-y-1">
      <div className="flex flex-col w-full justify-between">
        <div className="font-bold text-content">
        {user.firstname} {user.lastname}
        </div>
        <div>{user.email}</div>
        <div>{user.address}</div>
        <div className='flex w-full flex-row gap-2 mt-6'>
          <Popup trigger={<div className={cancelButton}>View Case</div>
          }
              modal>
          {closeForm => (
            <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={closeForm}>
              <div className="modal relative z-10 h-auto w-[90%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-2xl bg-bkg text-content flex flex-col justify-center items-center pt-8 p-6">
                <div className="flex flex-col w-full gap-2">
                  <div className="flex flex-row-1 gap-2">
                      <input type="text" className={input} placeholder="First Name" value={user.firstname} readOnly />
                      <input type="text" className={input} placeholder="Last Name" value={user.lastname} readOnly />
                  </div>

                  <input type="email" className={input} placeholder="Email" value={user.email} readOnly />
                  <input type="text" className={input} placeholder="Address" value={user.address} readOnly />

                  <textarea
                      name="summary"
                      className={summaryStyle}
                      placeholder="Case Summary"
                      value={user.summary} // Use formSummary here
                      readOnly
                  ></textarea>

                  <button type="button" className={cancelButton}>Close</button>
                </div>

                <button className="absolute top-2 right-2">
                  <IoIosCloseCircleOutline size={24} />
                </button>    
              </div>
              
            </div>
            
          )}
          </Popup>
          <Popup trigger={<button className={button} onClick={onCreateClick}>Accept</button>}
          modal
        >
          {close => (
            <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
              <Toaster />
              <div className="modal relative h-auto w-96 rounded-2xl bg-bkg flex flex-col justify-center items-center pt-7 py-10 p-6 text-content border border-gray-200 border-opacity-20 drop-shadow-lg">
                <div className="w-full max-w-md bg-bkg rounded-lg">
                  <div className="w-full h-full grid grid-cols-1 gap-2">
                    <div className="flex flex-col justify-center">
                      <h1 className="font-bold text-3xl m-0">Schedule online consultation</h1>
                      <p className={label}>Set <span className="text-azure font-medium">time</span> and <span className="text-azure font-medium">meeting</span></p>
                    </div>
                    <form onSubmit={(event) => { event.preventDefault(); handleSubmit(event, user); }} className="flex flex-col gap-2">
                      <button onClick={onCreateClick} className={button}>Generate Meeting ID</button>
                      <input type="date" className={input} placeholder="Date" onChange={handleDateChange} />
                      <input type="time" className={input} placeholder="Time" onChange={handleTimeChange} /> 
                      <button type="submit" disabled={!isMeetingIdGenerated || !isDateTimeFilled} className={button}>Submit</button>
                      <Link to="/lawyer/lawyer-request">
                        <button type="button" className={cancelButton} onClick={close}>Cancel</button>
                      </Link>
                    </form>
                  </div>
                </div>
                <button className="absolute top-2 right-2" onClick={close}>
                  <IoIosCloseCircleOutline size={24} />
                </button>
              </div>
            </div>
          )}
          </Popup>
        </div>
      </div>
      </div>
));  

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="relative z-10 w-full py-[3.875rem] flex flex-col justify-start items-start min-h-screen max-md:p-1 bg-bkg text-content">
      <div id="main-content" className="flex flex-col w-full mx-auto max-w-5xl gap-3 md:pt-0 pt-14">
        <div className="flex flex-row-1 justify-between items-center mt-4">
          <h1 className="md:text-2xl text-xl font-semibold text-nowrap my-0">Request Queue</h1>
        
        {/* search field */}
        <div className="flex flex-col justify-end items-end w-full">
            <div className="md:w-64 w-full relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="relative px-4 py-2 w-full border border-gray-300 bg-azure-200 bg-opacity-20 rounded-md text-xs"
              />
              <span className="absolute inset-y-0 right-0 flex items-center justify-end mx-5">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="items-center p-1 h-[1.5rem] w-[1.5rem]"
                >
                <path
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke="currentColor"
                ></path>
              </svg>
              </span> 
            </div>
        </div>
        </div>

        
        <div className="bg-bkg md:h-[30rem] h-[30rem] overflow-x-auto no-scrollbar grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
          {cardsData}
        </div>

        {/* Pagination */}
        <div className='justify-center flex'>
        <ReactPaginate
        className="flex flex-row justify-center items-center font-medium text-xs gap-5"
        shape="rounded"
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        disabledClassName={'disabled'}
      />

      <style jsx>{`
        .active {
          border-radius: 50%; /* Makes it a circle */
          background-color: #336699; /* Color of the circle */
          color: white; /* Text color inside the circle */
          padding: 5px 10px; /* Padding inside the circle */
        }
      `}</style>

          
        </div>
      </div>
    </div>
  );
}

export default LawyerRequestTable;