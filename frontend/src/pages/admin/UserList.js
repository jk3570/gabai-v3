import React from "react";

//Components
import AdminSidebar from "../../components/admin/Sidebar";
import AddNewAccount from "../../components/admin/AddNewAccount";

//SVGs
import { MdEdit } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";

const addUserStyle =
  "flex flex-row justify-center items-center gap-2 p-2 bg-azure-300 rounded-xl text-white hover:bg-azure-400 hover:scale-110 transition-all duration-300";

const list = [
  {
    id: 1,
    name: "Olivia Rodriguez",
    sex: "Female",
    age: 28,
    province: "Bulacan",
    city: "Malolos",
    mobileNumber: "09123456789",
  },
  // ... other users in the list
];

const formatNumber = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
function UserList() {
  return (
    <div className="bg-gray-200 h-screen flex flex-row">
      
      <div className="flex flex-col w-full">
        <div className="p-4">
          <div className="flex justify-between items-center mt-6">
            <h1 className="font-medium">Users</h1>
          </div>
        </div>

        <div className="bg-gray-300 ">
          <div className=" border border-azure overflow-x-auto rounded-lg">
            <table className="w-full table-auto rounded-lg">
              <thead className=" px-10 border border-azure bg-azure">
                <tr>
                  <th className="px-4 py-2 text-left text-white">Name</th>
                  <th className="px-4 py-2 text-left text-white">Sex/ Age</th>
                  <th className="px-4 py-2 text-left text-white">
                    Province/City
                  </th>
                  <th className="px-4 py-2 text-left text-white">
                    Mobile Number
                  </th>
                  <th className="px-4 py-2 text-left text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b last:border-b-0 border-gray-200"
                  >
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{`${user.sex} / ${user.age}`}</td>
                    <td className="px-4 py-2">{`${user.province} / ${user.city}`}</td>
                    <td className="px-4 py-2">{user.mobileNumber}</td>
                    <td className="px-4 py-2 flex flex-row gap-3">
                      <button className="text-black py-1 px-1 bg-gray-200 hover:bg-azure  rounded-full ...  ">
                        <MdEdit className="text-2xl" />
                      </button>
                      <button className="text-black py-1 px-1 bg-gray-200 hover:bg-azure   rounded-full ... ">
                        <FaBoxArchive className="text-2xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center items-center mt-6">
            <AddNewAccount />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
