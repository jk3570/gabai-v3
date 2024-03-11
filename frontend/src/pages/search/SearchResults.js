//module
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";

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
    <div className="px-[3rem]">
      <div className="flex flex-col items-center justify-center py-5">
        <form onSubmit={handleSearch}>
          <div className="flex flex-row gap-2">
            <input
              type="text"
              placeholder="Search"
              className="w-[40rem] border-2 border-black rounded-full p-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              className="ml-[-4rem] text-4xl text-azure z-10"
              type="submit"
            >
              <IoSearchOutline />
            </button>
          </div>
        </form>
      </div>

      <br />

      <div>
        {" "}
        {/* Search results */}
        <p>Search results for: </p>
        <br />
        <div>
          {" "}
          {/* Search results */}
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="bg-gray-100 p-10 rounded-xl mt-5 mx-20 max-md:mx-1"
            >
              <a href={result.link} target="_blank">
                <h1 className="text-2xl text-azure">{result.title}</h1>
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
