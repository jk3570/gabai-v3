  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import axios from 'axios';

  const ChatSidebar = () => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
      // Fetch chats from backend when component mounts
      fetchChats();
    }, []);

    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:4000/gab/all-chat');
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    const generateDefaultTitle = () => {
      const currentDate = new Date();
      return `Chat ${currentDate.toLocaleString()}`;
    };

    const handleNewChatSubmit = async () => {
      try {
        // Clear the current conversation
        setChats([]);
        // Create a new chat (conversation)
        await axios.post('http://localhost:4000/gab/new-chat', { title: generateDefaultTitle(), messages: [] });
        // Fetch chats again to update the sidebar
        fetchChats();
      } catch (error) {
        console.error('Error creating new chat:', error);
      }
    };

    const button = "flex h-10 w-full px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out hover:bg-azure-300"

    return (
      <div className="relative h-screen flex flex-col  w-64 bg-bkg shadow-xl text-content border-r border-gray-600 border-opacity-30">
        
          <div className="relative px-4 pt-3 pb-2 flex flex-col gap-4 w-full bg-bkg border-b border-gray-600 border-opacity-30 text-content">
            <h2 className="text-md font-medium">Conversation History</h2>
          </div>  
        <div className="flex flex-col w-full h-[75%] overflow-y-scroll">

          <div className="">
            <ul>{chats.map(chat => (
              <div className="w-full p-2 px-4 hover:p-3 hover:px-4 hover:bg-azure-50 hover:bg-opacity-20 cursor-pointer text-sm">                
                <li key={chat._id}>
                  <Link to={`/gab/chat/${chat._id}`} className="text-azure">{chat.title}</Link>
                </li>
              </div>
              ))}
            </ul>
          </div>
        </div>
          <div className="relative p-4 h-[8.5rem] flex flex-col gap-4 w-full bg-bkg border-t border-gray-600 border-opacity-30 bottom-0">
              <button onClick={handleNewChatSubmit} className={button}>
              New Chat
              </button> 
          </div> 

 
      </div>
    );
  };

  export default ChatSidebar;
