import { useState, useEffect } from "react";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Fetch initial messages or data from your backend
    fetch("http://localhost:5000/api/chat")
      .then((response) => response.json())
      .then((data) => setMessages(data.messages));
  }, []);

  const sendMessage = () => {
    // Function to send a message to your backend
    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");

    // Send the message to the backend
    fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: [newMessage] }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the response from the server is an object with a 'message' property
        const aiMessage = { role: "ai", content: data.message };
        setMessages([...messages, newMessage, aiMessage]);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="mt-20 h-screen ">
      <div>
        {messages.map((message, index) => (
          <>
            <p>{message.role === "user" ? "user" : "Gab"}</p>
            <p key={index}>{message.content}</p>
          </>
        ))}
      </div>
      <div className="bottom-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
