import Popup from "reactjs-popup";

const profileSettings = () => {
  const btnBlue = "bg-azure-500 text-white p-2 w-full rounded-xl";
  const bg =
    "modal h-auto w-[31.25rem] rounded-2xl bg-white flex flex-col justify-center mx-10 p-3";
  const picture = "h-[7rem] w-[7rem] bg-gray-300 rounded-full";
  const updateBtn = " border-2 border-azure rounded-xl p-2 text-azure-500";
  const deleteBtn = "bg-azure text-white p-3 rounded-xl";
  return (
    <>
      <Popup
        trigger={<button className={btnBlue}>Edit Profile</button>}
        modal
        nested
      >
        {(close) => (
          <div>
            <div className={bg}>
              <center>
                <div>
                  <h2 className="font-bold">Account Profile</h2>
                </div>

                <div className={picture}></div>
              </center>

              <form action="">
                <div className="flex flex-col">
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-[auto] border-2 border-black rounded-xl p-2"
                  />
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-[auto] border-2 border-black rounded-xl p-2"
                  />
                  <label htmlFor="">Username</label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-[auto] border-2 border-black rounded-xl p-2"
                  />
                  <div className="grid grid-cols-2 gap-x-2 items-center justify-between py-1">
                    {/* Sex dropdown*/}
                    <div className="flex flex-col">
                      <label htmlFor="">Gender</label>

                      <select className="border-2 border-black rounded-xl p-2">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>

                    <div className="flex flex-col">
                      {/* Birthdate */}
                      <label htmlFor="">Birthdate</label>
                      <input
                        type="date"
                        name=""
                        id=""
                        className="border-2 border-black rounded-xl p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      {/* Province */}
                      <label htmlFor="">Province</label>
                      <select
                        name=""
                        id=""
                        className="border-2 border-black rounded-xl p-2"
                      ></select>
                    </div>
                    <div className="flex flex-col">
                      {/* City */}
                      <label htmlFor="">City</label>

                      <select
                        name=""
                        id=""
                        className="border-2 border-black rounded-xl p-2"
                      ></select>
                    </div>
                  </div>

                  {/* Mobile #*/}
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border-2 border-black rounded-xl p-2"
                  />

                  {/* Password*/}
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    name=""
                    id=""
                    className="border-2 border-black rounded-xl p-2"
                  />

                  {/* Confirm Password*/}
                  <label htmlFor="">Confirm Password</label>
                  <input
                    type="password"
                    name=""
                    id=""
                    className="border-2 border-black rounded-xl p-2"
                  />
                </div>
              </form>
              <div className="flex flex-row justify-center items-center">
                <button className={deleteBtn}>Delete</button>
                <span className="p-2"></span>
                <button className={updateBtn}>Update</button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};

export default profileSettings;
