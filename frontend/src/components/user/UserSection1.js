import lawJust from "../../img/justice.png";
import { Link } from "react-router-dom";


const UserSection1 = () => {

  return (
    <div
      className="relative flex flex-col justify-center items-center h-full w-screen"
    >
        <div class="absolute w-screen h-screen z-0 overflow-clip">
                <img 
                id="backgroundImage" 
                className="absolute scale-[75%] translate-x-[10rem] -translate-y-[15rem] opacity-20" 
                src={lawJust} alt="Background Image">
                </img>
        </div>

      <div 
      className="flex z-10 flex-row justify-center items-centere">
        <div className="flex flex-col gap-y-6 justify-center">
          <div className="flex flex-col text-center gap-y-6">
          <h1
            className="
              text-8xl font-medium my-0
              leading-none h-[5rem]
              max-md:text-center
              max-md:mx-1
              text-azure
            "
          >Hello, I'm Gab!
          </h1>
          <h1
            className="
              pl-[0.4rem]
              text-3xl font-normal my-0
              max-md:text-center
              max-md:mx-1
            "
          >
            your guide against workplace discrimination.
         </h1>
          </div>
          
{/*           <p className="text-1xl my-0 max-md:text-center">
            Explore our guide on workplace discrimination laws <br/> in the
            Philippines to gain insights into legal protections.
          </p> */}

          <div className="flex justify-center">
            
            <div className="group relative h-25 w-full">
             <Link to ="/gab/chat">
              <button                
              className="group relative w-full px-3 z-30 py-2 bg-azure rounded-lg hover:scale-[1.1] text-white after:-z-20 after:absolute after:h-1 after:w-1 after:bg-azure-300 after:left-5 overflow-hidden after:bottom-0  after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-600 text-2xl"
              >
                Let's talk!
              </button>
              </Link>
              <span className="absolute z-0 left-6 translate-y-8 w-6 h-6 bg-azure rotate-45 overflow-self-visible"></span>
            </div>
            
          </div>
        </div>


      </div>
    </div>
  );
};

export default UserSection1;