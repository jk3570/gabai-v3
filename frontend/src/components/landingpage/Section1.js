import { useState, useEffect } from "react";

import blob from "../../img/Blob.svg";
import lawJust from "../../img/justice.png";
import { Link } from "react-router-dom";


const WorkplaceDiscriminationLaws = () => {

  return (
    <div
      className="relative z-10 flex flex-col justify-center h-screen w-full"
    >

      <div 
      className="flex z-10 flex-col md:flex-row md:justify-between items-center gap-x-20"
      >
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-5">
          <h1
            className=" z-30
              text-8xl font-medium my-0
              leading-none h-[5rem]
              text-center mx-1 
              md:text-left
              text-azure
            "
          >GabAi
          </h1>
          <h1
            className=" z-30
              pl-[0.4rem] text-2xl text-center
              md:text-left md:text-3xl font-normal my-0
            "
          >
            Your Ai guide against
            <br />
            workplace discrimination.
          </h1>
          </div>
        
          <div className="flex justify-center">
            
            <div className="group relative h-25 w-full">
            <Link to="/gab/chat">
              <button                
              className="group px-3 z-30 py-2 bg-azure rounded-lg hover:scale-[1.1] w-full text-white relative after:-z-20 after:absolute after:h-1 after:w-1 after:bg-azure-300 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-600 text-2xl"
              >
                Talk with Gab! 
              </button>
              <span className="absolute z-0 left-6 translate-y-8 w-6 h-6 bg-azure rotate-45 overflow-self-visible"></span>
              </Link>
            </div>
            
          </div>
        </div>
      
      
        <div className="hidden md:block absolute z-0 md:relative">
          <img 
            src={lawJust} 
            className="z-20 h-[25rem] w-[25rem]"
            alt="Justitia goddess of justice"  />
        </div>
      </div>

      <div class="md:hidden block absolute w-screen h-screen z-0 overflow-clip">
                <img 
                id="backgroundImage" 
                className="absolute scale-[165%] translate-x-[8rem] translate-y-[10rem] opacity-20" 
                src={lawJust} alt="Background Image">
                </img>
      </div>
    </div>
  );
};

export default WorkplaceDiscriminationLaws;