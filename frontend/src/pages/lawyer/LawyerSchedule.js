  // Frontend: LawyerRequestTable.js

  import React, { useState, useEffect } from 'react';
  import ReactPaginate from 'react-paginate';
  import axios from 'axios';
  import { Link, useNavigate } from 'react-router-dom'; 
  import { useAuthContext } from "../../hooks/useAuthContext";
  import useAcceptedRequest from '../../hooks/useAcceptedRequest';
  import { BaseURL } from "../../BaseURL"
  import Popup from 'reactjs-popup';
  import { IoIosCloseCircleOutline } from 'react-icons/io';
  import { format } from "date-fns";
  import { useReducer } from 'react';

  const LawyerSchedule = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [requestData, setRequestData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10; 

    const email = user.email;

    useEffect(() => {
      async function fetchRequests() {
        try {
          const response =  await fetch (`${BaseURL}/accept/get-all-requests-lawyer/${email}`);
          //  console.log("Response Data:", response.data); 
          const data = await response.json();
          //  console.log("User email:", user.email); 
          setRequestData(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching requests:', error);
        }
      };

      fetchRequests();  
    }, [email]);

  const handleSubmit = async (event, user) => {
      event.preventDefault();

      const id = user.userid;
      console.log(id);

      try {
        const formDataFromUser = {
          userid: user.userid,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          address: user.address,
          summary: user.summary,
          time: user.time,
          date: user.date,
          lawyername: user.lawyername,
        };
        
        console.log(`this is the data ${formDataFromUser} `)
        const response = await axios.post(`${BaseURL}/archive/create`, formDataFromUser);

        if (response.status === 201) {
           await axios.delete(`${BaseURL}/accept/delete/${id}`)
          alert('Data moved in archive successfully');
         
          navigate('/lawyer/lawyer-archive');
        } else {
          alert('Failed to process request');
        }
      } catch (error) {
        console.error(error);
      }
    };







    const tableHeader = "px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8";
    const tableBody = "px-2 border-x-2 border-gray-300 text-wrap text-start h-8";
    const input = "flex h-auto w-full rounded-md border border-input bg-gray-400 bg-opacity-20 px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const button = "flex h-10 px-1 py-1 bg-azure text-white rounded-md justify-center items-center w-full text-xs";
    const cancelButton = "flex h-10 px-3 py-2 bg-white text-azure border border-azure rounded-md justify-center items-center w-full text-sm";

    //====
    if (loading) {
      return <div>Loading...</div>;
    }

    // Filtered data based on search term
    const filteredData = requestData.filter((user) =>
      Object.values(user).some((field) =>
        field && field.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    // Pagination logic
    const offset = currentPage * itemsPerPage;
    const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageClick = ({ selected: selectedPage }) => {
      setCurrentPage(selectedPage);
    };  

    return (
      <div className="relative z-10 w-full py-[3.875rem] flex flex-col justify-start items-start min-h-screen max-md:p-1 bg-bkg text-content">
        <div id="main-content" className="flex flex-col w-full mx-auto max-w-7xl gap-3 md:pt-0 pt-14">
          <div className="flex flex-row-1 justify-between items-center mt-4">
            <h1 className="md:text-2x text-xl font-semibold text-nowrap my-0">Lawyer Schedule</h1>
          </div>
          <form onSubmit={handleSubmit}>
          
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
                {currentPageData.map((user) => (
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

                              <div className="flex w-full border-b border-gray-400"></div>

                              <div className="flex flex-row w-full gap-2">
                                <div className={input} readOnly>{user.date}</div>
                                <div className={input} readOnly>{user.time}</div>
                              </div>

                              <div className={input} readOnly>{user.lawyername}</div>

                              <div className='flex flex-row gap-2 w-full mt-7'>
                                <button className={button}>
                                  <Link to={`/lawyer/video-conference/${user.meetingId}`}>Join</Link>
                                </button>
                                <button className={cancelButton} type="submit" onClick={(event) => handleSubmit(event, user)}>
                                  Move to archive
                                </button>
                              </div>

                              <button className="absolute top-2 right-2" onClick={closeCase}>
                                  <IoIosCloseCircleOutline size={24} />
                              </button>
                            </div>
                          )}

                        </Popup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table on Desktop */}
            <div className="overflow-x-auto max-w-7xl hidden md:block">
              <table className="table-auto w-full border-collapse border border-gray-200 text-xs">
                <thead>
                  <tr className="bg-azure-200 bg-opacity-20 ">
                    <th className="px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8">First name</th>
                    <th className="px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8">Last name</th>
                    <th className="px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8">Email</th>
                    <th className="px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8">Address</th>
                    <th className="px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8">Case Summary</th>
                    <th className="px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8">Time</th>
                    <th className="px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8">Date</th>
                    <th className="px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8">Lawyer name</th>
                    <th className="px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((user) => (
                    <tr key={user.userid} className="border-b border-gray-300">
                      <td className="px-2 border-x-2 border-gray-300 text-wrap text-start h-8">{user.firstname}</td>
                      <td className="px-2 border-x-2 border-gray-300 text-wrap text-start h-8">{user.lastname}</td>
                      <td className="px-2 border-x-2 border-gray-300 text-wrap text-start h-8">{user.email}</td>
                      <td className="px-2 border-x-2 border-gray-300 text-wrap text-start h-8">{user.address}</td>
                      <td className="px-2 border-x-2 border-gray-300 text-wrap text-start h-8">{user.summary}</td>
                      <td className="px-2 border-x-2 border-gray-300 text-wrap text-start h-8"> {(() => {
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
                                  })()}</td>
                      <td className="px-2 border-x-2 border-gray-300 text-wrap text-start h-8">        {format(
                                    new Date(user.date ?? ""),
                                    "MMMM dd, yyyy"
                                  )}</td>
                      <td className="px-2 border-x-2 border-gray-300 text-wrap text-start h-8">{user.lawyername}</td>
                      <td className="px-2 border-x-2 border-gray-300 text-wrap text-start h-8">
                        <div className='flex flex-row gap-2'>
                        
                        <button className="flex h-5 px-1 py-1 bg-azure text-white rounded-md justify-center items-center w-full text-xs">
                          <Link to={`/lawyer/video-conference/${user.meetingId}`}>Join</Link>
                        </button>
                        <button className="flex h-5 px-1 py-1 bg-white border border-azure text-azure rounded-md justify-center items-center w-full text-xs" 
        type="submit"
        onClick={(event) => handleSubmit(event, user)}>
  Move to archive
</button>

                        </div>


                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </form>
          
          <div>
            <p>Total No. of Requests: {filteredData.length}</p>
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

  export default LawyerSchedule;
