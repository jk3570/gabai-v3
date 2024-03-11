import Popup from "reactjs-popup";

import { RiAddCircleFill } from "react-icons/ri";

import "../../css/add-account.css";

const addUserStyle =
  "flex flex-row justify-center items-center gap-2 p-2 bg-azure-300 rounded-xl text-white hover:bg-azure-400 hover:scale-110 transition-all duration-300";

const userTypeStyle =
  "flex flex-col bg-gray-200 rounded-xl p-3 hover:bg-gray-300 transition-all duration-300 cursor-pointer";

const cancelButtonStyle =
  "flex justify-center items-center p-2 bg-red-400 rounded-xl text-white  hover:bg-red-500 transition-all duration-300";

const AddNewAccount = () => {
  return (
    <Popup
      trigger={
        <button className={addUserStyle}>
          <RiAddCircleFill /> Add New Account
        </button>
      }
      modal
    >
      {(close) => {
        return (
          <div
            className="bg-white w-[30rem] h-[30rem] flex flex-col p-3 rounded-xl animate__animated animate__zoomIn"
            id="add-account-popup"
          >
            <h2>Choose an Account Type</h2>
            <br />
            <div className="flex flex-col gap-5">
              <div className={userTypeStyle}>
                <p className="font-bold text-2xl">User</p>

                <p> Create an account for user.</p>
              </div>
              <div className={userTypeStyle}>
                <p className="font-bold text-2xl">Attorney</p>

                <p>Create an account for an attorney.</p>
              </div>
              <div className={userTypeStyle}>
                <p className="font-bold text-2xl">Admin</p>

                <p>Create an account to add an administrator.</p>
              </div>
            </div>
            <br />
            <button
              className={cancelButtonStyle}
              onClick={() => {
                document
                  .getElementById("add-account-popup")
                  .classList.add("animate__zoomOut");
                setTimeout(() => close(), 500);
              }}
            >
              Cancel
            </button>
          </div>
        );
      }}
    </Popup>
  );
};

export default AddNewAccount;
