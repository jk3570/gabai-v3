import { Link } from "react-router-dom";

import Markdown from "react-markdown";

import { useState, useEffect } from "react";

import { HiMiniVideoCamera } from "react-icons/hi2";

import ChatHistory from "./ChatHistory";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSendDisabled, setIsSendDisabled] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/chat")
      .then((response) => response.json())
      .then((data) => setMessages(data.messages));
  }, []);

  const sendMessage = () => {
    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");

    fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: [newMessage] }),
    })
      .then((response) => response.json())
      .then((data) => {
        const aiMessage = { role: "assistant", content: data.message };
        setMessages([...messages, newMessage, aiMessage]);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    setIsSendDisabled(input === "");
  }, [input]);

  return (
    <div className="w-full h-screen relative max-w-4xl px-5 lg:px-0 mx-auto mt-20">
      <ChatHistory />
      <div
        className="
      h-[80%] overflow-y-scroll flex flex-col gap-2 p-5
      "
      >
        {messages.map((message, index) => (
          <div
            className="p-5 bg-gray-100 rounded-xl animate__animated"
            key={index}
          >
            <p>
              {" "}
              <b>{message.role === "user" ? "You" : "Gab"}</b>
            </p>
            <p>
              <Markdown>{message.content}</Markdown>
            </p>
          </div>
        ))}
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent the default form submission behavior
            sendMessage(); // Call your sendMessage function
          }}
          className="flex flex-row gap-1 bottom-0 w-full py-2"
          type="submit"
        >
          <div className="w-[5rem] text-black"></div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-3 border-2 border-black rounded-full w-full"
            placeholder="Type your message here"
          />
          <button
            type="submit"
            id="sendBtn"
            disabled={isSendDisabled}
            className={
              isSendDisabled
                ? "p-3 rounded-xl bg-gray-400 text-white"
                : "p-3 rounded-xl bg-azure-300 text-white"
            }
          >
            Send
          </button>
          <Link to="/lawyer" className="p-3 rounded-xl bg-azure text-white">
            <HiMiniVideoCamera className="text-xl" />
          </Link>
        </form>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-gray-400 text-sm">
          All conversation is completely confidential.
        </p>
      </div>
    </div>
  );
};

export default ChatComponent;
