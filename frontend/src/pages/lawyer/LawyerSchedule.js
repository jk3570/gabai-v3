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
    const itemsPerPage = 6; 

    const email = user.email;

    useEffect(() => {
      async function fetchRequests() {
        try {
          const response =  await fetch (`http://localhost:4000/accept/get-all-requests-lawyer/${email}`);
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
        const response = await axios.post(`http://localhost:4000/archive/create`, formDataFromUser);

        if (response.status === 201) {
           await axios.delete(`http://localhost:4000/accept/delete/${id}`)
          alert('Data moved in archive successfully');
         
          navigate('/lawyer/lawyer-archive');
        } else {
          alert('Failed to process request');
        }
      } catch (error) {
        console.error(error);
      }
    };







    const summaryStyle = "flex h-52 w-full rounded-md border bg-gray-400 bg-opacity-20 rounded-md px-3 py-2 text-xs  text-content ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
    const input = "flex h-auto w-full rounded-md border border-input bg-gray-400 bg-opacity-20 px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const button = "flex h-10 px-1 py-1 bg-azure text-white rounded-md justify-center items-center w-full text-xs  cursor-pointer";
    const cancelButton = "flex h-10 px-3 py-2 bg-white text-azure border border-azure rounded-md justify-center items-center w-full text-sm  cursor-pointer";

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
              <div className="modal relative z-10 h-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] rounded-2xl bg-bkg text-content flex flex-col justify-center items-center pt-8 p-6 gap-4">
                
              <div className='flex flex-col md:flex-row w-full gap-3'>
                {/* Case Details */}
                <div className="flex flex-col w-full gap-2">
                  <div className="font-medium text-sm">
                      Case Details
                  </div>

                  <div className="flex flex-row-1 gap-2">
                      <input type="text" className={input} placeholder="First Name" value={user.firstname} onChange={e => setFirstname(e.target.value)} readOnly />
                      <input type="text" className={input} placeholder="Last Name" value={user.lastname} onChange={e => setLastname(e.target.value)} readOnly />
                  </div>

                  <input type="email" className={input} placeholder="Email" value={user.email} onChange={e => setEmail(e.target.value)} readOnly />
                  <input type="text" className={input} placeholder="Address" value={user.address} readOnly />

                  <textarea
                      name="summary"
                      className={summaryStyle}
                      placeholder="Case Summary"
                      value={user.summary} // Use formSummary here
                      onChange={e => setFormSummary(e.target.value)} // Update formSummary state on change
                      readOnly
                  ></textarea>
                </div>  

                {/* Schedule */}
                <div className="flex flex-col w-full gap-2 justify-between">   

                  {/* Schedule Details */}
                  <div className="flex flex-col">
                  <div className="font-medium text-sm">
                      Schedule
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
                  </div>
                      
                  {/* Buttons */}
                  <div className='flex flex-col gap-2 w-full mt-7'>
                    <button className={button}>
                      <Link to={`/lawyer/video-conference/${user.meetingId}`}>Join</Link>
                    </button>
                    <button className={cancelButton} type="submit" onClick={(event) => handleSubmit(event, user)}>
                      Move to archive
                    </button>
                  </div>
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
        <div id="main-content" className="flex flex-col w-full mx-auto max-w-7xl gap-3 md:pt-0 pt-14">
          <div className="flex flex-row-1 justify-between items-center mt-4">
            <h1 className="md:text-2x text-xl font-semibold text-nowrap my-0">Lawyer Schedule</h1>
          </div>
          <form onSubmit={handleSubmit}>

          <div className="bg-bkg md:h-[30rem] h-[30rem] overflow-x-auto no-scrollbar grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
          {cardsData}
          </div>
          </form>

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

  export default LawyerSchedule;
