// Trigger ==>       <button className="w-full bg-azure-500 text-white font-bold rounded-xl p-2">Confirm</button>
import Popup from "reactjs-popup";

import { IoIosCloseCircleOutline } from "react-icons/io";
import NewPassword from "./newPassword";

function EmailCode() {
  const timer = 60;
  return (
    <Popup
      trigger={
        <button
          className="w-full 
            bg-azure-500
            text-white font-bold
            rounded-xl
            p-2"
        >
          Confirm
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div
          className="
        modal h-[28rem]
        w-[31.25rem]
        rounded-2xl
        bg-white
        flex flex-col
        mx-10
        remove-arrows
        
        "
        >
          <div className="flex flex-row align-center justify-end p-1">
            <IoIosCloseCircleOutline
              className="text-3xl cursor-pointer"
              onClick={() => close()}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-4xl">Enter Your Code</h1>
          </div>
          <span className="py-2"></span>

          <div className="flex flex-row items-center justify-center">
            <input
              type="text"
              placeholder="Code Here"
              className="w-[25rem] border-2 border-black rounded-xl p-2"
            />
            <span className="m-1"></span>
          </div>
          <span className="py-2"></span>

          <div className="mx-12">
            <NewPassword></NewPassword>
          </div>
          <br />

          <div className="flex flex-col items-center justify-center">
            <p>
              <span>Resend Code ({timer}s)</span>
            </p>
            <p>
              <span
                onClick={() => close()}
                className="text-azure-500 cursor-pointer"
              >
                Back to Log In
              </span>
            </p>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default EmailCode;
