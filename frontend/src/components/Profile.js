import Popup from "reactjs-popup";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ProfileSettings from "./ProfileSettings";
import { Link } from "react-router-dom";
const Profile = () => {
  const backdrop =
    "fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg bg-opacity-25 bg-black ";
  const bg =
    "modal h-[28rem] w-[31.25rem] rounded-2xl bg-white flex flex-col mx-10 p-3";

  const btnRed = "bg-red-500 text-white p-2 w-full rounded-xl";

  const btnBlue = "bg-azure-500 text-white p-2 w-full rounded-xl";

  const closeBtn = "flex flex-row align-center justify-end p-1 ";
  return (
    <>
      <Popup
        trigger={
          <button className=" p-4 py-1 text-azure-500 flex justify-center items-center">
            <span className="bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center mr-3"></span>
            Profile
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className={backdrop}>
            <div className={bg}>
              <div className={closeBtn}>
                <IoIosCloseCircleOutline
                  className="text-3xl cursor-pointer"
                  onClick={() => close()}
                />
              </div>

              <div className="flex flex-col items-center justify-center">
                {/* <div className="h-[7rem] w-[7rem] bg-gray-300 rounded-full"></div> */}
                <h2>User1234</h2>
                <p>1234@domain.com</p>
              </div>
              <br />
              <div className="flex flex-col items-center justify-center">
                <ProfileSettings></ProfileSettings>
                <br />
                <Link to="/">
                  <button className={btnRed}>Log Out</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};

export default Profile;
