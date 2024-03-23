import React from 'react';

<<<<<<< HEAD:frontend/src/components/ChatHistory.js
const ChatHistory = ({ messages }) => {
=======
import "../../css/chat-history.css";

const openHistory = () => {
  document.getElementById("chat-history").style.width = "35rem";
};

const closeHistory = () => {
  document.getElementById("chat-history").style.width = "0rem";
};
const ChatHistory = () => {
>>>>>>> 353644c3d959ca6ec037ca6c378426d3fd24f90b:frontend/src/components/user/ChatHistory.js
  return (
    <div className="absolute top-0 left-0 w-full h-[20%] overflow-y-scroll bg-white shadow-md px-5 py-3 rounded-b-xl">
      <h2 className="text-lg font-bold mb-2">Chat History</h2>
      <div className="flex flex-col gap-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
            }`}
          >
            <p className="font-semibold">{message.role === 'user' ? 'You:' : 'Gab:'}</p>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
