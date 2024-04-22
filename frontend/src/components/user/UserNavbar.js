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
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import UserBurgerMenu from "./UserBurgerMenu.js";

const toggle = () => {
    var element = document.body;
    element.classList.toggle("dark-mode");
  };




function UserNavbar() {
    const { user, dispatch } = useAuthContext();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

return (
  <>
    <nav className="fixed top-0 z-40 bg-bkg h-[3.875rem] w-screen p-[0.9rem] font-bold border-b-2 border-azure text-label">
    <div className="w-full flex">

      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-row w-full justify-between items-center">

      {/* Sidebar of Burger */}
      <div className={`fixed z-40 top-0 left-0 flex w-${sidebarOpen ? 'full' : '0'} h-${sidebarOpen ? 'screen' : '0'} transition-all  -translate-y-[0.1rem]`} onClick={toggleSidebar}>
        <div 
          className={`transition-all overflow-hidden ${sidebarOpen ? 'w-[330px]' : 'w-0'} transition-all h-full bg-bkg z-50 shadow-lg left-0 top-0`} onClick={toggleSidebar}>
        <UserBurgerMenu />
        </div>         
      </div>

          {/* Burger Menu */}
          <div className="flex z-50 text-label items-center justify-center text-2xl hover:scale-[1.1] transition-all duration-200 ease-in-out md:hidden" onClick={toggleSidebar}>
          {sidebarOpen ? 
          <IoCloseSharp className="text-3xl"/> : 
          <GiHamburgerMenu/>}
          </div>


          {/* Brand Logo */}
          <div className="flex justify-center items-center gap-4">        
          <Link to="/user">
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
              <Link to="/search" className="hidden md:block">
                <div className="flex items-center justify-center p-1">
                  <FaSearch className="text-2xl hover:scale-[1.1] transition-all duration-200 ease-in-out" />
                </div>
              </Link>
              
              {/* User Requests */}
              <div className="hidden md:block">
              <UserRequests className="hover:scale-[1.1] transition-all duration-200 ease-in-out"/>
              </div>

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