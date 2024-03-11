import Popup from "reactjs-popup";
import { IoIosCloseCircleOutline } from "react-icons/io";
import PasswordChanged from "./passChanged";

export default function PopupComponent() {
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
        <div className="modal h-[28rem] w-[31.25rem] rounded-2xl bg-white flex flex-col mx-10">
          <div className="flex flex-row align-center justify-end p-1">
            <IoIosCloseCircleOutline
              className="text-3xl cursor-pointer"
              onClick={() => close()}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-4xl">
              Set new <span className="text-azure">Password</span>
            </h1>
            <p>Make sure to set a new robust password</p>
          </div>
          <span className="py-2"></span>
          <div className="ml-12">
            <p>Set new password</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <input
              type="text"
              placeholder="• • • • • • • •"
              className="w-[25rem] border-2 border-black rounded-xl p-2"
            />
          </div>
          <span className="py-2"></span>
          <div className="ml-12">
            <p>Repeat new password</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <input
              type="password"
              placeholder="• • • • • • • •"
              className="w-[25rem] border-2 border-black rounded-xl p-2"
            />
          </div>
          <br />

          <div className="mx-12">
            <PasswordChanged />
          </div>
          <br />
          <div className="flex flex-row items-center justify-center"></div>
        </div>
      )}
    </Popup>
  );
}
