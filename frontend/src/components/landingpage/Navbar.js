//CSS
import "../../css/nav.css";

//AuthContext provider
import { useAuthContext } from "../../hooks/useAuthContext";
import Profile from "../user/UserProfile";
import { useState, useEffect } from "react";

//Images and Icons
import { Link } from "react-router-dom";
import iconWhite from "../../img/iconWhite.svg";
import { BsMoon, BsSun  } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import BurgerMenu from "./BurgerMenu";

// Components
import Login from "../Login";
import { dark } from "@mui/material/styles/createPalette";


function Navbar() {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);


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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
        className={`fixed top-0 z-50 bg-bkg text-content h-[3.875rem] w-screen md:w-full font-bold border-b-2 border-azure-500 transition-all duration-300 md:${navbarHeight}`}
      >

      {/* Sidebar of Burger */}
      <div className={`fixed z-40 top-0 left-0 flex w-${sidebarOpen ? 'full' : '0'} h-${sidebarOpen ? 'screen' : '0'} transition-all  -translate-y-[0.1rem]`} onClick={toggleSidebar}>
        <div 
          className={`transition-all overflow-hidden w-${sidebarOpen ? '64' : '0'} transition-all h-full bg-bkg z-50 shadow-lg left-0 top-0`} onClick={toggleSidebar}>
        <BurgerMenu />
        </div>         
      </div>
    
        <div className="w-full max-w-4xl flex justify-between items-center px-3">
          {/* Brand Logo */}
          <Link to="/" onClick={() => scrollToElement("#home")} className="hidden md:block">
            <button
              class="group relative z-10 w-12 hover:w-44 h-12 hover:bg-azure-500 bg-azure-500 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl text-neutral-50 font-bold flex justify-start gap-1 items-center pl-0.5
                duration-700 before:duration-700 before:hover:500
                after:-z-20 after:absolute after:h-1 after:w-1 after:bg-azure-300 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[100] after:hover:transition-all after:hover:delay-100 after:hover:duration-700 after:transition-all after:duration-500
                "
            >
              <img src={iconWhite} alt="Logo" style={{ height: "35px" }} />
              <span class="origin-left inline-flex duration-100 text-white group-hover:duration-300 group-hover:delay-100 opacity-0 group-hover:opacity-100 pl-3 transform scale-x-0 group-hover:scale-x-100 transition-all text-4xl font-medium">
                GabAi
              </span>
            </button>
          </Link>

          {/* Burger Menu */}
          <div className="flex z-50 text-label items-center justify-center text-2xl hover:scale-[1.1] transition-all duration-200 ease-in-out md:hidden" onClick={toggleSidebar}>
          {sidebarOpen ? 
          <IoCloseSharp className="text-3xl"/> : 
          <GiHamburgerMenu/>}
          </div>

          {/* Search Bar */}
          <div className="flex flex-row items-center text-md gap-x-2 md:gap-x-5 text-label px-1">
            <div className="nav mr-10">

              {/* Scroll navigate */}
              <nav className="flex-row items-center gap-x-10 list-none text-label hidden md:flex">
                <li className="hover:scale-[1.1] transition-all duration-100 ease-in-out">
                  <Link to="/#home" onClick={() => scrollToElement("#home")}>
                    Home
                  </Link>
                </li>
                <li className="hover:scale-[1.1] transition-all duration-100 ease-in-out">
                  <Link to="/#about" onClick={() => scrollToElement("#about")}>
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

            {/* Toggle night mode */}
            <button onClick={toggleTheme} className="text-2xl hover:scale-[1.1] transition-all duration-200 ease-in-out p-1">
              {theme === 'light' ? <BsMoon /> : <BsSun />}
            </button>

            {/* Search Icon */}
            <Link to="/search">
              <FaSearch className="text-2xl hover:scale-[1.1] transition-all duration-200 ease-in-out" />
            </Link>

            {/* Login Btn */}
            <Link to="/#login" className="rounded-xl bg-azure-500 p-4 py-1.5 text-white hover:scale-[1.1] transition-all duration-100 ease-in-out relative z-10 after:absolute after:-z-20  after:h-1 after:w-1 after:bg-azure-300 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[50] after:hover:transition-all after:hover:duration-650 after:transition-all after:duration-300 hidden md:block">
              <Login />
            </Link>

          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
