import Popup from "reactjs-popup";
import { Link } from 'react-router-dom';
import Login from "./Login";
import Signup from "./Signup";

const NewChatPopup = () => {

    const handleNewChat = () => {
        // Refresh the page
        window.location.reload();
    };

    return (
        <Popup
      trigger={
        <div className="flex w-full h-full p-4 py-1.5 items-center justify-center">
          New Chat
        </div>
      }
      modal
      nested>

      {(close) => (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg bg-opacity-25 bg-black" onClick={() => close()}>
        <div className="modal relative h-auto w-[70%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-2xl bg-bkg text-content flex flex-col ">
                <div className="flex flex-col py-4 px-7">
                  <h1 className="font-bold text-xl m-0">
                    New Chat?
                  </h1>
                </div>
            <div className="border-t border-gray-400 border-opacity-20 flex"></div>
                <div className="flex flex-col p-5 px-7 gap-4">
                    <p className="block font-normal text-sm">
                    Your current chat will no longer be accessible. <span className="inline-block text-azure text-nowrap underline"> <Signup /> </span> or <span className="inline-block text-azure text-nowrap underline cursor-pointer"><Login /></span> to save chats.
                    </p>    
                <div className="flex flex-row justify-end gap-2">
                    <button className="flex h-10 w-[30%] px-1 py-1 bg-gray-300 bg-opacity-10 border-2 border-azure-300 border-opacity-10 text-label rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out hover:bg-gray-300 hover:bg-opacity-30" onClick={() => close()}>
                        Cancel
                    </button>
                    <button  className="flex h-10 w-[30%] px-1 py-1 bg-azure text-white rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out hover:bg-azure-300" onClick={handleNewChat}>
                        New Chat
                    </button>
                </div>
                </div>



        </div>
        </div>
      )}
    </Popup>
    );
};

export default NewChatPopup;