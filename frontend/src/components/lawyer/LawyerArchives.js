import React, { useState } from 'react';
import useUserRequestData from '../../hooks/useUserRequestData';
import useUserData from '../../hooks/useUserData';
import ReactPaginate from 'react-paginate';
import Popup from 'reactjs-popup';

import { IoIosCloseCircleOutline } from 'react-icons/io';

const LawyerArchives = () => {
  const { userData, loading } = useUserData();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const itemsPerPage = 10; // Number of items per page

  const { userRequestData} = useUserRequestData();

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset to first page when searching
  };

  const handleEdit = (user) => {
    setEditing(true);
    setEditingUser(user);
  };

  // Filtered data based on search term
  const filteredData = userRequestData.filter((user) =>
    Object.values(user).some((field) =>
      field && field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const input = "flex h-auto w-full rounded-md border border-input bg-gray-400 bg-opacity-20 px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const button = "flex h-10 px-1 py-1 bg-azure text-white rounded-md justify-center items-center w-full text-xs";
  const cancelButton = "flex h-10 px-3 py-2 bg-white text-azure border border-azure rounded-md justify-center items-center w-full text-sm";
  const label = "block font-normal text-sm";
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
        {/* <td className={tableBody}>
          <Popup
            trigger={<button className={button}>Accept</button>}
            modal
          >
            {close => (
              <div>
                <button className="absolute top-2 right-2" onClick={close}>
                  <IoIosCloseCircleOutline size={24} />
                </button>
              </div>
            )}
          </Popup>
        </td> */}
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
                      trigger={<button className={button} onClick={() => { closeCase(); }}>Accept</button>}
                      modal
                    >
                      {closeAccept => (
                        <div className="modal relative h-auto w-96 rounded-2xl bg-bkg flex flex-col justify-center items-center pt-7 py-10 p-6 text-content border border-gray-200 border-opacity-20 drop-shadow-lg">
                          <div className="w-full max-w-md bg-bkg rounded-lg">
                            <div className="w-full h-full grid grid-cols-1 gap-2">
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
      <div id="main-content" className="flex flex-col w-full mx-auto max-w-7xl gap-3 md:pt-0 pt-14">
        <div className="flex md:flex-row flex-col justify-start items-start mt-4 ">
          <h1 className="md:text-2xl text-xl font-semibold text-nowrap my-0 ">Archived Cases</h1>

        {/* search field */}
        <div className="flex flex-row justify-end items-end w-full">
            <div className="md:w-64 w-full relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="relative px-4 py-2 w-full border bg-azure-200 bg-opacity-20 border-gray-300 rounded-md text-xs"
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
          

      {/* Full Table */}
      <div className="bg-bkg md:h-96 h-[30rem] overflow-x-auto">
          {/* Table on Mobile */}
          <div className="overflow-y-scroll md:hidden block">
            <table className="table-auto w-full border-collapse border border-gray-200 text-xs">
              <thead>
                <tr className="bg-azure-200 bg-opacity-20">
                  <th className={tableHeader}>Case Names</th>
                  <th className={tableHeader}></th>
                  <th className={tableHeader}></th>
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
                  {/* <th className={tableHeader}>Action</th> */}
                </tr>
              </thead>

              <tbody>
                {currentPageData}
              </tbody>

            </table>
          </div>
        </div>
      
      <div>
        <p>Total No. of Users: {filteredData.length}</p>
      </div>

      {/* Pagination */}
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

export default LawyerArchives;
