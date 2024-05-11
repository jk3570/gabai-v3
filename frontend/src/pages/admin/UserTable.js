import React, { useState } from 'react';
import useUserData from '../../hooks/useUserData';
import ReactPaginate from 'react-paginate';
import Popup from 'reactjs-popup';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom'; 
import CreateAccount from "../../components/CreateAccount"
import { useAuthContext } from '../../hooks/useAuthContext';
import { format } from "date-fns";

const UserTable = () => {
  
  const { user, dispatch } = useAuthContext();
  const { userData, loading } = useUserData();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const itemsPerPage = 10; // Number of items per page

  
  const input = "flex h-auto w-full rounded-md border border-input bg-gray-400 bg-opacity-20 px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const button = "flex h-10 px-2 py-1 bg-azure text-white rounded-md justify-center items-center w-full text-xs cursor-pointer";
  const cancelButton = "flex h-10 px-3 py-2 bg-white text-azure border border-azure rounded-md justify-center items-center w-full text-sm";
  const label = "block font-normal text-sm";

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

  const cardsData = filteredData
  .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  .map((user) => (
    <div key={user._id} className="relative w-full h-fit flex flex-row bg-gray-200 bg-opacity-20 justify-between hover:bg-azure-50 hover:bg-opacity-10 p-3 text-sm text-content rounded-md border border-gray-400 border-opacity-20 shadow-md hover:-translate-y-1">
    <div className="flex flex-col w-full justify-between">
      <div className="font-bold text-content">
      {user.firstname} {user.lastname}
      </div>
      <div className="font-semibold text-label">{user.role}</div>
      <div>{user.email}</div>
      <div className='flex w-full flex-row gap-2 mt-6'>
        <Popup trigger={<div className={button}>Account Details</div>
        }
            modal>
        {closeForm => (
          <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={closeForm}>
            <div className="modal relative z-10 h-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] rounded-2xl bg-bkg text-content flex flex-col justify-center items-center pt-5 p-4 gap-4">
              
            <div className="w-full h-full flex flex-col md:flex-row gap-4 text-opacity-60 overflow-y-scroll no-scrollbar">
                {/* Details */}
                <div className="w-full h-full rounded-xl p-5 text-content ">
                <div className="card-body">

                    <form className="grid grid-cols-1 gap-4">
                        <div>
                            <h6 className="mb-2 text-primary text-label font-medium text-md italic">Role: {user.role}</h6>
                            <h6 className="mb-2 text-primary text-label font-medium text-1xl">Personal Details</h6>
                            <div className="grid grid-cols-1 gap-4">
                              <div className="grid grid-cols-2 gap-4">
                                 <div>
                                    <label className={label}>Username</label>
                                    <input type="text" id="firstName" placeholder="Username" className={input} value={user.username} readOnly/>
                                </div>
                                 <div>
                                    <label className={label}>Email</label>
                                    <input type="text" id="firstName" placeholder="Email" className={input} value={user.email} readOnly/>
                                </div>
                                <div>
                                    <label className={label}>First Name</label>
                                    <input type="text" id="firstName" placeholder="First Name" className={input} value={user.firstname} readOnly/>
                                </div>
                                <div>
                                    <label className={label}>Last Name</label>
                                    <input type="text" id="lastName" placeholder="Last Name" className={input} value={user.lastname} readOnly/>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={label}>Gender</label>
                                    <input 
                                          name="gender"
                                          id="gender"
                                          type="text"
                                          className={input}
                                          readOnly
                                          value={user.gender}
                                       
                                        />
                                    {/* <input type="" id="gender" placeholder="Gender" className={input}/> */}
                                </div>
                                <div>
                                    <label className={label}>Birthdate</label>
                                    <input type="text" id="birthDate" placeholder="DD/MM/YY" className={input}
                                     value= {format(
                                      new Date(user.birthdate ?? ""),
                                      "MMMM dd, yyyy"
                                      )} readOnly/>

                                 
                                </div>
                              </div>

                            </div>
                        </div>

                        <div>
                            <h6 className="mb-2 text-primary text-label font-medium text-1xl">Address</h6>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label  className={label}>Region</label>
                                    <input type="text" id="Street" placeholder="Region" className={input}
                                    value={user.region} readOnly/>
                                </div>
                                <div>
                                    <label  className={label}>Province</label>
                                    <input type="text" id="ciTy" placeholder="Province" className={input}
                                    value={user.province} readOnly/>
                                </div>
                                <div>
                                    <label className={label}>City</label>
                                    <input type="text" id="sTate" placeholder="City" className={input}
                                    value={user.city} readOnly/>
                                </div>
                                <div>
                                    <label className={label}>Barangay</label>
                                    <input type="text" id="zIp" placeholder="Barangay" className={input}
                                    value={user.barangay} readOnly/>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>  

                </div>
              </div>

              <button className="absolute top-2 right-2">
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

  const   pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };


  return (
    <div className="relative z-10 w-full py-[3.875rem] flex flex-col justify-start items-start min-h-screen max-md:p-1 bg-bkg text-content">
      <div id="main-content" className="flex flex-col w-full mx-auto max-w-5xl gap-3 md:pt-0 pt-14">
        <div className="flex md:flex-row flex-col justify-center items-start mt-4 gap-2">
        <div className='flex justify-between items-center w-full'> 
          <h1 className="md:text-2xl text-xl font-semibold text-nowrap my-0">User List</h1>
          <div className='w-fit block md:hidden'>
            <Link to="/#create-account" className={button}><CreateAccount /></Link>
          </div>          
        </div>

        {/* search field */}
        <div className="flex flex-col md:flex-row justify-end items-end w-full gap-2">
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
        
            <div className='w-fit hidden md:block'>
            <Link to="/#create-account" className={button}><CreateAccount /></Link>
            </div> 
        </div>


      </div>
          

      <div className="bg-bkg md:h-[30rem] h-[30rem] overflow-x-auto grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
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
};

export default UserTable;