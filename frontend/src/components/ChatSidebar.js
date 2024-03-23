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

    return (
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow">
        <div className="p-4">
        <br/>
        <br/>
        <br/>
          <h2 className="text-xl font-semibold mb-4">Conversation History</h2>
                    <button onClick={handleNewChatSubmit} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            New Chat
          </button> 
          <ul>
            {chats.map(chat => (
              <li key={chat._id}>
                <Link to={`/gab/chat/${chat._id}`} className="text-blue-600 hover:underline">{chat.title}</Link>
              </li>
            ))}
          </ul>

        </div>
      </div>
    );
  };

  export default ChatSidebar;
