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
import Logo from "../../img/Logo.png";

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
      navigate("/searchResults", { state: { searchResults } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen max-w-4xl px-5 lg:px-0 center mx-auto flex justify-center items-center">
      <div className="flex flex-col justify-between items-center ">
        <Helmet>
          <title>Search - GabAI</title>
        </Helmet>

        <h1 className="">
          <img src={Logo} alt="Logo" style={{ height: "80px" }} />
        </h1>

        <br />

        <p className="text-md">
          Navigate the legal landscape of workplace discrimination
        </p>

        <br />

        <form onSubmit={handleSearch}>
          <div className="flex flex-row gap-2">
            <input
              type="text"
              placeholder="Search here"
              className="w-[50rem] border-2 border-black rounded-full p-4 max-md:w-[30rem]"
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
  );
}

export default Search;
