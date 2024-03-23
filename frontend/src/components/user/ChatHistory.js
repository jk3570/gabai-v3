import { FaHistory } from "react-icons/fa";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import "../../css/chat-history.css";

const openHistory = () => {
  document.getElementById("chat-history").style.width = "35rem";
};

const closeHistory = () => {
  document.getElementById("chat-history").style.width = "0rem";
};
const ChatHistory = () => {
  return (
    <>
      <div
        onClick={openHistory}
        className="p-3 text-xl w-[1rem] h-full absolute grid items-center"
      >
        <FaChevronRight className="text-2xl" />
      </div>
      <div
        id="chat-history"
        onClick={closeHistory}
        className="chat-history flex flex-row justify-between"
      >
        <div>
          <h1>History</h1>
          <ul>
            <li>Chat 1</li>
            <li>Chat 2</li>
          </ul>
        </div>
        <div className="grid items-center text-2xl">
          <FaChevronLeft />
        </div>
      </div>
    </>
  );
};

export default ChatHistory;
