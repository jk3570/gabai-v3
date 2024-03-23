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
  
    useEffect(() => {
      // Function to scroll to the appropriate section based on the current location
      const scrollToCurrentLocation = () => {
        const hash = location.hash;
        if (hash) {
          const element = document.querySelector(hash);
          if (element) {
            const offset = 100; // Adjust this value as needed
            const elementPosition = element.offsetTop - offset;
  
            window.scrollTo({
              top: elementPosition,
              behavior: "smooth",
            });
          }
        } else {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      };
  
      // Scroll to the appropriate section when the location changes
      scrollToCurrentLocation();
    }, [location]);
  
    function scrollToElement(id) {
      const element = document.querySelector(id);
      if (element) {
        const offset = 100; // Adjust this value as needed
        const elementPosition = element.offsetTop - offset;
  
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth", // Add smooth scrolling behavior
        });
      }
    }
  
    const [navbarHeight, setNavbarHeight] = useState("py-10"); // Initial navbar padding
  
    useEffect(() => {
      const handleScroll = () => {
        // Check the scroll position
        if (window.scrollY > 50) {
          // If scrolled down, update navbar padding
          setNavbarHeight("py-5");
        } else {
          // If scrolled to the top, revert to original navbar padding
          setNavbarHeight("py-10");
        }
      };
  
      // Add scroll event listener when component mounts
      window.addEventListener("scroll", handleScroll);
  
      // Clean up the event listener when component unmounts
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

return (
  <>
    <nav className="fixed top-0 z-40 bg-white h-[3.875rem] w-full p-[1rem] font-bold border-b-2 border-azure-500">
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
        
        {/* Brand Logo */}
        <Link to="/#home" onClick={() => scrollToElement("#home")}>
            <button class="group relative z-0 font-bold flex justify-center gap-2 items-center">
            <img src={iconAzure} alt="Logo" class="" style={{ height: "30px" }} />
                <span class="inline-flex  text-azure-500 transform text-3xl font-bold pt-1">
                    GabAi
                </span>
            </button>
        </Link>
        </div>

        <div className="flex flex-row items-center text-md gap-x-5">
            <div className="nav mr-8">
              <nav className="flex flex-row items-center gap-x-10 list-none ">
                <li className="hover:scale-[1.1] transition-all duration-100 ease-in-out">
                  <Link to="/#home" onClick={() => scrollToElement("#home")}>
                    Home
                  </Link>
                </li>
                <li className="hover:scale-[1.1] transition-all duration-100 ease-in-out">
                  <Link to="/user   /#about" onClick={() => scrollToElement("#about")}>
                    About
                  </Link>
                </li>
                <li className="hover:scale-[1.1] transition-all duration-100 ease-in-out">
                  <Link
                    to="/#features"
                    onClick={() => scrollToElement("#features")}
                  >
                    Features
                  </Link>
                </li>
                <li className="hover:scale-[1.1] transition-all duration-100 ease-in-out">
                  <Link
                    to="/#developers"
                    onClick={() => scrollToElement("#developers")}
                  >
                    Developers
                  </Link>
                </li>
                <li className="hover:scale-[1.1] transition-all duration-100 ease-in-out">
                  <Link to="/#FAQ" onClick={() => scrollToElement("#FAQ")}>
                    FAQs
                  </Link>
                </li>
              </nav>
            </div>
            
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
            
            {/* User Requests */}
            <UserRequests className="hover:scale-[1.1] transition-all duration-200 ease-in-out"/>

            {/* Profile Btn */}
            <ProfileDropdown />
        </div>

      </div>
    </nav>
  </>
    );
}

export default UserNavbar;