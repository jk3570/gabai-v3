import React, { useState } from 'react';
import useUserData from '../../hooks/useUserData';
import ReactPaginate from 'react-paginate';

const UserTable = () => {
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

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData
    .slice(offset, offset + itemsPerPage)
    .map((user) => (
      <tr key={user._id} className="border-b border-gray-300">
        <td className="px-4 py-2">{user.firstname}</td>
        <td className="px-4 py-2">{user.lastname}</td>
        <td className="px-4 py-2">{user.username}</td>
        <td className="px-4 py-2">{user.email}</td>
        <td className="px-4 py-2">{user.gender}</td>
        <td className="px-4 py-2">{user.birthdate}</td>
        <td className="px-4 py-2">{user.region}</td>
        <td className="px-4 py-2">{user.province}</td>
        <td className="px-4 py-2">{user.city}</td>
        <td className="px-4 py-2">{user.barangay}</td>
        <td className="px-4 py-2">{user.role}</td>
        <td className="px-4 py-2">
          <button onClick={() => handleEdit(user)}>Edit</button>
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Data Table</h2>

      {/* search field */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
      />

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300" style={{ margin: '20px' }}>
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">First name</th>
              <th className="px-4 py-2">Last name</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">Birthdate</th>
              <th className="px-4 py-2">Region</th>
              <th className="px-4 py-2">Province</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Barangay</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
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
      <p>Total No. of Users: {filteredData.length}</p>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default UserTable;
