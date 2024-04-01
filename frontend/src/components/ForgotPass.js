import { useState } from "react";
import Popup from "reactjs-popup";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const sendResetEmail = () => {
    // Here, you would implement the logic to send the reset password email
    // You can use a library like Axios to make an API call to your server
    // Example:
    // axios.post('/api/reset-password', { email })
    //   .then(response => setSuccessMessage(response.data.message))
    //   .catch(error => setErrorMessage(error.response.data.message));
  };

  const confirmCode = () => {
    // Here, you would implement the logic to confirm the reset password code
    // Example:
    // axios.post('/api/confirm-reset-code', { email, code })
    //   .then(response => setSuccessMessage(response.data.message))
    //   .catch(error => setErrorMessage(error.response.data.message));
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
          <span className="items-center justify-center font-normal text-xs underline hover:text-azure">
            <h1>Forgot Password</h1>
          </span>
          <br />
          <div className="flex flex-col mx-2 gap-2">
            <div className="flex flex-row gap-2 ">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[25rem] border-2 border-black rounded-xl p-2"
              />
              <button
                onClick={sendResetEmail}
                className="w-[20%] bg-azure-500 text-white font-bold rounded-xl p-2"
              >
                Send
              </button>
            </div>

            <div className="flex flex-row gap-2">
              <input
                type="text"
                placeholder="Enter Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-[25rem] border-2 border-black rounded-xl p-2"
              />
              <button
                onClick={confirmCode}
                className="w-[20%] bg-azure-500 text-white font-bold rounded-xl p-2"
              >
                Confirm
              </button>
            </div>
          </div>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      )}
    </Popup>
  );
};

export default ForgotPass;
