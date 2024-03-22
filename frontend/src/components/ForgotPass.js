import Popup from "reactjs-popup";

import { IoIosCloseCircleOutline } from "react-icons/io";

const forgotPass = () => {
  return (
    <Popup trigger={<a href="#"> Forgot Password</a>} modal nested>
      {(close) => (
        <div className="modal h-[23rem] w-[31.00rem] rounded-2xl bg-white flex flex-col mx-10 self-center justify-center">
          <div className="flex flex-row align-center justify-end p-1">
            <IoIosCloseCircleOutline
              className="text-3xl cursor-pointer"
              onClick={() => close()}
            />
          </div>
          <span className="items-center justify-center font-normal text-xs underline hover:text-azure">
            <h1>Forgot Password</h1>
          </span>
          <br />
          <div className="flex flex-col mx-2 gap-2">
            <div className="flex flex-row gap-2 ">
              <input
                type="text"
                placeholder="Email"
                className="w-[25rem] border-2 border-black rounded-xl p-2"
              />
              <button className="w-[20%] bg-azure-500 text-white font-bold rounded-xl p-2">
                Send
              </button>
            </div>

            <div className="flex flex-row gap-2">
              <input
                type="text"
                placeholder="Enter Code"
                className="w-[25rem] border-2 border-black rounded-xl p-2"
              />
              <button className="w-[20%] bg-azure-500 text-white font-bold rounded-xl p-2">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default forgotPass;
