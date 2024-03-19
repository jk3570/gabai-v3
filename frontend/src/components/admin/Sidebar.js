//icon sets
import { FaUsers } from "react-icons/fa6";
import { LiaBalanceScaleSolid } from "react-icons/lia";
import { VscFeedback } from "react-icons/vsc";
import { RxDashboard } from "react-icons/rx";
import { FaBoxArchive } from "react-icons/fa6";

import { Link } from "react-router-dom";
import "../../css/admin-sidebar.css";


const open = () => {
  document.getElementById("sidebar").style.width = "320px";
  document.getElementById("burger").style.display = "none";
  document.getElementById("close").style.display = "block";
};

const close = () => {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("burger").style.display = "block";
  document.getElementById("close").style.display = "none";
};

function Sidebar() {

  const text = "flex flex-row gap-4 ml-5 text-2xl ";
  /* focus:bg-white focus:text-azure-600 focus:font-semibold */
  const icon = "text-3xl";

  return (
    <>
      <div  className="fixed z-50">
        <div
          className="justify-center items-center font-bold text-azure-500 text-2xl m-4 cursor-pointer"
          onClick={open} style={{ height: "30px" }}
          id="burger"
        >
          &#9776;
        </div>
      </div>
      <div className="fixed z-50">
            <div className="justify-center items-center font-block text-azure-500 text-4xl m-4 -translate-y-2 cursor-pointer" 
            onClick={close} style={{ height: "30px"}}
            id="close">
              &times;
            </div>
      </div>

      
      <div id="sidebar" className="fixed z-40 h-full w-0 top-0 left-0 bg-gray-100 overflow-x-hidden transition duration-200 shadow-lg translate-y-[3.875rem]">
        
        {/* Top area */}
      
      <div className="mt-10 m-5 text-center">
          <h1 className=" text-black font-bold text-2xl">Admin Dashboard</h1>
          </div>
        <div className="mt-10 text-black text-1xl">

        {/* Navigation Area */}
          <nav className="flex flex-col gap-10 list-none items-start text-black font-normal p-3">
            <li>
              <Link
                to="/admin"
                className={text}
              >
                <RxDashboard className={icon} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className={text}
              >
                <FaUsers className={icon} />
                Users
              </Link>
            </li>

            <li>
              <Link
                to="/admin/cases"
                className={text}
              >
                <LiaBalanceScaleSolid className={icon} />
                Cases
              </Link>
            </li>

            <li>
              <Link
                to="admin/feedbacks"
                className={text}
              >
                <VscFeedback className={icon} />
                Feedbacks
              </Link>
            </li>

            <li>
              <Link className={text}>
                <FaBoxArchive className={icon} />
                Archived
              </Link>
            </li>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
