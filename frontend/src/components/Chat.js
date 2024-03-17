import { useState, useEffect } from "react";

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
        const aiMessage = { role: "ai", content: data.message };
        setMessages([...messages, newMessage, aiMessage]);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    setIsSendDisabled(input === "");
  }, [input]);

  return (
    <div className="w-full h-[60vh] relative max-w-4xl px-5 lg:px-0 mx-auto mt-20">
      <div>
        {messages.map((message, index) => (
          <div className="p-5 bg-gray-100 " key={index}>
            <p>{message.role === "user" ? "You" : "Gab"}</p>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent the default form submission behavior
          sendMessage(); // Call your sendMessage function
        }}
        className="flex flex-row gap-1 absolute bottom-0 w-full"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-3"
          placeholder="Type your message here"
        />
        <button type="submit" id="sendBtn" disabled={isSendDisabled}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
