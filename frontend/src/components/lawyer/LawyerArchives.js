import React, { useState } from 'react';
import useUserData from '../../hooks/useUserData';
import ReactPaginate from 'react-paginate';


const LawyerArchives = () => {
  const { userData, loading } = useUserData();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const itemsPerPage = 10; // Number of items per page

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to update user data
    setEditing(false);
  };

  // Filtered data based on search term
  const filteredData = userData.filter((user) =>
    Object.values(user).some((field) =>
      field && field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const tableHeader = "px-2 py-1 border-x-2 border-gray-300 text-nowrap text-start h-8"
  const tableBody = "px-2 border-x-2 border-gray-300 text-wrap text-start h-8"

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData
    .slice(offset, offset + itemsPerPage)
    .map((user) => (
      <tr key={user._id} className="border-b border-gray-300">
        <td className={tableBody}>{user.firstname}</td>
        <td className={tableBody}>{user.lastname}</td>
        <td className={tableBody}>{user.username}</td>
        <td className={tableBody}>{user.email}</td>
        <td className={tableBody}>{user.gender}</td>
        <td className={tableBody}>{user.birthdate}</td>
        <td className={tableBody}>{user.region}</td>
        <td className={tableBody}>{user.province}</td>
        <td className={tableBody}>{user.city}</td>
        <td className={tableBody}>{user.barangay}</td>
        <td className={tableBody}>{user.role}</td>
        <td className={tableBody}>
          <button onClick={() => handleEdit(user)}>Edit</button>
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="relative z-10 w-full py-[3.875rem] flex flex-col justify-start items-start min-h-screen max-md:p-1 bg-bkg text-content">
      <div id="main-content" className="flex flex-col w-full mx-auto max-w-7xl gap-3">
      <div className="flex flex-row-1 justify-between items-center mt-4">

        <h1 className="text-2xl font-semibold text-nowrap">Archived Cases</h1>

        {/* search field */}
        <div className="flex flex-row-1 justify-end items-end w-full">
            <div className="w-64 relative">
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
      <div className="bg-bkg h-96 overflow-x-auto">
      <div className="overflow-x-auto max-w-7xl">
        <table className="table-auto w-full border-collapse border border-gray-200 text-xs">
          <thead>
            <tr className="bg-azure-200 bg-opacity-20 ">
              <th className={tableHeader}>First name</th>
              <th className={tableHeader}>Last name</th>
              <th className={tableHeader}>Username</th>
              <th className={tableHeader}>Email</th>
              <th className={tableHeader}>Gender</th>
              <th className={tableHeader}>Birthdate</th>
              <th className={tableHeader}>Region</th>
              <th className={tableHeader}>Province</th>
              <th className={tableHeader}>City</th>
              <th className={tableHeader}>Barangay</th>
              <th className={tableHeader}>Role</th>
              <th className={tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData}
            {editing && editingUser && (
              <tr>
                <td colSpan="11">
                  <form onSubmit={handleSubmit}>
                    {/* Inputs for editing user data */}
                    {/* Example input: <input type="text" value={editingUser.firstname} onChange={(e) => setEditingUser({...editingUser, firstname: e.target.value})} /> */}
                    <button type="submit">Save</button>
                  </form>
                </td>
              </tr>
            )}
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
