//CSS
import "../css/nav.css";

import { useState, useEffect } from "react";

//Images and Icons
import { Link } from "react-router-dom";
import Logo from "../img/Logo.png";
import iconWhite from "../img/iconWhite.svg";
import { BsMoon } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

// Components
import Login from "./Login";

const toggle = () => {
  var element = document.body;
  element.classList.toggle("dark-mode");
};

function Navbar() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
      {/* Navigation Bar  */}
      <nav
        className={`fixed top-0 z-50 bg-white h-[3.875rem] w-full font-bold border-b-2 border-azure-500 transition-all duration-300 ${navbarHeight}`}
      >
        {/* Brand Name */}
        <div className="w-full max-w-4xl flex justify-between items-center">
          <Link to="/">
            <button onClick={scrollToTop}
                class="group w-12 hover:w-44 h-12 hover:bg-azure relative bg-azure rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl text-neutral-50 duration-700 before:duration-700 before:hover:500 font-bold flex justify-start gap-1 items-center pl-0.5"
              >
                  {/* before:absolute before:-z-10 before:left-6 before:top-6 before:w-6 before:h-6 before:bg-azure before:hover:bg-azure before:rotate-90 */}
                <img src={iconWhite} alt="Logo" style={{ height: "35px" }} />
              <span
                class="origin-left inline-flex duration-100 group-hover:duration-300 group-hover:delay-100 opacity-0 group-hover:opacity-100 pl-3 transform scale-x-0 group-hover:scale-x-100 transition-all text-4xl font-medium"
                >
                  GabAi </span>
            </button>
            
          </Link>

          

          {/* Search Bar */}
          <div className="flex flex-row items-center text-md gap-x-5">
              <div className="nav mr-10">
                <nav className="flex flex-row items-center gap-x-10 list-none ">
                  <li className="hover:scale-[1.1] transition-all duration-200 ease-in-out">
                    <a href="#home">Home</a>
                  </li>
                  <li className="hover:scale-[1.1] transition-all duration-200 ease-in-out">
                  <a href="#about">About</a>
                  </li>
                  <li className="hover:scale-[1.1] transition-all duration-200 ease-in-out">
                  <a href="#about">Features</a>
                  </li>
                  <li className="hover:scale-[1.1] transition-all duration-200 ease-in-out">
                  <a href="#about">Team</a>
                  </li>
                  <li className="hover:scale-[1.1] transition-all duration-200 ease-in-out">
                  <a href="#about">FAQs</a>
                  </li>
                </nav>
              </div>
            
            {/* Login Btn */}
            <Login />

            {/* Search Icon */}
            <Link to="/search">
              <FaSearch className="text-2xl hover:scale-[1.1] transition-all duration-200 ease-in-out" />
            </Link>

            {/* Toggle night mode */}
            


            <BsMoon className="text-2xl hover:scale-[1.1] transition-all duration-200 ease-in-out" onClick={toggle} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
