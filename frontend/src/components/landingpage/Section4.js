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
          Creating a safe space for everyone, where they can get the help they
          need against workplace discrimination.
          <br />
          GabAi helps you and the many others to shout their voices and be
          heard!
        </p>

          <button className="hover:scale-[1.1] transition-all duration-200 ease-in-out bg-azure text-white font-bold p-3.5 rounded-lg  h-55 w-[15rem]">
            Join now!  
          </button>


      </div>
    </div>
  );
};

export default Section4;
