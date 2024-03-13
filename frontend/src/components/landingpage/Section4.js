import React from "react";


const Section4 = () => {
  return (
    <div className="relative z-10 bg-gray-100
    rounded-lg mt-20 
    flex flex-row justify-around items-center px-[3rem] py-20
    max-md:flex-col
    max-md:px-2
    ">
      <div className="relative z-10 flex flex-col gap-y-2 justify-center items-center">
      <center>
        <h1 className="text-4xl font-bold my-4">
        Let's stop <span className="text-azure">discrimination!</span>
        </h1>
        </center>
        
        <p className="text-1xl text-center
        max-md:text-center mb-4">
          GabAi helps you and the many others to shout their voices and be
          heard.
        </p>
        <button className="group px-3 z-30 py-2 bg-azure rounded-lg hover:scale-[1.1] max-md:w-32 lg:w-60 text-white 
        relative after:-z-20 after:absolute after:h-1 after:w-1 after:bg-azure-300 after:left-30 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[200] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-300 transition-all duration-600 text-2xl
        ">Sign up now!
        </button>
        <span className="absolute z-10 translate-x-[4rem] translate-y-[5.2rem] w-6 h-6 bg-azure rotate-45"></span>
      </div>
    </div>
  );
};

export default Section4;
