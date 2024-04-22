import { useState, useEffect } from "react";
import Popup from "reactjs-popup";

import { IoMdArrowDropdownCircle } from "react-icons/io";
import { TbSunFilled, TbMoonFilled } from "react-icons/tb";


const ThemesDropdown = () => {

    
    //Theme Toggle
    const [theme, setTheme] = useState();

    const setLightTheme = () => {
        setTheme('light');
        document.documentElement.setAttribute('data-theme', 'light');
      };
      
      const setDarkTheme = () => {
        setTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      };

    return(
        <>
        <Popup
            trigger={<button className="flex flex-row justify-between items-center w-full cursor-pointer font-normal leading-none">
                Themes
                <IoMdArrowDropdownCircle className="text-xl"/></button>}
            modal
            nested
        >
            {(close) => (
                <div className="fixed z-50 top-0 right-0 flex translate-y-[11rem] translate-x-[-2rem]">
                    <div className="modal w-52 h-auto bg-bkg rounded-md justify-between items-center border drop-shadow-lg text-xs text-content font-medium py-1">

                        <button onClick={setLightTheme} className="flex flex-row justify-between w-full p-1 px-4 hover:bg-azure-50 hover:bg-opacity-20 cursor-pointer">
                        Light <TbSunFilled className="text-sm" />
                        </button>
                        
                        <button onClick={setDarkTheme} className="flex flex-row justify-between w-full p-1 px-4 hover:bg-azure-50 hover:bg-opacity-20 cursor-pointer">
                        Dark <TbMoonFilled className="text-sm" />
                        </button>

                    </div>

                </div>
            )}
            
        </Popup>
        
        </>
    )
}

export default ThemesDropdown;