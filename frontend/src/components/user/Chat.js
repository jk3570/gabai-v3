import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { HiVideoCamera } from 'react-icons/hi';
import axios from 'axios';
import RequestForm from "../RequestForm.js";
import { BaseURL } from '../../BaseURL'

export const useInputState = () => {
  const [input, setInput] = useState('');
  return { input, setInput };
};

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSendDisabled, setIsSendDisabled] = useState(true);

  const sendMessage = () => {
    if (input.trim() !== '') {
      const newMessage = { role: 'user', content: input };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');

      // Send message to server
      axios.post(`${BaseURL}/gab/conversation`, { input: input })
        .then(response => {
          const aiMessage = { role: 'assistant', content: response.data.message };
          setMessages(prevMessages => [...prevMessages, aiMessage]);
          handleChatEnd([...messages, newMessage, aiMessage]); // Save conversation to database
        })
        .catch(error => console.error('Error:', error));
    } else {
      console.error('Error: Empty input');
    }
  };

  const handleChatEnd = async (conversation) => {
    try {
      // Save conversation to the database
      await axios.post(`${BaseURL}/gab/new-chat`, { title: generateDefaultTitle(), messages: conversation });
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };

  const generateDefaultTitle = () => {
    const currentDate = new Date();
    return `Chat ${currentDate.toLocaleString()}`;
  };

  useEffect(() => {
    setIsSendDisabled(input === '');
  }, [input]);

  return (
    <div className="w-full h-screen relative max-w-4xl px-5 lg:px-0 mx-auto mt-20">
      <div className="h-[80%] overflow-y-scroll flex flex-col gap-2 p-5">
        {messages.map((message, index) => (
          <div className="p-5 bg-gray-100 rounded-xl animate__animated" key={index}>
            <p><b>{message.role === 'user' ? 'You' : 'Gab'}</b></p>
            <p><Markdown>{message.content}</Markdown></p>
          </div>
        ))}
      </div>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex flex-row gap-1 bottom-0 w-full py-2"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="p-3 border-2 border-black rounded-full w-full"
            placeholder="Type your message here"
          />

          <button
            type="submit"
            id="sendBtn"
            disabled={isSendDisabled}
            className={
              isSendDisabled
                ? 'p-3 rounded-xl bg-gray-400 text-white'
                : 'p-3 rounded-xl bg-azure-300 text-white'
            }>
            Send
          </button>

          {/* <Link to="/lawyer/video-conference" className="p-3 rounded-xl bg-azure text-white">
            <HiVideoCamera className="text-xl" />
          </Link> */}
        </form>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-gray-400 text-sm">
          All conversation is completely confidential.
        </p>
      </div>
      <RequestForm />
    </div>
  );
};

export default ChatComponent;