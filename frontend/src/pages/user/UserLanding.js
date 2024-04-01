// Modules
import { useAuthContext } from "../../hooks/useAuthContext";
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

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

    const page = "";
    const pageContent = "w-full h-full relative max-w-4xl px-5 center mx-auto";

    const pageNav = "px-2 py-2 pb-3 text-label hover:bg-azure-300 hover:bg-opacity-50 focus:border-b-2 hover:-translate-y-1";
    const pageNavText = "transition-all duration-100 ease-in-out";

    return (
        <>
      <Helmet>
        <title>Home | GabAi</title>
      </Helmet>

        {/* <div> */}
                {/* Page Links */}
                <div id = "navbar-second" className="fixed z-50 w-full translate-y-[3.3rem] gap-2 bg-bkg border-b-2 border-azure font-bold flex justify-center items-center">
                    <div className="nav w-full justify-between items-center max-w-3xl">
                            <nav className="flex list-none text-sm items-center">

                            <Link onClick={() => handleNavClick("home")}>
                                <div className={pageNav}>
                                <li className={pageNavText}>
                                    Home
                                </li>
                                </div>
                            </Link>

                            <Link onClick={() => handleNavClick("about")}>
                            <div className={pageNav}>
                                <li className={pageNavText}>
                                    About
                                </li>
                            </div>
                            </Link>

                            <Link
                                
                                onClick={() => handleNavClick("features")}
                            >
                            <div className={pageNav}>
                                <li className={pageNavText}>
                                    Features
                                </li>
                            </div>
                            </Link>

                            <Link
                                
                                onClick={() => handleNavClick("developers")}
                            >
                            <div className={pageNav}>
                                <li className={pageNavText}>
                                    Developers
                                </li>
                            </div>
                            </Link>

                            <Link  onClick={() => handleNavClick("FAQ")}>
                            <div className={pageNav}>
                                <li className={pageNavText}>
                                    FAQs
                                </li>
                            </div>
                            </Link>
                            </nav>
                    </div>
                </div>                

                <div class="fixed w-screen h-screen z-0">
                        <img 
                        id="backgroundImage" 
                        className="h-full w-full object-cover transition-opacity duration-200" 
                        src={blob} alt="Background Image">
                        </img>
                </div>



            <div className="w-full h-screen bg-bkg flex flex-col items-center overflow-x-hidden overflow-y-hidden pt-[5.9rem]">
                <div className="flex w-full h-full overflow-x-hidden overflow-y-scroll ">
                    <div className="h-full w-full flex justify-center items-top bg-bkg text-content">
                        <section id="home" style={{ display: activeSection === "home" ? "block" : "none" }}>
                        <div className="w-full h-full relative flex justify-center items-center mx-auto">
                            <UserSection1 />
                        </div>
                        </section>
                        <section id="about" style={{ display: activeSection === "about" ? "block" : "none" }} className="mt-[5rem]">
                        <div className={pageContent}>
                            <Section2 />
                        </div>
                        </section>
                        <section id="features" style={{ display: activeSection === "features" ? "block" : "none" }}>
                        <div className={pageContent}>
                            <Section3 />
                        </div>
                        </section>
                        <section id="developers" style={{ display: activeSection === "developers" ? "block" : "none" }}>
                        <div className={pageContent}>
                            <Developers />
                        </div>
                        </section>
                        <section id="FAQ" style={{ display: activeSection === "FAQ" ? "block" : "none" }}>
                        <div className={pageContent}>
                            <Faq />
                        </div>
                        </section>
                    </div>
                    {/* Add more sections similarly */}
                </div>
            </div>

        {/* </div> */}
      </>
  );
}

export default UserLandingPage;

    