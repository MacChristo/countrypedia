"use client";
import React, { useEffect, useState } from "react";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

const BackToTop = () => {
  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const [display, setDisplay] = useState("none");
  useEffect(() => {
    const handleScroll = () => {
      () => (window.scrollY >= 20 ? setDisplay("Block") : setDisplay("none"));
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    //the return statement is what unmounts or removes the event from the component
  }, []);
  return (
    <BsFillArrowUpSquareFill
      className="back-to-top flex justify-center"
      onClick={scrollToTop}
      style={{ display: display }}
    />
  );
};

export default BackToTop;
