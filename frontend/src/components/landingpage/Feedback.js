import React, { useState } from "react";
import Popup from "reactjs-popup";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Feedback = ({ onClose }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState(user ? user.email : '');
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:4000/feedback/create", { email, message });
      // If the request succeeds, show the success toast
      toast.success("Feedback submitted successfully!", {
        position: "top-center",
        duration: 5000,
      });
      // Navigate to the home page after successful submission
      /* navigate("#"); */
      close();
    } catch (error) {
      console.error(error);
      // If there is an error, do not show the toast
    } finally {
      setIsLoading(false);
    }
  };

  const input = "flex h-10 w-full rounded-md border border-input bg-bkg px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const inputMessage = "flex h-36 w-full rounded-md border border-input bg-bkg px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const button = "flex h-10 px-3 py-2 bg-azure text-white rounded-md justify-center items-center w-full text-sm";

  return (
    <Popup
      trigger={
        <div className="inline-block w-full h-full items-center justify-center hover:underline">
          feedback
        </div>
      }
      modal
      nested
    >
      {(close) => (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg bg-opacity-25 bg-black ">
          <div className="modal relative h-auto w-[70%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-2xl bg-bkg text-content flex flex-col pt-5 py-10 p-5 gap-4">
            <div className="absolute flex align-center p-1 inset-y-0 right-0">
              <IoIosCloseCircleOutline className="text-3xl cursor-pointer" onClick={() => close()} />
            </div>

            <div className="w-full h-full flex flex-col-1 ">
              <div className="flex flex-col">
                <>
                  <Toaster position="top-center" />
                </>
                <h1 className="font-bold text-2xl m-0">
                  Feedback Form
                </h1>
                <p className="block font-normal text-sm flex-row">Tell us your experience about <span className="text-azure font-medium">GabAi.</span></p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={input}
              />
              <textarea
                name="text"
                className={inputMessage}
                placeholder="Your message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              ></textarea>
              <button type="submit" className={button} disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </Popup>
  );

};

export default Feedback;
