import { Link } from "react-router-dom";

import "../css/sideNav.css";

const OpenSideNav = () => {
  document.getElementById("sidenav").style.width = "300px";
};

const CloseSideNav = () => {
  document.getElementById("sidenav").style.width = "0";
};

const hover =
  "hover:bg-azure hover:text-white transition duration-300 ease-in-out";

const sidenav = () => {
  return (
    <>
      <span className="text-2xl" onClick={OpenSideNav}>
        &#9776;
      </span>

      <div id="sidenav" className="list-none fixed z-10 bg-white h-screen w-0">
        <li
          onClick={CloseSideNav}
          className={"flex justify-end p-3 text-2xl cursor-pointer " + hover}
        >
          &times;
        </li>
        <li className={hover}>
          <Link to="/">Home</Link>
        </li>
        <li className={hover}>
          <Link to="/Search">Search</Link>
        </li>
        <li className={hover}>
          <Link>Chat</Link>
        </li>
        <li className={hover}>
          <Link>About</Link>
        </li>
      </div>
    </>
  );
};

export default sidenav;
