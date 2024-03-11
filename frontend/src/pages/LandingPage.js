// Modules
import React from "react";
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

function LandingPage() {
  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    // Remove user from local storage
    localStorage.removeItem("user");
    // Dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <Helmet>
        <title>GabAI</title>
      </Helmet>
      <div class="w-full relative max-w-4xl px-5 lg:px-0 center mx-auto">
        <section id="home">
          {/* 1st section of landing page */}
          <Section1 />
        </section>

        <section id="about">
          {/* 2nd section of landing page */}
          <Section2 />
        </section>

        <section>
          {/* 3rd section of landing page */}
          <Section3 />
        </section>

        <section>
          {/* 5th section of landing page */}
          <Developers />
        </section>

        <section>
          {/* 5th section of landing page */}
          <Faq />
        </section>

        <section>
          {/* 4th section of landing page */}
          <Section4 />
        </section>
      </div>
      {/* 
      Logout button */}
      {user && <button onClick={handleLogout}>Logout</button>}
    </>
  );
}

export default LandingPage;
