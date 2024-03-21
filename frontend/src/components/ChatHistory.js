import { FaHistory } from "react-icons/fa";

import "../css/chat-history.css";

const openHistory = () => {
  document.getElementById("chat-history").style.width = "20rem";
};

const closeHistory = () => {
  document.getElementById("chat-history").style.width = "0";
};
const ChatHistory = () => {
  return (
    <>
      <div onClick={openHistory} className="p-3 text-xl">
        <FaHistory className="text-2xl" />
      </div>
      <div id="chat-history" onClick={closeHistory} className="chat-history">
        <h1>Hisory</h1>
        <ul>
          <li>Chat 1</li>
        </ul>
      </div>
    </>
  );
};

export default ChatHistory;
