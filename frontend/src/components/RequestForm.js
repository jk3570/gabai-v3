import React from "react";
import Popup from "reactjs-popup";
import { IoIosCloseCircleOutline } from "react-icons/io";

const RequestForm = () => {

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevent form submission
          const inputs = Array.from(event.target.form.elements);
          const currentIndex = inputs.indexOf(event.target);
          const nextIndex = currentIndex + 1;
    
          if (nextIndex < inputs.length) {
            inputs[nextIndex].focus();
          }
        }
      };

    const input = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const summary = "flex h-52 w-full rounded-md border bg-gray rounded-md px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const button = "flex h-10 px-3 py-2 bg-azure text-white rounded-md justify-center items-center w-full text-sm";
    const label = "block font-normal text-sm";

    
  return (
    <Popup
      trigger={
        <button className="rounded-xl p-4 py-1.5 bg-azure-500 text-white hover:scale-[1.1] transition-all duration-100 ease-in-out relative z-50 after:absolute after:-z-20  after:h-1 after:w-1 after:bg-azure-300 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[70] after:hover:transition-all after:hover:duration-650 after:transition-all after:duration-300">
          Request Form
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg bg-opacity-25 bg-black ">
            <div className="modal relative h-auto w-[70%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-2xl bg-white flex flex-col justify-center items-center pt-7 py-10 p-6">
                <div className="absolute flex align-center p-1 inset-y-0 right-0">
                <IoIosCloseCircleOutline className="text-3xl cursor-pointer" onClick={() => close()} />
                </div>
            {/* <div className="flex flex-col items-center justify-center h-screen"> */}
                <div className="w-full max-w-md bg-white rounded-lg">
                <div className="w-full h-full grid grid-cols-1 gap-2">
                <div className="flex flex-col justify-center">
                  <h1 className="font-bold text-3xl m-0">
                    Request Form
                  </h1>
                  <p className={label}>Request <span className="text-azure font-medium">Online Meeting</span> to a lawyer</p>
                </div>
                     <form className="flex flex-col gap-2">
                        <div className="flex flex-row-1 gap-2">
                            <input type="text" className={input} onKeyDown={handleKeyDown} placeholder="First Name"/>
                            <input type="text" className={input} onKeyDown={handleKeyDown} placeholder="Last Name"/>
                        </div>
                        <input type="email" className={input} onKeyDown={handleKeyDown} placeholder="Email"/>
                        <input type="text" className={input} onKeyDown={handleKeyDown} placeholder="Address Number"/>
                        <textarea name="cover_letter" 
                        className={summary}
                        placeholder="Case Summary"></textarea>
                <button type="submit" className={button}>
                Submit
                </button>
                    </form>
                </div>
                </div>
            </div>


        </div>
        )}
    </Popup>
        );
};
    
export default RequestForm;