// Modules
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import Helmet from "react-helmet";
import { IoSearchOutline } from "react-icons/io5";

// images
import iconWhite from "../../img/iconWhite.svg";
import backgroundPhoto from "../../img/backgroundPhoto.jpg"

function Search() {
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
      navigate("/search/result", { state: { searchResults } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-full bg-bkg">
        <Helmet>
          <title>Search - GabAI</title>
        </Helmet>
    <div className="h-[80%] bg-cover bg-[center_bottom_-5rem]" style={{ backgroundImage: `url(${backgroundPhoto})` }}>
      <div className="bg-black opacity-20 absolute z-0 w-full h-[80%]"></div>
    
    <div className="relative z-30 w-full h-full max-w-4xl px-5 lg:px-0 center mx-auto flex justify-center items-center" >
      <div className="flex flex-col w-full items-center">


        <div className=" flex flex-col w-full items-center gap-4">
          <div className="flex flex-row text-white text-7xl items-center font-medium gap-5">
            <img src={iconWhite} alt="Logo" style={{ height: "80px" }} /> GabAi
          </div>

          <p className="text-md text-white">
            Navigate the legal landscape of workplace discrimination
          </p>

          <form onSubmit={handleSearch} className="w-full flex drop-shadow-lg">
            <div className="flex flex-row gap-2 w-full">
              <input
                type="text"
                placeholder="Search here"
                className="border-2 border-azure-200 w-full flex rounded-full p-4 bg-bkg"
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

      </div>
    </div> 

    </div>
    </div>
  );
}

export default Search;
