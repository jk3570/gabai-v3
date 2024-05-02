import React, { useState, useEffect } from 'react';
import useUserRequestDataLawyer from '../../hooks/useUserRequestDataLawyer';
import ReactPaginate from 'react-paginate';
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
  const itemsPerPage = 10; 

  const input = "flex h-auto w-full rounded-md border border-input bg-gray-400 bg-opacity-20 px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const button = "flex h-10 px-1 py-1 bg-azure text-white rounded-md justify-center items-center w-full text-xs";
  const cancelButton = "flex h-10 px-3 py-2 bg-white text-azure border border-azure rounded-md justify-center items-center w-full text-sm";
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
        position: "top-center",
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
        alert('Please select a future date for the consultation.');
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
      const response = await axios.post(`http://localhost:4000/accept/confirm`, formDataFromUser);
      

      if (response.status === 201) {
        alert('Request accepted successfully');

        await axios.delete(`http://localhost:4000/form/delete/${id}`)

        navigate('/lawyer/lawyer-schedule');
      } else {
        alert('Failed to process request');
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

  const tableHeader = "px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8";
  const tableBody = "px-2 border-x-2 border-gray-300 text-wrap text-start h-8";
  const tableBodyLong = "px-2 border-x-2 border-gray-300 text-wrap text-start overflow-y-clip h-2";
  
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData
    .slice(offset, offset + itemsPerPage)
    .map((user) => (
      <tr key={user._id} className="border-b border-gray-300">
        <td className={tableBody}>{user.firstname}</td>
        <td className={tableBody}>{user.lastname}</td>
        <td className={tableBody}>{user.email}</td>
        <td className={tableBody}>{user.address}</td>
        <td className={tableBodyLong}>{user.summary}</td>
        <td className={tableBody}>
          <Popup
            trigger={<button className={button} onClick={onCreateClick}>Accept</button>}
            modal
          >
            {close => (
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
            )}
          </Popup>
        </td>
      </tr>
    ));
  
  const mobilePageData = filteredData
  .slice(offset, offset + itemsPerPage)
  .map((user) => (
    <tr key={user._id} className="border-b border-gray-300">
      <td className={tableBody}>{user.firstname}</td>
      <td className={tableBody}>{user.lastname}</td>
      <td className="p-0">
        <Popup trigger={<div className="flex justify-center text-azure underline cursor-pointer px-0">View More</div>}
            modal
        >
          {closeCase => (
            <div className="modal relative h-auto w-96 rounded-2xl bg-bkg flex flex-col justify-center items-center p-6 text-content border border-gray-200 border-opacity-20 drop-shadow-lg gap-2">
              <div className="flex flex-row w-full gap-2">
                <div className={input} readOnly>{user.firstname}</div>
                <div className={input} readOnly>{user.lastname}</div>
              </div>

              <div className={input} readOnly>{user.email}</div>
              <div className={input} readOnly>{user.address}</div>
              <textarea className="w-full min-h-40" readOnly>{user.summary}</textarea>

                  <Popup
                      trigger={<button className={button} onClick={() => { onCreateClick(); closeCase(); }}>Accept</button>}
                      modal
                    >
                      {closeAccept => (
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
                                <button type="submit" disabled={!isMeetingIdGenerated || !isDateTimeFilled} className={button} >Submit</button>
                                <Link to="/lawyer/lawyer-request">
                                  <button type="button" className={cancelButton} onClick={closeAccept}>Cancel</button>
                                </Link>
                              </form>
                            </div>
                          </div>
                          <button className="absolute top-2 right-2" onClick={closeAccept}>
                            <IoIosCloseCircleOutline size={24} />
                          </button>
                        </div>
                      )}
                  </Popup>
                  
              <button className="absolute top-2 right-2" onClick={closeCase}>
                  <IoIosCloseCircleOutline size={24} />
              </button>
            </div>
          )}

        </Popup>
      </td>
    </tr>
  ));

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="relative z-10 w-full py-[3.875rem] flex flex-col justify-start items-start min-h-screen max-md:p-1 bg-bkg text-content">
    <div>
                  <Toaster position="bottom-center" />
                </div>
      <div id="main-content" className="flex flex-col w-full mx-auto max-w-7xl gap-3 md:pt-0 pt-14">
        <div className="flex flex-row-1 justify-between items-center mt-4">
          <h1 className="md:text-2xl text-xl font-semibold text-nowrap my-0">Request Queue</h1>
        </div>
                

        <div className="bg-bkg md:h-96 h-[30rem] overflow-x-auto">
          {/* Table on Mobile */}
          <div className="overflow-y-scroll md:hidden block">
            <table className="table-auto w-full border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-azure-200 bg-opacity-20">
                  <th className={tableHeader}>First name</th>
                  <th className={tableHeader}>Last name</th>
                  <th className={tableHeader}>More</th>
                </tr>
              </thead>

              <tbody>
                {mobilePageData}
              </tbody>
            </table>
          </div>

          {/* Table on Desktop */}
          <div className="overflow-x-auto max-w-7xl hidden md:block">
            <table className="table-auto w-full border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-azure-200 bg-opacity-20">
                  <th className={tableHeader}>First name</th>
                  <th className={tableHeader}>Last name</th>
                  <th className={tableHeader}>Email</th>
                  <th className={tableHeader}>Address</th>
                  <th className={tableHeader}>Case Summary</th>
                  <th className={tableHeader}>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentPageData}
              </tbody>

            </table>
          </div>
        </div>


         {/* <VideoCon />  */}
        <div>
          <p>Total No. of Requests: {filteredData.length}</p>
                    {/* <p>{meetingId}</p>
                    <p>{myId}</p> */}

        </div>
        

        <div className='justify-center flex'>
          <ReactPaginate
                        className="flex flex-row font-medium text-xs gap-5"
            previousLabel={'<<Previous'}
            nextLabel={'Next>>'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    </div>
  );
}

export default LawyerRequestTable;