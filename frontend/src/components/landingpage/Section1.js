import { useState, useEffect } from "react";

import blob from "../../img/Blob.svg";
import gabAnimation from "../../img/gabAnimation.gif";
import lawJust from "../../img/lawJust.png";
import iconWhite from "../../img/iconWhite.svg";

const WorkplaceDiscriminationLaws = () => {

  useEffect(() => {
    const handleScroll = () => {
      const background = document.getElementById('backgroundImage');
      const scrollPosition = window.scrollY;
      const opacity = 1 - (scrollPosition / window.innerHeight);
      background.style.opacity = opacity > 0 ? opacity : 0;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const button = 'group px-3 z-30 py-2 bg-azure rounded-lg hover:scale-[1.1] max-md:w-32 lg:w-60 text-white relative after:-z-20 after:absolute after:h-1 after:w-1 after:bg-azure-300 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-600 text-2xl';

  return (
    <div
      className="relative z-10 flex flex-col justify-center min-h-screen relative max-md:p-1"
    >
          <div class="fixed inset-0 w-full h-screen inset-0 z-0">
            <img 
              id="backgroundImage" 
              className="h-full w-full object-cover transition-opacity duration-100" 
              src={blob} alt="Background Image">
            </img>
          </div>
          

      <div 
      className="flex flex-row justify-between items-center gap-x-20 max-md:flex-col-reverse"
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
              text-3xl font-normal my-0
              max-md:text-center
              max-md:mx-1
            "
          >
            A safe space against
            <br />
            workplace discrimination.
          </h1>
          </div>
          
          {/* <p className="text-1xl my-0 max-md:text-center">
            Explore our guide on workplace discrimination laws <br/> in the
            Philippines to gain insights into legal protections.
          </p> */}

          <div className="flex max-md:justify-center">
            
            <div className="group h-25 w-60">
             <a href="/chat">
              <button                
              className={button}
              >
                Talk with Gab! 
             
              </button>
              </a>
              <span className="absolute z-10 left-6 translate-y-8 w-6 h-6 bg-azure rotate-45"></span>
            </div>
            
          </div>
        </div>

        <div className="grid items-center">
          <img 
            src={lawJust} 
            className="z-20 h-[23rem] w-[23rem]"
            alt="Justitia goddess of justice"  />
        </div>
      </div>
    </div>
  );
};

export default WorkplaceDiscriminationLaws;