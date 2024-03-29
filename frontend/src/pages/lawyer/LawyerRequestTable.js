import React, { useState } from 'react';
import useUserRequestData from '../../hooks/useUserRequestData';
import ReactPaginate from 'react-paginate';
import Popup from 'reactjs-popup';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import { BaseURL } from '../../BaseURL'

const LawyerRequestTable = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  const fname = user ? user.firstname : null;
  const lname = user ? user.lastname : null;
  const lawyername = `${fname} ${lname}`;

  const { userRequestData, loading } = useUserRequestData();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    userid: '',
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    summary: '',
    time: '',
    date: '',
    lawyername: '',
  });
  const itemsPerPage = 10; 

  const input = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const button = "flex h-5 px-1 py-1 bg-azure text-white rounded-md justify-center items-center w-full text-xs";
  const cancelButton = "flex h-10 px-3 py-2 bg-white text-azure border border-azure rounded-md justify-center items-center w-full text-sm";
  const label = "block font-normal text-sm";


  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); 
  };

 const handleSubmit = async (event, user) => {
  event.preventDefault();
  try {
    const formDataFromUser = {
      userid: user.userid,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      summary: user.summary,
      time: formData.time,
      date: formData.date,
      lawyername: lawyername,
    };
    const response = await axios.post(`http://localhost:4000/accept/confirm`, formDataFromUser);

    if (response.status === 201) {
      alert('Request accepted successfully');
      navigate('/lawyer/lawyer-request');
    } else {
      alert('Failed to accept request');
    }
  } catch (error) {
    console.error(error);
  }
};

  const filteredData = userRequestData.filter((user) =>
    Object.values(user).some((field) =>
      field && field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const tableHeader = "px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8";
  const tableBody = "px-2 border-x-2 border-gray-300 text-wrap text-start h-8";

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData
    .slice(offset, offset + itemsPerPage)
    .map((user) => (
      <tr key={user.userid} className="border-b border-gray-300">
        <td className={tableBody}>{user.firstname}</td>
        <td className={tableBody}>{user.lastname}</td>
        <td className={tableBody}>{user.email}</td>
        <td className={tableBody}>{user.address}</td>
        <td className={tableBody}>{user.summary}</td>
        <td className={tableBody}>
          <Popup
            trigger={<button className={button}>Accept</button>}
            modal
          >
            {close => (
              <div className="modal relative h-auto w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] rounded-2xl bg-white flex flex-col justify-center items-center pt-7 py-10 p-6">
                <div className="w-full max-w-md bg-white rounded-lg">
                  <div className="w-full h-full grid grid-cols-1 gap-2">
                    <div className="flex flex-col justify-center">
                      <h1 className="font-bold text-3xl m-0">Schedule online consultation</h1>
                      <p className={label}>Set <span className="text-azure font-medium">time</span> and <span className="text-azure font-medium">meeting</span></p>
                    </div>
                    <form onSubmit={(event) => { event.preventDefault(); handleSubmit(event, user); }} className="flex flex-col gap-2">
                      <input type="date" className={input} placeholder="Date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                      <input type="time" className={input} placeholder="Time" onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
                      <button type="submit" className={button}>Submit</button>
                      <Link to="/lawyer/lawyer-request">
                        <button type="button" className={cancelButton}>Cancel</button>
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

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="relative z-10 w-full py-[3.875rem] flex flex-col justify-start items-start min-h-screen max-md:p-1">
      <div id="main-content" className="flex flex-col w-full mx-auto max-w-7xl gap-3">
        <div className="flex flex-row-1 justify-between items-center mt-4">
          <h1 className="text-2xl font-semibold text-nowrap">Request Queue</h1>
        </div>
        
        <div className="bg-white h-96 overflow-x-auto">
          <div className="overflow-x-auto max-w-7xl">
            <table className="table-auto w-full border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-gray-200">
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

export default LawyerRequestTable;
