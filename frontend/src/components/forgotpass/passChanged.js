import Popup from "reactjs-popup";
import { FaRegCheckCircle } from "react-icons/fa";

const reloadPage = () => {
  //Reloads the page
  window.location.reload();
};

function passwordChanged() {
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
          className="modal h-[28rem] w-[31.25rem] 
        rounded-2xl
        bg-white
        flex flex-col items-center justify-center
        mx-10"
        >
          <FaRegCheckCircle className="text-9xl text-azure-500" />
          <br />
          <h1 className="font-bold text-2xl">
            Your password has been changed!
          </h1>
          <br />
          <p onClick={reloadPage} className=" cursor-pointer">
            Click here to reload
          </p>
        </div>
      )}
    </Popup>
  );
}

export default passwordChanged;
