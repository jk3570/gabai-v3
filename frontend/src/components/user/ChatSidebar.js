
// ChatSidebar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatSidebar = ({ handleNewChat, handleConversationClick, conversationTitles }) => {
  // No need for conversations state since we're using conversationTitles passed from props

  useEffect(() => {
    // Fetch conversation titles from the server
    axios.get("http://localhost:4000/gab/conversations")
      .then(response => {
        console.log("Fetched conversations:", response.data);
        // No need to set conversations state here
      })
      .catch(error => console.error('Error fetching conversations:', error));
  }, []);

  console.log("Conversation Titles:", conversationTitles); // Check the value of conversationTitles

  return (
    <div className="relative h-screen flex flex-col w-64 bg-bkg text-content shadow-xl border-r border-gray-400 border-opacity-10">

      <div className="relative px-4 pt-3 pb-2 flex flex-col gap-4 w-full bg-bkg border-b border-gray-400 border-opacity-50">
        <h2 className="text-md font-medium">Conversation History</h2>
      </div>  

      <div className="flex flex-col w-full h-[80%] pt-2 overflow-y-scroll overflow-x-clip">
        <ul>
          {conversationTitles.slice().reverse().map(conversation => ( // Reverse the order of conversationTitles
            <li key={conversation._id} className="flex h-fit w-full px-5 py-2 bg-bkg text-content text-opacity-70 justify-start items-center text-sm transition-all duration-100 ease-in-out hover:bg-azure-100 hover:bg-opacity-50 hover:translate-x-2 cursor-pointer" onClick={() => handleConversationClick(conversation._id)}>
              {conversation.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative p-4 h-[8.5rem] flex flex-col gap-4 w-full bg-bkg border-t border-gray-400 border-opacity-50 bottom-0">
        <button className="flex h-10 w-full px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out hover:bg-azure-300" onClick={handleNewChat}>
          New Chat
        </button> 
      </div> 

    </div>
  );
};

export default ChatSidebar;
