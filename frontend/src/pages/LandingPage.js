// Modules
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import Section1 from "../components/landingpage/Section1";
import Section2 from "../components/landingpage/Section2";
import Section3 from "../components/landingpage/Section3";
import Section4 from "../components/landingpage/Section4";
import Developers from "../components/landingpage/Developers";
import Faq from "../components/landingpage/Faq";
import { FaQq } from "react-icons/fa6";

const LandingPage = () => {
  const { user, dispatch } = useAuthContext();
  const [loginSuccess, setLoginSuccess] = useState(false);


  useEffect(() => {
    const scrollFadeDiv = document.getElementById('scrollFadeDiv');
    const updateOpacity = () => {
        if (!scrollFadeDiv) return; // Guard against null reference

        const distanceFromTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const oneScreenHeight = windowHeight / 8;
        let opacity = 1 - (distanceFromTop / oneScreenHeight);

        // Ensure opacity is between 0 and 1
        opacity = Math.min(Math.max(opacity, 0), 1);

        // Apply opacity to the div
        scrollFadeDiv.style.opacity = opacity;
    };

    // Initial call to set opacity
    updateOpacity();

    window.addEventListener('scroll', updateOpacity);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
        window.removeEventListener('scroll', updateOpacity);
    };
}, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount


  return (
    <>
      <Helmet>
        <title>GabAI</title>
      </Helmet>

      <div id="scrollFadeDiv" className="fixed z-50 bottom-10 left-1/2 transform -translate-x-1/20 animate-bounce duration-10 opacity-100 transition-opacity">
        <svg stroke="#336699" fill="#336699" strokeWidth="0" viewBox="0 0 1024 1024" height="30" width="30" xmlns="http://www.w3.org/2000/svg">
          <path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path>
        </svg>
      </div>

      
      <div class="w-full relative max-w-4xl px-5 lg:px-0 center mx-auto">
      <section id="home">
          {/* 1st section of landing page */}
          <Section1 />
        </section>

        <section id="about">
          {/* 2nd section of landing page */}
          <Section2 />
        </section>

        <section id="features">
          {/* 3rd section of landing page */}
          <Section3 />
        </section>

        <section id="developers">
          {/* 5th section of landing page */}
          <Developers />
        </section>

        <section id="FAQ">
          {/* 5th section of landing page */}
          <Faq />
        </section>

        <section id="callToAct">
          {/* 4th section of landing page */}
          <Section4 />
        </section>
      </div>
      {/* 
      Logout button */}
      {/* {user && <button onClick={handleLogout}>Logout</button>} */}
    </>
  );
}

export default LandingPage;
