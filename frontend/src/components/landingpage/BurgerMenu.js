import Popup from "reactjs-popup";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Login from "../Login";


const BurgerMenu = () => {

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

  const navList = "p-5 py-2 w-full hover:bg-azure-50 hover:bg-opacity-20"

  return( 
        <div  id="sidebar" 
              className="relative z-40 h-screen border bg-bkg flex flex-col transition duration-200 shadow-lg">
    
            {/* Top area */}
            <div className="text-content text-2xl">
              <div className="relative z-50 flex left-0 h-[3.875rem] w-full border-b-2 border-white hover:bg-azure-50 hover:bg-opacity-20 p-[0.9rem] pl-1">
              </div>
  
              <div className="flex flex-col justify-between h-full w-full">
                {/* Navigation Area */}
                <nav className="flex flex-col items-start text-content font-normal gap-2 mt-2">
                      <Link className={navList} to="/#home" onClick={() => scrollToElement("#home")}>
                      Home
                      </Link>

                      <Link className={navList} to="/#about" onClick={() => scrollToElement("#about")}>
                      About
                      </Link>

                      <Link className={navList} to="/#features" onClick={() => scrollToElement("#features")}>
                      Features
                      </Link>

                      <Link className={navList} to="/#developers" onClick={() => scrollToElement("#developers")}>
                      Developers
                      </Link>

                      <Link className={navList} to="/#FAQ" onClick={() => scrollToElement("#FAQ")}>
                      FAQs
                      </Link>
                </nav>
              
                <div className="mx-5">
                <button className="relative flex h-10 w-full px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-xl transition-all duration-100 ease-in-out hover:bg-azure-300">
                <Login />
                </button>
                </div>
              </div>

            </div>
          </div>
  );
};

export default BurgerMenu;
