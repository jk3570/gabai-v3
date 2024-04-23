// ChatSidebar.js
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { BaseURL } from '../../BaseURL'
import { useAuthContext } from '../../hooks/useAuthContext';
import Login from "../Login";
import Signup from '../Signup';
import NewChatPopup from '../NewChatPopup';


const ChatSidebar = ({ handleNewChat, handleConversationClick, conversationTitles, toggleSidebar,showRequestButton, setShowRequestButton, inputVisible, setInputVisible }) => {
  // No need for conversations state since we're using conversationTitles passed from props
  const { user, dispatch } = useAuthContext();
  const userid = user?.userid || 'guest';

 useEffect(() => {
    // Fetch conversation titles from the server
    axios.get(`${BaseURL}/gab/conversations/${userid}`)
      .then(response => {
      })
      .catch(error => console.error('Error fetching conversation titles:', error));
  }, []);

  console.log("Conversation Titles:", conversationTitles); // Check the value of conversationTitles

  

  return (
    <div className="flex flex-col justify-between h-screen bg-bkg text-content shadow-xl border-r border-gray-400 border-opacity-10 pt-[3.875rem]">

{/* Conversation History */}  
    {user ?
    <div className="relative flex flex-col h-[88%] w-full ">
      <div className="relative px-4 pt-3 pb-2 flex flex-col gap-4 w-full bg-bkg border-b border-gray-400 border-opacity-50">
        <h2 className="text-md font-medium">Conversation History</h2>
      </div>  

      <div id="history-list" className="relative flex flex-col w-full pt-2 overflow-y-scroll overflow-x-clip">
        <ul>
          {conversationTitles.slice().reverse().map(conversation => ( // Reverse the order of conversationTitles
            <li key={conversation._id} className="flex h-fit w-full px-5 py-2 bg-bkg text-content text-opacity-70 justify-start items-center text-sm transition-all duration-100 ease-in-out hover:bg-azure-100 hover:bg-opacity-50 hover:translate-x-2 cursor-pointer" onClick={() => handleConversationClick(conversation._id)}>
              {conversation.title}
            </li>
          ))}
        </ul>
      </div>
    </div> : <div className="relative p-4 flex flex-col gap-2 w-full bg-bkg border-t border-gray-400 border-opacity-50 pt-7">
          <h2 className="text-base leading-none font-semibold text-label">Sign up or log in</h2>
          <p className="text-xs leading-tight text-content text-opacity-60">Save your <b>chat history </b>and request a <b>video conference </b>with a lawyer.</p>

          <Link to="/#signup" className="relative flex h-10 w-full px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out hover:bg-azure-300">
            <Signup />
          </Link>

          <button className="relative flex h-10 w-full px-3 py-2 bg-gray-400 bg-opacity-20 border-2 border-azure-300 border-opacity-40 text-label rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out hover:bg-gray-300 hover:bg-opacity-30">
            <Login />
          </button>
    </div>}


{/* New Chat Button  */}
      <div className="relative p-4 flex flex-col gap-4 w-full bg-bkg border-t border-gray-400 border-opacity-50">
        {user ? 
        <button className="flex h-10 w-full px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out hover:bg-azure-300"
          onClick={() => {
            handleNewChat();
            toggleSidebar();
            setInputVisible(true); // Show the input field
            setShowRequestButton(false); // Hide the buttons
          }}>
          New Chat
        </button> : 
        <button className="flex h-10 w-full px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out hover:bg-azure-300" >
        <NewChatPopup />
        </button>
      }
      </div> 

    </div>
  );
};

export default ChatSidebar;