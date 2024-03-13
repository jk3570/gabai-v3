import { useState } from "react";
import Popup from "reactjs-popup";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Signup from "./Signup";
import { useLogin } from "../hooks/useLogin";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const Login = ({ setLoginSuccess }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const { login, error, isLoading } = useLogin();
  // const [isFormValid, setIsFormValid] = useState(false);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eyeOff);
      setType("text");
    } else {
      setIcon(eye);
      setType("password");
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
    await login(identifier, password);
};

  //   const notify = () => {
  //   toast.success("Account has been created successfully!", {
  //     position: "top-center",
  //     duration: 1000,
  //   });
  // }

  //   useEffect(() => {
  //   // Check if identifier and password are not empty
  //   setIsFormValid(identifier.trim() !== "" && password.trim() !== "");
  // }, [identifier, password]);


  return (
    <Popup
      trigger={
        <button
          className="rounded-xl p-4 py-1.5 bg-azure-500 text-white hover:scale-[1.1] transition-all duration-100 ease-in-out
        relative z-10
        after:absolute after:-z-20  after:h-1 after:w-1 after:bg-azure-300 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[50] after:hover:transition-all after:hover:duration-650 after:transition-all after:duration-300"
        >
          Log in
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg bg-opacity-25 bg-black ">
          <div className="modal h-[23rem] w-[31.00rem] rounded-2xl bg-white flex flex-col mx-10 ">
            <div className="flex flex-row align-center justify-end p-1">
              <IoIosCloseCircleOutline
                className="text-3xl cursor-pointer"
                onClick={() => close()}
              />
            </div>
                      {/* <div>
                        <Toaster position="top-center" />
                      </div> */}

            <div className="flex flex-col items-center justify-center">
              <h1 className="font-bold text-4xl">
                Log in to <span className="text-azure">GabAi</span>
              </h1>
              <p>Empower your workplace today!</p>
              <br />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center justify-center">
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  placeholder="Email or Username"
                  onChange={(e) => setIdentifier(e.target.value)}
                  value={identifier}
                  className="w-[25rem] border-2 border-black rounded-xl p-2"
                />
                <span className="py-2"></span>
                <div className="flex">
                  <input
                    type={type}
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    className="w-[25rem] border-2 border-black rounded-xl p-2"
                  />
                  <span
                    class="flex justify-around items-center"
                    onClick={handleToggle}
                  >
                    <Icon class="absolute mr-10" icon={icon} size={15} />
                  </span>
                </div>

                {error && <span className="text-red-500 error">{error}</span>}
              </div>
              <a href="/forgotpassword" className="flex flex-row items-center justify-center">Forgot password?</a>
              
              <div className="mx-12">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-azure-500 text-white font-bold rounded-xl p-2"
                  // onClick={error ? undefined : notify}
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="flex flex-row items-center justify-center">
              <p>
                Don't have an account? <Signup />
              </p>
            </div>
          </div>
        </div>

        
      )}
    </Popup>
  );
};

export default Login;
