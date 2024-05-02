import { useState, useRef } from "react";
import Popup from "reactjs-popup";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import { BaseURL } from '../BaseURL';
import { Link } from "react-router-dom";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [myError, setError] = useState(null);

  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      setError("Invalid Email");
      return;
    }

    try {
      await axios.post(`http://localhost:4000/reset/forgot-password`, { email });
      alert("Reset password link sent to your email!");
    } catch (error) {
      console.log("FAILED...", error.response.data);
      setError("Failed to send reset password link. Please try again.");
      /* alert("Failed to send reset password link. Please try again."); */
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(emailRegex.test(value));
    setError(null); // Clear error when input changes
  };

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

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const label = "block font-normal text-sm flex-row";
  const warning = "block font-normal text-sm text-red-500 error mt-1";
  const input = "flex h-10 w-full rounded-md border border-input bg-bkg px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const button = "flex h-10 w-full px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm";

  return (
    <Popup trigger={<div> Forgot Password?</div>} modal nested>
      {(close) => (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg bg-opacity-10 bg-black ">
          <div className="modal relative h-auto w-[70%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-2xl bg-bkg text-content flex flex-col pt-7 py-10 px-8 gap-3">
            <Link to="#" className="absolute flex align-center p-1 inset-y-0 right-0">
              <IoIosCloseCircleOutline className="text-3xl cursor-pointer" onClick={() => close()} />
            </Link>

            <div className="flex flex-col items-start justify-start text-left gap-3">
              <h1 className="font-bold text-xl m-0">Forgot Your Password? No worries! </h1>
              <p className={label}>Please enter your registered email address below, and we'll send you a secure link to create a new password.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 ">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  name="user_email"
                  onChange={handleChange}
                  className={input}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <span className={warning}>{myError}</span>

              <div className="w-full flex justify-end">
                <button className={button} onClick={handleSubmit} type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ForgotPass;
