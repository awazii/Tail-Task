import React from 'react'
import { useState, useRef ,useEffect} from 'react';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import  lightlogo from "../assets/light.png"
import  darklogo from "../assets/dark.png"
const Navbar = ({ showsidebar }) => {
    const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };
      useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

    return (
        <div className='Navbar w-full  gap-5 bg-light-bg dark:bg-dark-bg flex items-center justify-center .toggletheme'>
            <div className="left sm:basis-[5%] basis-[15%] ">
                <div className="hamburgercontainer  hamburgerbtn cursor-pointer  flex items-center justify-center" onClick={showsidebar}>
                    <RxHamburgerMenu className='w-7 h-7' />
                </div>
            </div>
            <div className="middle flex-grow justify-items-center ">
                <div className="logo-container w-30  h-30  border-zinc-950 flex items-center justify-center ">
                    <img className='w-full h-full object-contain' src={darkMode ? darklogo : lightlogo} alt="logo" />
                </div>
            </div>
            <div className="right sm:basis-[5%] basis-[15%] justify-items-center cursor-pointer  ">
                <div className="theme ">
                    {darkMode ? (
                        <MdLightMode className='w-8 h-8 hover:text-light-primary' onClick={toggleTheme} />
                    ) : (
                        <MdDarkMode className='w-8 h-8 hover:text-blue-700' onClick={toggleTheme} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
