import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import toast, { Toaster } from "react-hot-toast";
import blob from "../../img/Blob.svg";
import UserSection1 from "../../components/user/UserSection1";
import Footer from "../../components/landingpage/Footer";

const UserLandingPageSuccess = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Check if toast has been shown before
    const hasShownToastBefore = localStorage.getItem("hasShownToast");
    if (hasShownToastBefore === "false") {
      // Show toast if it hasn't been shown before
      toast.success("Account created successfully!", {
        position: "top-center",
        duration: 5000,
      });
      // Set a flag in local storage to indicate that the toast has been shown
      localStorage.setItem("hasShownToast", "true");
    }
  }, []);


  return (
    <>
      <Helmet>
        <title>Home | GabAi</title>
      </Helmet>

      <div className="w-full h-screen bg-bkg flex flex-col items-center overflow-x-hidden">
        <div class="fixed w-screen h-screen z-0">
          <img
            id="backgroundImage"
            className="h-full w-full object-cover transition-opacity duration-200"
            src={blob}
            alt="Background Image"
          />
        </div>

        <div className="flex w-full h-full overflow-x-hidden">
          <div className="h-full w-full flex justify-center items-top bg-bkg text-content">
            <section id="home">
              <div className="w-full h-full relative flex justify-center items-center mx-auto">
                <div>
                  <Toaster position="top-center" />
                </div>
                <UserSection1 />
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserLandingPageSuccess;
