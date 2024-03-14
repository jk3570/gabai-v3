import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      message: input,
      name: "User",
      color: "bg-gray-500",
    };
    setMessages([...messages, newMessage]);
    setInput("");

    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: [newMessage] }),
    });

    const data = await response.json();
    console.log("AI Response:", data); // Debugging line to log the AI response

    const chatbotResponse = {
      message: data.message, // Assuming the backend sends back { message: "Chatbot response" }
      name: "Gab",
      color: "bg-azure",
    };
    setMessages([...messages, newMessage, chatbotResponse]);
  };

  return (
    <div
      style={{ bottom: 0 }}
      className="w-full h-screen relative max-w-4xl px-5 lg:px-0 mx-auto mt-20"
    >
      <div className="chatbox mb-12 bottom-0">
        {messages.map((item, index) => (
          <div key={index} className="p-5 bg-gray-100 ">
            <div className="flex flex-row gap-3 items-center">
              <div
                className={
                  item.color +
                  " h-10 w-10 rounded-full flex justify-center items-center "
                }
              ></div>
              <p>
                <b>{item.name}</b>
              </p>
            </div>
            <br />
            <p className="ml-10">{item.message}</p>
          </div>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
        className="flex flex-row gap-1 absolute bottom-0 w-full"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-10 p-2 rounded-full border-2 border-gray-500"
        />
        <button
          type="submit"
          className="bg-azure text-white font-bold py-2 px-4 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
