"use client";
import React from "react";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);

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
    <div
      className="flex items-center gap-[10px] cursor-pointer"
      onClick={() => {
        setDarkMode(!darkMode);
      }}
    >
      {darkMode ? (
        <BsSunFill size={15} className="dark:text-white text-[#2a3541]" />
      ) : (
        <FaMoon size={15} className="dark:text-white text-[#2a3541]" />
      )}
      {/* <div className="absolute bg-white dark:bg-slate-900 w-[50px] h-6 rounded-full shadow-md transform transition-transform duration-300"></div> */}
      <span className="text-[#000000] dark:text-[#ffffff]">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </span>
    </div>
  );
};

export default ThemeToggle;
