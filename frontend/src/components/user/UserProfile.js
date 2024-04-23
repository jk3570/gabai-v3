import React from "react";
import Popup from "reactjs-popup";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ProfileSettings from "../ProfileSettings";
import { Link } from "react-router-dom";

//AuthContext provider
import { useAuthContext } from "../../hooks/useAuthContext";
import { IoMdSettings } from "react-icons/io";

const UserProfile = () => {

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      const inputs = Array.from(event.target.form.elements);
      const currentIndex = inputs.indexOf(event.target);
      const nextIndex = currentIndex + 1;

      if (nextIndex < inputs.length) {
        inputs[nextIndex].focus();
      }
    }
  };

    const handleLogout = () => {
    // Remove user from local storage
    localStorage.removeItem("user");
    // Dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  const { user, dispatch } = useAuthContext();


  const username = user ? user.username : null;
  const email = user ? user.email : null;
  const firstname = user ? user.firstname : null;
  const lastname = user ? user.lastname : null;
  const gender = user ? user.gender : null;
  const birthdate = user ? user.birthdate : null;
  const region = user ? user.region : null;
  const city = user ? user.city : null;
  const province = user ? user.province : null;
  const barangay = user ? user.barangay : null;

/* 
  const firstname = user ? user.firstname : null;
  const lastname = user ? user.lastname : null;
  const email = user ? user.email : null;
  const username = user ? user.username : null; */

  /* Text Hierarchy */
  const label = "block font-normal text-sm"
  const input = "flex h-10 w-full rounded-md border border-input bg-bkg bg-opacity-50 px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  const button = "flex h-10 px-3 py-2 bg-azure text-white rounded-md justify-center items-center w-full text-sm hover:bg-azure-300"
  const icon = "text-xl";

  return (
    <>
      <Popup
        trigger={
                <div className="flex flex-row justify-between items-center w-full p-1 px-4 hover:bg-azure-50 hover:bg-opacity-20 cursor-pointer font-semibold leading-none ">
                  View Profile
                  <IoMdSettings className={icon}/>
                </div>
/*           <button className="bg-gray-300 rounded-full h-[2rem] w-[2rem] flex items-center justify-center">
          </button> */
        }
        modal
        nested
        
      >
        {(close) => (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg bg-opacity-25 bg-black ">
            <div className="modal relative h-[80%] w-[80%] rounded-2xl bg-bkg text-content flex flex-col pt-1 p-2">
                      <div className="absolute flex align-center p-1 inset-y-0 right-0">
                        <IoIosCloseCircleOutline
                          className="text-3xl cursor-pointer"
                          onClick={() => close()}/>
                      </div>
              
              <div className="w-full h-full flex flex-col md:flex-row gap-4 text-opacity-60 overflow-y-scroll md:overflow-y-clip no-scrollbar">
                {/* Details */}
                <div className="w-full h-full rounded-xl p-5 text-content ">
                <div className="card-body mt-8">

                    <form className="grid grid-cols-1 gap-4">
                        <div>
                            <h6 className="mb-2 text-primary text-label font-medium text-1xl">Personal Details</h6>
                            <div className="grid grid-cols-1 gap-4">
                              <div className="grid grid-cols-2 gap-4">
                                 <div>
                                    <label className={label}>Username</label>
                                    <input type="text" id="firstName" placeholder="Username" className={input} onKeyDown={handleKeyDown} value={username}/>
                                </div>
                                 <div>
                                    <label className={label}>Email</label>
                                    <input type="text" id="firstName" placeholder="Email" className={input} onKeyDown={handleKeyDown} value={email}/>
                                </div>
                                <div>
                                    <label className={label}>First Name</label>
                                    <input type="text" id="firstName" placeholder="First Name" className={input} onKeyDown={handleKeyDown} value={firstname}/>
                                </div>
                                <div>
                                    <label className={label}>Last Name</label>
                                    <input type="text" id="lastName" placeholder="Last Name" className={input} onKeyDown={handleKeyDown} value={lastname}/>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={label}>Gender</label>
                                    <select
                                          name="gender"
                                          id="gender"
                                          className={input}
                                          onKeyDown={handleKeyDown}
                                          value={gender}
                                        >
                                          <option value="">- Select Gender -</option>
                                          <option value="Male">Male</option>
                                          <option value="Female">Female</option>
                                          <option value="LGBTQ">LGBTQ</option>
                                          <option value="Prefer not to say">
                                            Prefer not to say
                                          </option>
                                        </select>
                                    {/* <input type="" id="gender" placeholder="Gender" className={input}/> */}
                                </div>
                                <div>
                                    <label className={label}>Birthdate</label>
                                    <input type="text" id="birthDate" placeholder="DD/MM/YY" className={input} onKeyDown={handleKeyDown}
                                    value={birthdate}/>
                                </div>
                              </div>

                            </div>
                        </div>

                        <div>
                            <h6 className="mb-2 text-primary text-label font-medium text-1xl">Address</h6>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label  className={label}>Region</label>
                                    <input type="text" id="Street" placeholder="Region" className={input} onKeyDown={handleKeyDown}
                                    value={region}/>
                                </div>
                                <div>
                                    <label  className={label}>Province</label>
                                    <input type="text" id="ciTy" placeholder="Province" className={input} onKeyDown={handleKeyDown}
                                    value={province}/>
                                </div>
                                <div>
                                    <label className={label}>City</label>
                                    <input type="text" id="sTate" placeholder="City" className={input} onKeyDown={handleKeyDown}
                                    value={city}/>
                                </div>
                                <div>
                                    <label className={label}>Barangay</label>
                                    <input type="text" id="zIp" placeholder="Barangay" className={input} onKeyDown={handleKeyDown}
                                    value={barangay}/>
                                </div>
                            </div>
                        </div>

                    </form>

                    <div className="flex justify-end mt-10">
                      <div className="flex w-[70%] gap-2">
                         <button id="submit" name="submit" className={button} onClick={handleLogout}>Logout</button>
                      </div>
                    </div>

                </div>  

                </div>
              </div>

              {/* <div className="flex flex-col items-center justify-center">
                <ProfileSettings></ProfileSettings>
                
                <Link to="/">
                  <button className={btnRed} onClick={handleLogout}>Log Out</button>
                </Link>
              </div> */}
            </div> {/*  main modal */}
          </div>

        )}
      </Popup>
    </>
  );
};

export default UserProfile;
