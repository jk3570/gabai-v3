import { BsArrowRight } from "react-icons/bs";

const chat = {
  bottom: 0,
};

function Chat() {
  const username = "User";
  const textbox = "w-full h-10 p-2 rounded-full border-2 border-gray-500";
  const submitBtn = "bg-azure text-white font-bold py-2 px-4 rounded-md";

  const prompt = [
    {
      message:
        "Hi Gab, I've been facing some issues at work. I think I'm experiencing discrimination. Can you help?",
      name: username,
      color: "bg-gray-500",
    },
    {
      message:
        "I'm here for you. I'm sorry to hear about your situation. Can you provide some details about the discrimination you're facing?",
      name: "Gab",
      color: "bg-azure",
    },
  ];

  return (
    <div
      style={chat}
      className=" w-full h-[60vh] relative max-w-4xl px-5 lg:px-0 mx-auto mt-20"
    >
      <div className="chatbox mb-12 bottom-0">
        {prompt.map((item, index) => (
          <div key={index} className="p-5 bg-gray-100 ">
            <div className="flex flex-row gap-3 items-center">
              <div
                className={
                  item.color +
                  " h-10 w-10 rounded-full flex justify-center items-center "
                }
              ></div>
              <p>
                <b>{item.name}</b>
              </p>
            </div>
            <br />
            <p className="ml-10">{item.message}</p>
          </div>
        ))}
      </div>
      <form action="" className="flex flex-row gap-1 absolute bottom-0 w-full">
        <input type="text" name="" id="" className={textbox} />
        <button type="submit" className={submitBtn}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
