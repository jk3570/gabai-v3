import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaGripLinesVertical, FaMicrophone, FaPlay, FaStop } from "react-icons/fa"; // Added FaPlay and FaStop icons
import { BsSend } from "react-icons/bs";
import Markdown from 'markdown-to-jsx';
import { useAuthContext } from '../../hooks/useAuthContext';
import ChatSidebar from './ChatSidebar';
import Popup from 'reactjs-popup';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdError } from "react-icons/md";
import RequestForm from '../RequestForm';

import Login from '../Login';

const ChatComponent = () => {
  const { user } = useAuthContext();

  function generateRandomId(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomId = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomId += charset[randomIndex];
    }
    return randomId;
  }

  const userid = user?.userid || generateRandomId(8);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSendDisabled, setIsSendDisabled] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversationId, setConversationId] = useState('');
  const [conversationTitles, setConversationTitles] = useState([]);
  const [summary, setSummary] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestMeetingClicked, setRequestMeetingClicked] = useState(false);
  const [showRequestButton, setShowRequestButton] = useState(false);
  const [inputVisible, setInputVisible] = useState(true);
  const [speaking, setSpeaking] = useState(false); // Added state for tracking speech synthesis
  const chatContentRef = useRef(null);
const button = "flex h-10 px-1 py-1 bg-azure text-white rounded-md justify-center items-center w-full text-xs";
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    setConversationId('');
    fetchConversationTitles();
  };

  const fetchConversationTitles = () => {
    axios.get(`http://localhost:4000/gab/conversations/${userid}`)
      .then(response => {
        setConversationTitles(response.data);
      })
      .catch(error => console.error('Error fetching conversation titles:', error));
  };

  const handleConversationClick = (conversationId) => {
    axios.get(`http://localhost:4000/gab/conversation/${conversationId}`)
      .then(response => {
        setMessages(response.data.messages);
        setConversationId(conversationId);
      })
      .catch(error => console.error('Error fetching conversation:', error));
  };

  const sendMessage = () => {
    if (input.trim() !== '') {
      const newMessage = { role: 'user', content: input };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');

      axios.post(`http://localhost:4000/gab/conversation`, { input, conversationId, userid: userid })
        .then(response => {
          const aiMessage = { role: 'assistant', content: response.data.message };
          setMessages(prevMessages => [...prevMessages, aiMessage]);

          if (!conversationId) {
            setConversationId(response.data.conversationId);
          }

          setSummary(response.data.summary);
          if (
            response.data.message.includes("Thank you for confirming. You can now request a video conference") ||
            response.data.message.includes("Salamat sa pagkumpirma. Maaari ka nang humiling ng isang video conference")
          ) {
            setShowRequestButton(true);
            setInputVisible(false);
          }

        })
        .catch(error => console.error('Error:', error));
    } else {
      console.error('Error: Empty input');
    }
  };

  useEffect(() => {
    setIsSendDisabled(input === '');
  }, [input]);

  useEffect(() => {
    fetchConversationTitles();
  }, []);

  useEffect(() => {
    chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
  }, [messages]);

  const handleSpeechToText = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
    setSpeaking(true);
    utterance.onend = () => {
      setSpeaking(false);
    };
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="relative z-10 w-full h-screen flex flex-row justify-start items-start overflow-x-hidden">
      <div className="flex flex-row w-full h-screen bg-bkg">
        {/* Chat History Sidebar */}
        <div
          id="chat-history"
          className={`transition-all overflow-hidden ${sidebarOpen ? 'w-full md:w-0' : 'w-0 md:w-64'} h-full bg-bkg z-50 shadow-lg left-0 top-0`}
        >
          <ChatSidebar
            handleNewChat={handleNewChat}
            handleConversationClick={handleConversationClick}
            conversationTitles={conversationTitles}
            toggleSidebar={toggleSidebar}
            showRequestButton={showRequestButton}
            setShowRequestButton={setShowRequestButton}
            inputVisible={inputVisible}
            setInputVisible={setInputVisible}
          />
        </div>

        {/* Toggle Sidebar  */}
        <div className="relative z-50 flex h-full items-center justify-center cursor-pointer bg-bkg" onClick={toggleSidebar}>
          <FaGripLinesVertical className="text-label text-2xl" />
        </div>

        {/* Chat Conversation */}
        <div id="chat-content" className={`flex flex-col h-full ${sidebarOpen ? 'w-0 md:w-full' : 'w-full'} mx-auto max-w-4xl justify-between pt-[3.875rem] gap-3`}>
          <div ref={chatContentRef} className="h-full overflow-y-auto flex flex-col gap-2 p-5 pt-7">
            <div className="p-5 bg-gray-400 bg-opacity-20 rounded-xl animate__animated text-content">
              <p><b>Gab</b></p>
              <p>Hello! I'm Gab, your online AI assistant against workplace discrimination in the Philippines. How can I assist you today?</p>
            </div>
            {messages.map((message, index) => (
              <div className="p-5 bg-gray-400 bg-opacity-20 rounded-xl animate__animated text-content" key={index}>
                <p><b>{message.role === 'user' ? 'You' : 'Gab'}</b></p>
                <p><Markdown>{message.content}</Markdown></p>
                {message.role === 'assistant' && (
                  <div className="flex items-center">
                    {!speaking ? (
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => speakText(message.content)}
                      >
                        <FaPlay />
                      </button>
                    ) : (
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={stopSpeaking}
                      >
                        <FaStop />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="relative flex justify-center items-center">
            <div className="flex flex-col justify-center items-center w-full px-3">
              {showRequestButton && !requestMeetingClicked ? (
                <>
                  {user ?
                    <button className="flex h-10 w-full md:w-[50%] px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out hover:bg-azure-300" onClick={() => setShowRequestForm(true) || setRequestMeetingClicked(true)}>
                      Request a video conference</button>
                    :
                    <Popup trigger={
                      <button className="flex h-10 w-full md:w-[50%] px-3 py-2 bg-azure text-white rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out hover:bg-azure-300">Request a video conference</button>
                    } modal>
                      {closeCase => (
                        <div className="modal relative h-auto w-96 rounded-2xl bg-bkg flex flex-col justify-center items-start p-4 text-content border border-gray-200 border-opacity-20 drop-shadow-lg gap-2">
                          <div className="flex flex-col justify-center w-full gap-2">
                            <h1 className="font-semibold text-2xl m-0 flex items-center"><MdError className="text-3xl justify-center text-red-500 inline-block mr-2" />You are not signed in.</h1>
                            <p>Please Sign in order to access this feature.</p>
                            <div className="flex flex-row gap-2 mt-2">
                              {/* <button className={cancelButton}><Login /></button> */}
                              <button className={button} onClick={closeCase}>I understand</button>
                            </div>
                          </div>
                          <button className="absolute top-2 right-2" onClick={closeCase}>
                            <IoIosCloseCircleOutline size={24} />
                          </button>
                        </div>
                      )}
                    </Popup>
                  }

                  <button className="flex h-10 w-full md:w-[50%] px-3 py-2 bg-white border border-azure text-azure rounded-md justify-center items-center text-sm transition-all duration-100 ease-in-out my-2" onClick={() => {
                    setInputVisible(true);
                    setShowRequestButton(false);
                  }}>Continue the conversation</button>
                </>
              ) : (
                <>
                  {inputVisible && (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        sendMessage();
                      }}
                      className="flex flex-row gap-1 bottom-0 w-full py-2 px-2"
                    >
                      <button
                        type="button"
                        className="p-2 text-gray-500 hover:text-gray-700"
                        onClick={handleSpeechToText}
                      >
                        <FaMicrophone className="h-6 w-6" />
                      </button>
                      <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="p-3 border-2 border-gray-500 border-opacity-50 rounded-full w-full bg-bkg text-content"
                        placeholder="Type your message here"
                      />
                      <button
                        type="submit"
                        id="sendBtn"
                        disabled={isSendDisabled}
                        className={
                          isSendDisabled
                            ? 'relative pb-1 pl-1 p-2 text-center text-2xl justify-center ml-2 my-2 rounded-full bg-gray-400 text-white right-0'
                            : 'relative pb-1 pl-1 p-2 text-center text-2xl justify-center ml-2 my-2 rounded-full bg-azure-500 text-white right-0'
                        }>
                        <BsSend className="h-[1em] w-[1em]" />
                      </button>
                    </form>
                  )}
                  <div className="flex justify-center items-center pb-3">
                    <p className="text-gray-400 text-xs">
                      All conversations are completely confidential.
                    </p>
                  </div>
                </>
              )}
            </div>
            {showRequestForm &&
              <RequestForm
                handleNewChat={handleNewChat}
                handleConversationClick={handleConversationClick}
                conversationTitles={conversationTitles}
                toggleSidebar={toggleSidebar}
                showRequestButton={showRequestButton}
                setShowRequestButton={setShowRequestButton}
                inputVisible={inputVisible}
                setInputVisible={setInputVisible}
                summary={summary}
                onClose={() => { setShowRequestForm(false); setRequestMeetingClicked(false); }}
              />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
