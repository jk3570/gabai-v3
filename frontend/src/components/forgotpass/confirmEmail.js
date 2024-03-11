import Popup from "reactjs-popup";
import { IoIosCloseCircleOutline } from "react-icons/io";

import EmailCode from "./authCode";

export default function PopupComponent() {
  return (
    <Popup trigger={<button>Forgot Password?</button>} modal nested>
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
            <h1 className="font-bold text-4xl">Confirm Email</h1>
          </div>
          <span className="py-2"></span>
          <div className="ml-12">
            <p>Email</p>
          </div>

          <div className="flex flex-row items-center justify-center">
            <input
              type="text"
              placeholder="juandelacruz@domain.com"
              className="w-[25rem] border-2 border-black rounded-xl p-2"
            />
            <span className="m-1"></span>
          </div>
          <span className="py-2"></span>

          <div className="mx-12">
            <EmailCode></EmailCode>
          </div>
          <br />
          <div className="flex flex-row items-center justify-center">
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
