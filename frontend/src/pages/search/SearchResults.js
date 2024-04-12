//module
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";

import backgroundPhoto from "../../img/backgroundPhoto.jpg"

function SearchResults() {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
  const [searchQuery, setSearchQuery] = useState("");
  const ApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const Cx = process.env.REACT_APP_GOOGLE_CX;
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${ApiKey}&cx=${Cx}&q=${searchQuery}`
      );
      const searchResults = response.data.items;
      // Navigate to searchResults route and pass search results as state
      navigate("/searchResults", { state: { searchResults } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-[3.875rem] bg-bkg text-content">
      <div className="absolute z-0 flex w-full h-[3rem] bg-cover"></div>
      <div className="flex flex-col items-center justify-center py-5 px-[3rem]">
          <form onSubmit={handleSearch} className="w-full flex drop-shadow-lg">
            <div className="flex flex-row gap-2 w-full pt-5">
              <input
                type="text"
                placeholder="Search here"
                className="border-2 border-azure-200 w-full flex rounded-full p-4 bg-bkg text-content"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <button
                className="ml-[-4rem] text-4xl text-label z-10"
                type="submit"
              >
                <IoSearchOutline />
              </button>
            </div>
          </form>
      </div>


      <div className="px-[3rem] ">
        {" "}
        {/* Search results */}
        <p>Search results for: </p>

        <div>
          {" "}
          {/* Search results */}
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="bg-gray-400 bg-opacity-40 text-content p-10 rounded-xl mt-5 mx-20 max-md:mx-1"
            >
              <a href={result.link} target="_blank">
                <h1 className="text-2xl text-label">{result.title}</h1>
                <a
                  href={result.link}
                  target="_blank"
                  className="text-green-700"
                >
                  {result.link}
                </a>

                <br />

                <p>{result.snippet}</p>
              </a>
            </div>
          ))}
        </div>
      </div>

      <br />

      {/* Pagination */}
      <div className="flex flex-row items-center justify-center gap-1">
        {/* ...existing code for pagination buttons */}
      </div>
    </div>
  );
}

export default SearchResults;
