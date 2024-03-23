import React from 'react';

const ChatHistory = ({ messages }) => {
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
