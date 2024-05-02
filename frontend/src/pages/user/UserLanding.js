// Modules
import { useAuthContext } from "../../hooks/useAuthContext";
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

// Components
import UserSection1 from "../../components/user/UserSection1";
import Section2 from "../../components/landingpage/Section2";
import Section3 from "../../components/landingpage/Section3";
import Developers from "../../components/landingpage/Developers";
import Faq from "../../components/landingpage/Faq";
import Search from "../search/Search";
import Footer from "../../components/landingpage/Footer";

import blob from "../../img/Blob.svg";
import lawJust from "../../img/justice.png";

const UserLandingPage = () => {

    const [activeSection, setActiveSection] = useState("home"); // Setting "home" as default

    const handleNavClick = (sectionId) => {
      setActiveSection(sectionId);
    };

    /* useEffect(() => {
      // Check if the user just logged in (you can use a state variable or context for this)
      const justLoggedIn = true; // Change this to your actual logic
      if (justLoggedIn) {
          // Display toast notification for successful login
          toast.success('Login successful!!!');
      }
  }, []); */ // Empty dependency array ensures the effect runs only once, when component mounts

    const page = "";
    const pageContent = "w-full h-full relative max-w-4xl px-5 center mx-auto";

    const pageNav = "px-2 py-2 pb-3 text-label hover:bg-azure-300 hover:bg-opacity-50 focus:border-b-2 hover:-translate-y-1";
    const pageNavText = "transition-all duration-100 ease-in-out";

    return (
        <>
      <Helmet>
        <title>Home | GabAi</title>
      </Helmet>            
         <Toaster />
            <div className="w-full h-screen bg-bkg flex flex-col items-center overflow-x-hidden">
           
                <div class="fixed w-screen h-screen z-0">
                        <img 
                        id="backgroundImage" 
                        className="h-full w-full object-cover transition-opacity duration-200" 
                        src={blob} alt="Background Image">
                        </img>
                </div>

                <div className="flex w-full h-full overflow-x-hidden">
                    <div className="h-full w-full flex justify-center items-top bg-bkg text-content">
                        <section id="home">
                        <div className="w-full h-full relative flex justify-center items-center mx-auto">
                            <UserSection1 />
                        </div>
                        </section>
                    </div>
                    {/* Add more sections similarly */}
                </div>
                
            </div>
        <Footer />
      </>
  );
}

export default UserLandingPage;

    