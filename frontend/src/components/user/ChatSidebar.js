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
    <div className="relative h-screen flex flex-col w-64 bg-white shadow-xl">
      <div className="relative px-4 pt-3 pb-2 flex flex-col gap-4 w-full bg-white border-b">
        <h2 className="text-md font-medium">Conversation History</h2>
      </div>  
      <div className="relative p-4 h-[8.5rem] flex flex-col gap-4 w-full bg-white border-t bottom-0">
        <button className="flex h-10 w-full px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out hover:bg-azure-300" onClick={handleNewChat}>
          New Chat
        </button> 
        <ul>
          {conversationTitles.slice().reverse().map(conversation => ( // Reverse the order of conversationTitles
            <li key={conversation._id} className="flex h-10 w-full px-3 py-2 bg-white text-azure rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out hover:bg-azure-100 cursor-pointer" onClick={() => handleConversationClick(conversation._id)}>
              {conversation.title}
            </li>
          ))}
        </ul>
      </div> 
    </div>
  );
};

export default ChatSidebar;
