import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { HiVideoCamera } from 'react-icons/hi';
import axios from 'axios';
import RequestForm from "../RequestForm.js";
import { BaseURL } from '../../BaseURL'

import { FaGripLinesVertical } from "react-icons/fa";
import ChatSidebar from './ChatSidebar.js';
import { BsSend } from "react-icons/bs";

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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative z-10 w-full h-screen flex flex-row justify-start items-start">
      {/* "relative z-10 w-full min-h-screen flex flex-col justify-start items-center px-5 lg:px-0 pt-[3.875rem]" */}
    <div className="flex flex-row w-full h-screen pt-[3.875rem]">
        
        <div
          id="chat-history"
          className={`transition-all overflow-hidden w-${sidebarOpen ? '0' : '64'} h-full bg-white z-50 shadow-lg left-0 top-0`}
          style={{ width: sidebarOpen ? '0px' : '256px' }}
        >
          <ChatSidebar />
        </div>
        <div className="flex h-full items-center" onClick={toggleSidebar}>
          <FaGripLinesVertical className="text-azure text-2xl" />
        </div>

      <div id="chat-content" className="flex flex-col w-full h-full mx-auto max-w-4xl justify-between">
        <div className="h-full overflow-y-auto flex flex-col gap-2 p-5">
          {messages.map((message, index) => (
            <div className="p-5 bg-gray-100 rounded-xl animate__animated" key={index}>
              <p><b>{message.role === 'user' ? 'You' : 'Gab'}</b></p>
              <p><Markdown>{message.content}</Markdown></p>
            </div>
          ))}
        </div>
        <div className="relative items-center">
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
                      ? 'absolute pb-1 pl-1 p-2 text-center text-2xl justify-center mx-2 mt-1 rounded-full bg-gray-400 text-white right-0'
                      : 'absolute pb-1 pl-1 p-2 text-center text-2xl justify-center mx-2 mt-1 rounded-full bg-azure-500 text-white right-0'
                  }>
                <BsSend className="h-[1em] w-[1em]"/>
              </button>

{/*               <Link to="/lawyer" className="p-3 rounded-xl bg-azure text-white">
                <HiVideoCamera className="text-xl" />
              </Link> */}
            </form>
          </div>
          <div className="flex justify-center items-center pb-3">
            <p className="text-gray-400 text-xs">
              All conversation is completely confidential.
            </p>
          </div>
        </div>

      </div>
    </div>  
    </div>
  );
};

export default ChatComponent;
