import React, { useState } from "react";
import Popup from "reactjs-popup";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [step, setStep] = useState(1); // 1 for entering email, 2 for entering reset code

  const sendResetEmail = () => {
    // Placeholder function for sending reset password email
    console.log("Reset email sent to:", email);
    // Update step to show the reset code input field
    setStep(2);
  };

  const confirmResetCode = () => {
    // Placeholder function for confirming reset code
    console.log("Reset code confirmed:", resetCode);
    // Here you would add logic to verify the reset code
    // and then proceed with resetting the password
    // For simplicity, let's just close the popup after code confirmation
    closePopup();
  };

  const closePopup = () => {
    // Function to close the popup
    // You can implement this according to your popup library
  };

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
          <span className="text-center">
            <h1>Forgot Password</h1>
          </span>
          <br />
          <div className="flex flex-col mx-2 gap-2">
            {/* Step 1: Enter Email */}
            {step === 1 && (
              <div className="flex flex-row gap-2 ">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[25rem] border-2 border-black rounded-xl p-2"
                />
                <button
                  className="w-[20%] bg-azure-500 text-white font-bold rounded-xl p-2"
                  onClick={sendResetEmail}
                >
                  Send
                </button>
              </div>
            )}

            {/* Step 2: Enter Reset Code */}

            {step === 2 && (
              <div className="flex flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter Code"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="w-[25rem] border-2 border-black rounded-xl p-2"
                />
                <button
                  className="w-[20%] bg-azure-500 text-white font-bold rounded-xl p-2"
                  onClick={confirmResetCode}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ForgotPass;
