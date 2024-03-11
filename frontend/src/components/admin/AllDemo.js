import React, { useState } from "react";
import GenderDemo from "./GenderDemo";
import LocationDemo from "./LocationDemo";
import AgeDemo from "./AgeDemo";

function AllDemo() {
  const [currentPage, setCurrentPage] = useState("gender"); // Default page

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex flex-col bg-gray-300 w-auto h-auto rounded-xl max-w-4xl mx-auto p-4">
        <div className="flex flex-col w-full p-1 my-4 ">
          <ul className="flex flex-row justify-between gap-1 items-start text-white">
            <li
              className="border-2 w-full border-white p-1 rounded-xl cursor-pointer active:bg-azure-400 focus:bg-azure-400"
              onClick={() => handleClick("gender")}
            >
              Gender
            </li>
            <li
              className="border-2 w-full border-white p-1 rounded-xl cursor-pointer active:bg-azure-400 focus:bg-azure-400"
              onClick={() => handleClick("age")}
            >
              Age
            </li>
            <li
              className="border-2 w-full border-white p-1 rounded-xl cursor-pointer 
              active:bg-azure-400
               focus:bg-azure-400"
              onClick={() => handleClick("location")}
            >
              Location
            </li>
          </ul>
        </div>

        {/* TODO: Graph */}
        <div id="center" className="flex flex-col w-full p-1 my-4 ">
          {currentPage === "gender" && <GenderDemo />}
          {currentPage === "location" && <LocationDemo />}
          {currentPage === "age" && <AgeDemo />}
        </div>
      </div>
    </div>
  );
}

export default AllDemo;
