
/* 
import { useEffect, useRef } from 'react'; */

//images
import Search from "../../img/SearchIcon.png";
import PWA from "../../img/PhoneDesktop.png";
import Convo from "../../img/Message.png";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdManageSearch, MdOutlineScreenshot, MdOutlineScreenshotMonitor } from "react-icons/md";

function Section3() {
  const card =
    "w-[32%] h-[15rem] flex flex-col justify-center items-center landing-section shadow-lg rounded-lg transition-transform transform-gpu bg-azure-50 bg-opacity-20";
  const cardIcon =
    "h-[4rem] w-[4rem] object-cover text-center rounded-full mb-3 text-6xl text-label";
  const cardTitle = "font-bold mb-2 text-xl text-label";
  const cardDetail = "text-center text-sm max-md:text-center";  

 


  return (
    <div className="relative z-10 mt-20 flex flex-col gap-y-2 justify-center items-center text-center ">
      <h1 className="justify-center text-center my-5 text-4xl font-bold">
        <span className="text-white pl-2 pr-1 text-4xl font-medium bg-azure mr-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl">GabAi </span> Features
      </h1>


      <div className="flex flex-row justify-between items-center max-md:flex-col w-full relative max-w-4xl lg:px-0 center">
        {/* Conversational AI */}  
        <div className={card}>
          <div className="flex justify-center items-center">
            <div
              className={cardIcon}
              alt="Chat icon"
            >
              <IoChatbubblesOutline />
            </div>
          </div>
          <h2 className={cardTitle}>
            <b>Conversational AI</b>
          </h2>
          <p className={cardDetail}>
            {" "}
            You can engage in real-time 
            <br />
            text-based conversation
          </p>
        </div>
        
        {/* Search Engine */}
        <div className={card}>
          <div className="flex justify-center items-center">
            <div
              className={cardIcon}
              alt="Search Icon">
                <MdManageSearch />
                </div>
          </div>
          <h2 className={cardTitle}>
            <b>Web Search Engine</b>
          </h2>
          <p className={cardDetail}>
            You can look up information about 
            <br />
            workplace discrimination
          </p>
        </div>

        {/* PWA */}
        <div className={card}>
          <div className="flex justify-center items-center">
            <div
              className="h-[4rem] w-[6rem] flex flex-row object-cover text-center mb-3 text-6xl text-label"
              alt="Progressive Web App Icon">
                <MdOutlineScreenshot className="h-[4rem] w-[4rem]"/> 
                <MdOutlineScreenshotMonitor className="h-[4rem] w-[6rem] flex flex-row object-cover text-center mb-3 text-6xl"/>
              </div>
          </div>
          <h2 className={cardTitle}>
            <b>Progressive Web Application</b>
          </h2>
          <p className={cardDetail}>
            GabAi can be installed on 
            <br />
            cross-platforms
          </p>
        </div>
      </div>
    </div> 
  );
}

export default Section3;
