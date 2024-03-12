//CSS
import "../css/nav.css";


//AuthContext provider
import { useAuthContext } from "../hooks/useAuthContext";
import Profile from "./Profile";
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

  const { user, dispatch } = useAuthContext();

  function scrollToElement(id) {
    const element = document.querySelector(id);
    if (element) {
      const offset = 100; // Adjust this value as needed
      const elementPosition = element.offsetTop - offset;
  
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth' // Add smooth scrolling behavior
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
      {/* Navigation Bar  */}
      <nav
        className={`fixed top-0 z-50 bg-white h-[3.875rem] w-full font-bold border-b-2 border-azure-500 transition-all duration-300 ${navbarHeight}`}
      >
        {/* Brand Name */}
        <div className="w-full max-w-4xl flex justify-between items-center">
          <Link to="#home" onClick ={() => scrollToElement('#home')}>
            <button  
                class="group relative z-10 w-12 hover:w-44 h-12 hover:bg-azure-500 bg-azure-500 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl text-neutral-50 font-bold flex justify-start gap-1 items-center pl-0.5
                duration-700 before:duration-700 before:hover:500
                after:-z-20 after:absolute after:h-1 after:w-1 after:bg-azure-300 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[100] after:hover:transition-all after:hover:delay-100 after:hover:duration-700 after:transition-all after:duration-500
                "
              >
                  {/* before:absolute before:-z-10 before:left-6 before:top-6 before:w-6 before:h-6 before:bg-azure before:hover:bg-azure before:rotate-90 */}
                <img src={iconWhite} alt="Logo" style={{ height: "35px" }} />
              <span
                class="origin-left inline-flex duration-100 text-white group-hover:duration-300 group-hover:delay-100 opacity-0 group-hover:opacity-100 pl-3 transform scale-x-0 group-hover:scale-x-100 transition-all text-4xl font-medium"
                >
                  GabAi </span>
            </button>
            
          </Link>

          

          {/* Search Bar */}
          <div className="flex flex-row items-center text-md gap-x-5">
          <div className="nav mr-10">
                <nav className="flex flex-row items-center gap-x-10 list-none ">
                  <li className="hover:scale-[1.1] transition-all duration-100 ease-in-out">
                    <Link to="#home" onClick ={() => scrollToElement('#home')}>Home</Link>
                  </li>
                  <li className="hover:scale-[1.1] transition-all duration-100 ease-in-out">
                    <Link to="#about" onClick ={() => scrollToElement('#about')}>About</Link>
                  </li>
                  <li className="hover:scale-[1.1] transition-all duration-100 ease-in-out">
                    <Link to="#features" onClick ={() => scrollToElement('#features')}>Features</Link>
                  </li>
                  <li className="hover:scale-[1.1] transition-all duration-100 ease-in-out">
                    <Link to="#developers" onClick ={() => scrollToElement('#developers')}>Developers</Link>
                  </li>
                  <li className="hover:scale-[1.1] transition-all duration-100 ease-in-out">
                    <Link to="#FAQ" onClick ={() => scrollToElement('#FAQ')}>FAQs</Link>
                  </li>
                </nav>
              </div>
            
            {/* Login Btn */}
            {user ? null : <Login />}

            {/* Profile Btn */}
            {user ? <Profile />: null}

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
