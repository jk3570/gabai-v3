import React, { useState } from "react";

import { useParticipant, useMeeting } from "@videosdk.live/react-sdk";

import { MdCallEnd } from "react-icons/md";

import { IoIosMic, IoIosMicOff } from "react-icons/io";

import { HiMiniVideoCamera, HiMiniVideoCameraSlash } from "react-icons/hi2";

const leaveBtnStyle =
  "bg-red-500 p-3 rounded-full text-white text-center hover:bg-red-300 transition-all duration-150";
const btnStyle =
  "bg-azure p-3 rounded-full text-white text-center hover:bg-azure-300 transition-all duration-150";
const disabledBtnStyle =
  "bg-gray-500 p-3 rounded-full text-white text-center hover:bg-gray-300 transition-all duration-150";

function Controls(props) {
  // Get participant data and meeting functions from the SDK
  const { webcamStream, micStream, isLocal } = useParticipant(
    props.participantId
  );
  const { leave, toggleMic, toggleWebcam } = useMeeting();

  // State variables to keep track of mic and webcam state
  const [micOn, setMicOn] = useState(true);
  const [webcamOn, setWebcamOn] = useState(true);

  // Function to toggle microphone state
  const handleMicToggle = () => {
    toggleMic(); // Call SDK function to toggle microphone
    setMicOn((prevState) => !prevState); // Toggle micOn state
  };

  // Function to toggle webcam state
  const handleWebcamToggle = () => {
    toggleWebcam(); // Call SDK function to toggle webcam
    setWebcamOn((prevState) => !prevState); // Toggle webcamOn state
  };

  const leaveBtn = () => {
    // Display a confirmation dialog using alert
    if (window.confirm("Do you want to leave the meeting?")) {
      alert("You've left the meeting");
      leave(); // Call the leave function if user confirms
    }
  };

  return (
    <div className="flex flex-row gap-2">
      {/* Button to leave the meeting */}
      <button className={leaveBtnStyle} onClick={leaveBtn}>
        <MdCallEnd />
      </button>
      {/* Button to toggle microphone */}
      <button
        className={micOn ? btnStyle : disabledBtnStyle}
        onClick={handleMicToggle}
      >
        {micOn ? <IoIosMic /> : <IoIosMicOff />}
      </button>
      {/* Button to toggle webcam */}
      <button
        className={webcamOn ? btnStyle : disabledBtnStyle}
        onClick={handleWebcamToggle}
      >
        {webcamOn ? <HiMiniVideoCamera /> : <HiMiniVideoCameraSlash />}
      </button>
    </div>
  );
}

export default Controls;
