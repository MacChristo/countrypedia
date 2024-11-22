import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex w-[100%] justify-center header-shadow bg-[#ffffff] dark:bg-[#2b3743]">
      <div className="flex flex-row w-[90%] py-3 justify-between">
        <h2 className="text-[#171717] dark:text-[#ffffff]">
          Where in the world?
        </h2>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
