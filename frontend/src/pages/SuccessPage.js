import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Login from "../components/Login";

const SuccessPage = () => {
    return (
      <div className="fixed z-50 w-screen h-screen flex flex-col bg-bkg justify-center items-center overflow-hidden">
        <div className="modal relative h-auto w-[70%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-2xl bg-bkg text-content flex flex-col py-10 p-3 shadow-lg justify-center items-center border border-gray-400 border-opacity-10 gap-3">
            <FaCheckCircle className="text-5xl text-green-500"/>
            <h1 className="text-lg font-bold ">Verification Success</h1>
            <p></p>
            <div><Login /></div>
            
        </div>
      </div>
    );
  };
  
  export default SuccessPage;