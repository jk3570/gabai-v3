import Popup from "reactjs-popup";

const button =
  "flex h-10 px-3 py-2 bg-azure text-white rounded-md justify-center items-center w-full text-sm";

const VerCode = () => {
  return (
    <Popup trigger={<p>Sign Up!</p>} modal nested>
      <div className="modal relative h-auto w-[70%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-2xl bg-white flex flex-col pt-7 py-10 p-3">
        <div>
          <h1>Enter Verification Code</h1>
          <p>Please enter the verification code sent to your email.</p>
          <input type="text" placeholder="Verification Code" />
          <button className={button}>Submit</button>
        </div>
      </div>
    </Popup>
  );
};

export default VerCode;
