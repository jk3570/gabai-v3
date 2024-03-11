//import sec2 from "./img/sec2.png";
import sec2 from "../../img/sec2.jpg";

function Section2() {
  return (
    <div
      className="relative z-10  bg-gray-100
      rounded-lg
      flex flex-row justify-around items-center px-[3rem]
      max-md:flex-col
      max-md:px-2
      "
    >
      <div className="flex justify-center items-center shrink-0">
        <img
          src={sec2}
          alt="law "
          className="flex-shrink-0 resize-none w-[15rem] h-[15rem] rounded-full my-8"
        />
      </div>
      <div className="px-5 max-md:hidden">{/* Just to give them space*/}</div>
      <div className="p-0">
        <h1 className=" text-4xl font-bold mb-4 max-md:text-center">
          About 
          <span className="text-white pl-2 pr-2.5 text-3xl font-medium bg-azure ml-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl">
            GabAi</span>
        </h1>
        
        <p
          className="text-justify text-1xl
        max-md:text-center"
        >
          Welcome to GabAi, your go-to web application for comprehensive legal
          guides against workplace discrimination in the Philippines. Empower
          yourself with valuable insights into local laws, employee rights, and
          practical strategies for fostering a fair and inclusive workplace.
        </p>
      </div>
    </div>
  );
}

export default Section2; 