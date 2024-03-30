//CSS
import "../../css/nav.css";

//AuthContext provider
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useState, useEffect } from "react";

import ProfileDropdown from "../ProfileDropdown.js";
import UserRequests from "./UserRequests.js";

//Images and Icons
import { Link } from "react-router-dom";
import iconAzure from "../../img/iconAzure.svg";
import iconWhite from "../../img/iconWhite.svg";
import iconPlain from "../../img/iconWhite.svg";
import { BsMoon } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const toggle = () => {
    var element = document.body;
    element.classList.toggle("dark-mode");
  };




function UserNavbar() {
    const { user, dispatch } = useAuthContext();
    const location = useLocation();

return (
  <>
    <nav className="fixed top-0 z-40 bg-bkg h-[3.5rem] w-full p-[0.9rem] pb-2 font-bold border-b-2 border-azure">
    <div className="w-full flex">

      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-row w-full justify-between items-center">
          {/* Brand Logo */}
          <div className="flex justify-center items-center gap-4">        
          <Link to="/user-landingpage">
              <button class="group relative z-0 font-bold flex justify-center gap-2 items-center">
               <img src={iconAzure} alt="Logo" className="" style={{ height: "30px"}} />
                  <span class="inline-flex text-azure transform text-3xl font-bold pt-1">
                      GabAi
                  </span>
              </button>
          </Link>
          </div>

          <div className="flex flex-row items-center text-md gap-x-5 text-label">
              
              {/* Search Icon */}
              <Link to="/search">
                <div className="flex items-center justify-center p-1">
                  <FaSearch className="text-2xl hover:scale-[1.1] transition-all duration-200 ease-in-out" />
                </div>
              </Link>
              
              {/* User Requests */}
              <UserRequests className="hover:scale-[1.1] transition-all duration-200 ease-in-out"/>

              {/* Profile Btn */}
              <ProfileDropdown />
          </div>
        </div> 
      </div>
    </div>
    </nav>
  </>
    );
}

export default UserNavbar;