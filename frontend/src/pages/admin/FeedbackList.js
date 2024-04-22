// Frontend: LawyerRequestTable.js

import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuthContext } from "../../hooks/useAuthContext";
import useAcceptedRequest from '../../hooks/useAcceptedRequest';

const LawyerSchedule = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10; 

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch (`http://localhost:4000/feedback/get-all-feedbacks`);
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
  }, []);




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
      <div id="main-content" className="flex flex-col w-full mx-auto max-w-7xl gap-3">
        <div className="flex flex-row-1 justify-between items-center mt-4">
          <h1 className="text-2xl font-semibold text-nowrap">Feedbacks</h1>
        </div>
        
        <div className="bg-bkg h-96 overflow-x-auto">
          <div className="overflow-x-auto max-w-7xl">
            <table className="table-auto w-full border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-azure-200 bg-opacity-20 ">
                  <th className="px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8">Email</th>
                  <th className="px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8">Message</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((user) => (
                  <tr key={user.userid} className="border-b border-gray-300">
                    <td className="px-2 border-x-2 border-gray-300 text-wrap text-start h-8">{user.email}</td>
                    <td className="px-2 border-x-2 border-gray-300 text-wrap text-start h-8">{user.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <p>Total No. of Feedbacks: {filteredData.length}</p>
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
