import React, { useState } from "react";
import GenderDemo from "./GenderDemo";
import LocationDemo from "./LocationDemo";
import AgeDemo from "./AgeDemo";

function Tabs() {

    return(
<div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
    <div className="w-full max-w-lg">
        <ul className="flex border-b">
            <li className="-mb-px mr-1">
                <a href="#" 
                className="bg-white inline-block border-l border-t border-r rounded-t 
                                                    py-2 px-4 text-blue-700 font-semibold">Gender</a>
            </li>
            <li className="mr-1">
                <a href="#" 
                className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">Age</a>
            </li>
            <li className="mr-1">
                <a href="#" 
                className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">Location</a>
            </li>
        </ul>
        <div className="bg-white p-4">
            <div x-show="selectedTab === 'gender'">
                <GenderDemo />
            </div>
            <div x-show="selectedTab === 'age'" style={{ display: 'none' }}>
                <AgeDemo />
            </div>
            <div x-show="selectedTab === 'location'" style={{ display: 'none' }}>
                <LocationDemo />
            </div>
        </div>
    </div>
</div>

    );


}

export default Tabs;