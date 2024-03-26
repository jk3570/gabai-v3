import { useState, useEffect } from "react";

import blob from "../../img/Blob.svg";
import lawJust from "../../img/justice.png";


const WorkplaceDiscriminationLaws = () => {

  return (
    <div
      className="relative z-10 flex flex-col justify-center min-h-screen max-md:p-1"
    >

      <div 
      className="flex z-10 flex-row justify-between items-center gap-x-20 max-md:flex-col-reverse"
      >
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-5">
          <h1
            className="
              text-8xl font-medium my-0
              leading-none h-[5rem]
              max-md:text-center
              max-md:mx-1
              text-azure
            "
          >GabAi
          </h1>
          <h1
            className="
              pl-[0.4rem]
              text-3xl font-normal my-0
              max-md:text-center
              max-md:mx-1
            "
          >
            Your Ai guide against
            <br />
            workplace discrimination.
          </h1>
          </div>
          
          {/* <p className="text-1xl my-0 max-md:text-center">
            Explore our guide on workplace discrimination laws <br/> in the
            Philippines to gain insights into legal protections.
          </p> */}

          <div className="flex max-md:justify-center">
            
            <div className="group relative h-25 w-full">
             <a href="/gab/chat">
              <button                
              className="group px-3 z-30 py-2 bg-azure rounded-lg hover:scale-[1.1] w-full text-white relative after:-z-20 after:absolute after:h-1 after:w-1 after:bg-azure-300 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-600 text-2xl"
              >
                Talk with Gab! 
              </button>
              <span className="absolute z-0 left-6 translate-y-8 w-6 h-6 bg-azure rotate-45 overflow-self-visible"></span>
              </a>
            </div>
            
          </div>
        </div>

        <div className="grid items-center">
          <img 
            src={lawJust} 
            className="z-20 h-[25rem] w-[25rem]"
            alt="Justitia goddess of justice"  />
        </div>
      </div>
    </div>
  );
};

export default WorkplaceDiscriminationLaws;