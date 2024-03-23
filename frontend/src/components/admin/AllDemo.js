import React, { useState } from "react";
import GenderDemo from "./GenderDemo";
import LocationDemo from "./LocationDemo";
import AgeDemo from "./AgeDemo";

function AllDemo() {
  const [currentPage, setCurrentPage] = useState("gender"); // Default page

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const tab = 
  "bg-gray-100 text-start w-[20%] mr-2 mb-2 p-3 pl-10 cursor-pointer rounded-t-xl rounded-bl-xl hover:bg-gray-50 active:bg-gray-400 focus:bg-white focus:text-azure-600 focus:font-semibold";

/* "  border-2 border-azure rounded-xl w-full p-2 pl-3 mb-1 cursor-pointer bg-white text-start grow-0 rounded-tl-xl rounded-tr-xl hover:bg-gray-200 active:bg-azure-400 focus:bg-white focus:mb-0 focus:border-1 focus:border-azure focus:mb-0 focus:rounded-tl-xl focus:rounded-tr-xl focus:text-azure-600 focus:font-semibold focus:rounded-b-none focus:border-b-10 focus-grow" */

  return (
    <div className=" bg-gray-200 p-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl">
      <div className="flex flex-col w-full">
          <ul className="flex flex-row w-full justify-stretch items-start text-black gap-1 border-b">
            <button
              className={tab}
              onClick={() => handleClick("gender")}
            >
              Gender
            </button>
            <button
              className={tab}
              onClick={() => handleClick("age")}
            >
              Age
            </button>
            <button
              className={tab}
              onClick={() => handleClick("location")}
            >
              Location
            </button>
          </ul>
        </div>
      <div className="flex flex-col w-full h-auto rounded-xl">     
        {/* TODO: Graph */}
        <div id="center" className="flex flex-col w-full bg-white p-2 border-azure rounded-b-xl ">
          {currentPage === "gender" && <GenderDemo />}
          {currentPage === "location" && <LocationDemo />}
          {currentPage === "age" && <AgeDemo />}
        </div>
      </div>
    </div>
  );
}

export default AllDemo;
