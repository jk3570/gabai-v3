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
import iconAzure from "../../img/iconAzure.svg";
import backgroundPhoto from "../../img/backgroundPhoto.jpg"
import lawJust from "../../img/lawJust.png";
import Blob from "../../img/Blob.svg"

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
    <div className="h-screen bg-cover">
      <div class="fixed w-screen h-screen z-0">
                <img 
                id="backgroundImage" 
                className="h-full w-full object-cover transition-opacity duration-200" 
                src={Blob} alt="Background Image">
                </img>
      </div>
      {/* <div class="absolute w-screen h-screen z-0 overflow-clip">
                <img 
                id="backgroundImage" 
                className="absolute scale-[75%] translate-x-[10rem] -translate-y-[15rem] opacity-20" 
                src={lawJust} alt="Background Image">
                </img>
        </div> */}
      
    
    <div className="relative z-40 w-full h-full max-w-4xl px-5 lg:px-0 center mx-auto flex justify-center items-center" >
      <div className="flex flex-col w-full items-center">


        <div className=" flex flex-col w-full items-center gap-4">
          <div className="flex flex-row text-azure text-7xl items-center font-medium gap-5">
            <img src={iconAzure} alt="Logo" style={{ height: "80px" }} /> GabAi
          </div>

          <p className="text-md text-label">
            Navigate the legal landscape of workplace discrimination
          </p>

          <form onSubmit={handleSearch} className="w-full flex drop-shadow-lg">
            <div className="flex flex-row gap-2 w-full">
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

      </div>
    </div> 

    </div>
    </div>
  );
}

export default Search;
