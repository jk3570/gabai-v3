import React from "react";
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Login from "../Login";
import Signup from "../Signup";

const ChatNotice = () => {

    return (
        <Popup
      trigger={
            <button                
              className="group px-3 z-30 py-2 bg-azure rounded-lg hover:scale-[1.1] w-full text-white relative after:-z-20 after:absolute after:h-1 after:w-1 after:bg-azure-300 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-600 text-2xl"
              >
                Talk with Gab!
            </button>
      }
      modal
      nested>

      {(close) => (
        <div className="fixed z-40 top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-5 bg-black pt-[3.875rem]">
        <div id="account-notice-modal" className="modal absolute z-50 h-auto w-[70%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-2xl bg-bkg text-content flex flex-col justify-center md:items-start items-center p-5 gap-2">
        <h1 className="my-0 text-2xl font-bold">Continue without an account?</h1>
                <div className="flex w-full border-b-2 border-gray"></div>
        <div className="flex flex-col gap-4">
            <p className="block font-normal text-sm">
            You are currently not signed in. If you continue, you can still talk with Gab but Chat History and Video Conference are not available.</p> 
            <p className="block font-normal text-sm">To experience Gab's full potential, we encourage you to Login or <span className="inline-block text-azure text-nowrap underline"> <Signup /> </span>.
            </p>    
            <div className="flex flex-col justify-between gap-2">
                <button className="flex h-10 w-full px-1 py-1 bg-azure text-white rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out hover:bg-azure-300 cursor-pointer" onClick={() => close()}>
                    <Login />
                </button>
                <Link to="/gab/chat" className="flex h-10 w-full px-1 py-1 bg-gray-300 bg-opacity-10 border-2 border-azure-300 border-opacity-10 text-label rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out hover:bg-gray-300 hover:bg-opacity-30">
                        Continue anyway
                </Link>
            </div>
        </div>


              <button className="absolute top-2 right-2" onClick={close}>
                <IoIosCloseCircleOutline size={24} />
              </button>
        </div>
      </div>
      )}


        </Popup>
    );
};

export default ChatNotice;

