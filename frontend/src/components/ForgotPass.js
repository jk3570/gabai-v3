import { useState, useRef } from "react";
import Popup from "reactjs-popup";
import { IoIosCloseCircleOutline } from "react-icons/io";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { BaseURL } from '../BaseURL';

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const form = useRef();

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(emailRegex.test(value));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!email || !isEmailValid) {
      alert("Please enter a valid email");
      return;
    }

    axios
      .post(`${BaseURL}/forgot-password`, { email })
      .then((response) => {
        console.log("SUCCESS!", response.data);
        alert("Reset password link sent to your email!");
      })
      .catch((error) => {
        console.log("FAILED...", error.response.data);
        alert("Failed to send reset password link. Please try again.");
      });
  };

  return (
    <Popup trigger={<button> Forgot Password?</button>} modal nested>
      {(close) => (
        <div className="modal h-[23rem] w-[31.00rem] rounded-2xl bg-white flex flex-col mx-10 self-center justify-center">
          <div className="flex flex-row align-center justify-end p-1">
            <IoIosCloseCircleOutline
              className="text-3xl cursor-pointer"
              onClick={close}
            />
          </div>
          <span className="items-center justify-center font-normal text-xs underline">
            <h1>Forgot Password</h1>
          </span>
          <br />
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-col mx-2 gap-2"
          >
            <div className="flex flex-row gap-2 ">
              <input
                type="email"
                placeholder="Email"
                value={email}
                name="user_email"
                onChange={handleChange}
                className="w-[25rem] border-2 border-black rounded-xl p-2"
              />

              <button onClick={sendEmail} disabled={!email || !isEmailValid}>
                Send
              </button>
            </div>
            <span
              className={isEmailValid ? "invisible" : "visible text-red-500"}
            >
              Please enter a valid email
            </span>
          </form>
        </div>
      )}
    </Popup>
  );
};

export default ForgotPass;