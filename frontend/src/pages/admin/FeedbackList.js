import React from "react";

//
import Sidebar from "../../components/admin/Sidebar";

import { LiaReplySolid } from "react-icons/lia";
import { FaBoxArchive } from "react-icons/fa6";
const FeedBacks = [
  {
    id: 1,
    name: "Olivia Rodriguez",
    sex: "Female",
    age: 28,
    province: "Bulacan",
    city: "Malolos",
    mobileNumber: "09123456789",
    password: "c4a81f6b32e59...",
  },
  // ... other users in the list
];

const formatNumber = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
function FeedbackList() {
  return (
    <div className="bg-gray-200 h-screen flex flex-row p-1">
      <Sidebar />
      <div className="flex flex-col w-full mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h1 className="font-medium">Feedback</h1>
          </div>
        </div>

        <div className="bg-gray-300 ">
          <div className=" border border-azure overflow-x-auto rounded-lg">
            <table className="w-full table-auto rounded-lg">
              <thead className=" px-10 border border-ausre bg-azure">
                <tr>
                  <th className="px-4 py-2 text-left text-white">Name</th>
                  <th className="px-4 py-2 text-left text-white">Message</th>
                  <th className="px-4 py-2 text-left text-white">Date</th>
                  <th className="px-6 py-2 text-left text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {FeedBacks.map((cases) => (
                  <tr
                    key={FeedBacks.id}
                    className="border-b last:border-b-0 border-gray-200"
                  >
                    <td className="px-4 py-2">{FeedBacks.name}</td>
                    <td className="px-4 py-2">{`${FeedBacks.message} / `}</td>
                    <td className="px-4 py-2">{`${FeedBacks.date} / `}</td>
                    <td className="px-4 py-2">
                      <span className="flex flex-row gap-2">
                        <button className="text-black py-1 px-1 bg-gray-200 hover:bg-azure  rounded-full ...  ">
                          <LiaReplySolid className="text-2xl" />
                        </button>
                        <br />
                        <button className="text-black py-1 px-1 bg-gray-200 hover:bg-azure  rounded-full ...  ">
                          <FaBoxArchive className="text-2xl" />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackList;
