//CSS
import "../../css/nav.css";

//AuthContext provider
import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useState, useEffect } from "react";

//Images and Icons
import { Link } from "react-router-dom";
import iconAzure from "../../img/iconAzure.svg";
import { BsMoon } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import ProfileDropdown from "../ProfileDropdown.js";
import LawyerSidebar from "../../pages/lawyer/LawyerSidebar.js";

const toggle = () => {
    var element = document.body;
    element.classList.toggle("dark-mode");
  };




function LawyerNavbar() {
  const { user, dispatch } = useAuthContext();
  const location = useLocation();
return (
  <>
    <nav className="fixed top-0 z-40 h-[3.875rem] w-full p-[1rem] font-bold border-b-2 border-azure-500 gap-10  bg-bkg text-label">
    <LawyerSidebar />
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
        

        {/* Brand Logo */}
        <button class="group relative z-0 font-bold flex justify-center gap-2 items-center">
          <img src={iconAzure} alt="Logo" class="" style={{ height: "30px" }} />
              <span class="inline-flex  text-azure-500 transform text-3xl font-bold pt-1">
                GabAi
              </span>
        </button>
        </div>

        <div className="flex flex-row items-center text-md gap-x-5">
            {/* Search Icon */}
            <Link to="/search">
              <div className="flex items-center justify-center p-1">
                <FaSearch className="text-2xl hover:scale-[1.1] transition-all duration-200 ease-in-out" />
              </div>
            </Link>

            {/* Toggle night mode */}
{/*             <BsMoon
              className="text-2xl hover:scale-[1.1] transition-all duration-200 ease-in-out"
              onClick={toggle}
            /> */}

            {/* Profile Btn */}
            <ProfileDropdown />
        </div>
      </div>
    </nav>
  </>
    );
}

export default LawyerNavbar;