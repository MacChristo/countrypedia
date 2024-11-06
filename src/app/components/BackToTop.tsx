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
      if (window.scrollY >= 20) {
        setDisplay("block");
      } else {
        setDisplay("none");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    // The return statement removes the event listener when the component unmounts
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
