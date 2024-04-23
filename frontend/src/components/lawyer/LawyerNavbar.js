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
    <nav className="fixed top-0 z-40 h-[3.875rem] w-full p-[1rem] font-bold border-b-2 border-azure-500 gap-10  bg-bkg text-label justify-between">
    <LawyerSidebar />
        <div className="flex justify-center items-center gap-2">
        {/* Brand Logo */}
        <Link to="/lawyer" class="group relative z-0 font-bold flex justify-center gap-2 items-center">
          <img src={iconAzure} alt="Logo" class="" style={{ height: "30px" }} />
              <span class="inline-flex  text-azure-500 transform text-3xl font-bold pt-1">
                GabAi
              </span>
        </Link>
        </div>
        
        {/* Profile Btn */}
        <ProfileDropdown />
    </nav>
  </>
    );
}

export default LawyerNavbar;