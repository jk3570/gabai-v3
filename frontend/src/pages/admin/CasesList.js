import React from "react";

// Component
import Sidebar from "../../components/admin/Sidebar";

import { FaBoxArchive } from "react-icons/fa6";

const Cases = [
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
function CasesList() {
  return (
    <div className="bg-gray-200 h-screen flex flex-row">
      
      <div className="flex flex-col w-full mx-auto max-w-6xl">
        <div className="p-4">
          <div className="flex justify-between items-center mt-6">
            <h1 className="font-medium item-center">Cases</h1>
          </div>
        </div>

        <div className="bg-gray-300">
          <div className=" border border-azure overflow-x-auto rounded-lg">
            <table className="w-full table-auto rounded-lg">
              <thead className=" px-10 border border-azure bg-azure  ">
                <tr>
                  <th className="px-4 py-2 text-left text-white">Name</th>
                  <th className="px-4 py-2 text-left text-white">Case</th>
                  <th className="px-4 py-2 text-left text-white">Date</th>
                  <th className="px-6 py-2 text-left text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {Cases.map((cases) => (
                  <tr
                    key={Cases.id}
                    className="border-b last:border-b-0 border-gray-200"
                  >
                    <td className="px-4 py-2">{cases.name}</td>
                    <td className="px-4 py-2">{`${Cases.cases} / `}</td>
                    <td className="px-4 py-2">{`${Cases.date} / `}</td>
                    <td className="px-4 py-2">
                      <button className="text-black py-1 px-1 bg-gray-200 hover:bg-azure  rounded-full ... ">
                        <FaBoxArchive className="w-6 h-6" />
                      </button>
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

export default CasesList
;
