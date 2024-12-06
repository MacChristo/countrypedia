"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdSearch } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useCountryContext } from "./CountryContext";
import { CountryTypes } from "./CountryContext";
import Image from "next/image";

interface itemType {
  region: string;
  name: { common: string };
}

const CountryCards = () => {
  //selectedRegion is a variable that holds the selected filter region
  const [selectedRegion, setSelectedRegion] = useState<string>("All Region");
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [visibleRegion, setVisibleRegion] =
    useState<string>("Filter by Region");
  const regionList = [
    "All Region",
    "Africa",
    "Antarctic",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms(event.target.value);
  };

  //This accesses the context to set the selected country.
  const { countries, resError, resIsValidating, setSelectedCountry } =
    useCountryContext();
  const router = useRouter();

  //controls what is displayed based on the response from the API
  {
    if (resError)
      return (
        <>
          <i className="flex items-center self-center">
            <h2 className="flex items-center self-center text-3xl text-red-700 dark:text-[#ffffff]">
              Error encountered while fetching data
            </h2>
          </i>
        </>
      );
    if (resIsValidating)
      return (
        <h2 className="flex items-center self-center text-3xl dark:text-[#ffffff] text-[#2a3541]">
          Loading data...
        </h2>
      );
  }

  //handles selecting the country and storing the selected country
  const handleCountryClick = (e: CountryTypes) => {
    setSelectedCountry(e);
    router.push("./showCountryDetails");
  };

  //This uses the filter method to filter the given array using the selected region and stores them in filteredCountries array
  const filteredCountries = countries.filter((item: itemType) => {
    if (selectedRegion !== "All Region" && item.region !== selectedRegion) {
      return false;
    }
    if (
      !item.name.common.toLowerCase().includes(searchTerms.toLocaleLowerCase())
    ) {
      return false;
    }

    return true;
  });

  //Component that handles the drop-down visible Regions container
  const CountryRegions = () => {
    const handleRegionClick = (event: React.MouseEvent<HTMLLabelElement>) => {
      setSelectedRegion(event.currentTarget.htmlFor); //This sets the value of the selected region to the htmlFor value of the clicked region
      setVisibleRegion(event.currentTarget.htmlFor);
      setIsVisible(false); //Sets the visibility of the visibleRegion container to hidden
    };
    const handleVisibility = () => {
      setIsVisible(!isVisible); //This toggles the visibility of the regions container when the button is clicked
    };
    const visibleRegionRef = useRef<HTMLDivElement>(null); //This references the DIV element of the Regions container

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          visibleRegionRef.current && //checks if the visible Region container is true and...
          !visibleRegionRef.current.contains(event.target as Node) //the clicked element is not an element or a child of the visible Region container.
        ) {
          setIsVisible(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside); //This adds an event listener to take action when a click is detected outside the visibleRegion container
      return () => {
        document.removeEventListener("mousedown", handleClickOutside); //This cleans up the add event listener
      };
    }, []);

    return (
      <div className="flex flex-col gap-[6px] w-[200px]">
        <div
          className="bg-white dark:bg-[#2b3743] py-2 px-4 rounded-[5px] flex flex-row items-center justify-between cursor-pointer search-shadow"
          onClick={handleVisibility}
        >
          <span onClick={handleVisibility} className="dark:text-[#ffffff]">
            {visibleRegion}
          </span>
          <MdKeyboardArrowDown
            className={
              isVisible
                ? "rotate-0 dark:text-[#ffffff]"
                : "rotate-180 dark:text-[#ffffff]"
            }
          />
        </div>
        {isVisible && (
          <div
            ref={visibleRegionRef} //This attaches the reference to visibleRegionRef
            className={
              isVisible
                ? `options-ctn bg-white dark:bg-[#2b3743] rounded-[5px] px-0 py-2 search-shadow`
                : `options-ctn bg-white dark:bg-[#2b3743] rounded-[5px] px-0 py-2 hidden search-shadow`
            }
          >
            {regionList.map((regionItem, index) => {
              return (
                <div
                  key={index}
                  className="flex cursor-pointer w-[100%] py-0 px-4 hover:bg-[#808081]"
                >
                  <label
                    htmlFor={regionItem}
                    className="flex w-full dark:text-[#ffffff] text-[0.85rem] cursor-pointer p-2"
                    onClick={handleRegionClick}
                  >
                    {regionItem}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex md:flex-row lg:flex-row w-[100%] justify-between mt-6 xxs:flex-col xxs:gap-3">
        <form
          action="PUT"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex"
        >
          <div className="w-[300px] flex flex-row items-center gap-2 bg-[#ffffff] dark:bg-[#2a3541] text-[#2a3541] dark:text-[#ffffff] p-2 rounded-[2px] search-shadow">
            <IoMdSearch className="text-base" />
            <input
              type="search"
              name="search"
              id="search"
              value={searchTerms}
              onChange={handleSearchChange}
              placeholder="Search for a country..."
              className="w-full p-2 pl-0 text-xs outline-none bg-[#ffffff] dark:bg-[#2a3541] text-[#2a3541] dark:text-[#ffffff]"
            />
          </div>
        </form>
        <CountryRegions />
      </div>
      <div className="grid-ctn gap-10 w-[100%] mb-8">
        {filteredCountries.length === 0 ? (
          <div className="flex flex-col gap-3 items-start">
            <p className="dark:text-[#ffffff] text-[#2b3743]">
              No country in <strong>{selectedRegion}</strong> matches your
              search: <em>{searchTerms}</em>
            </p>
            <button
              className=" bg-[#fff] dark:bg-[#2b3743] text-[#2b3743] dark:text-[#ffffff] p-2 rounded-[2px] search-shadow"
              type="button"
              onClick={() => {
                setSearchTerms("");
              }}
            >
              Cancel search
            </button>
          </div>
        ) : (
          filteredCountries &&
          filteredCountries.map((country: CountryTypes, index: number) => (
            <div
              className="w-[100%] h-auto flex flex-col justify-start items-start hover:cursor-pointer card-shadow rounded-[10px] bg-[#ffffff] dark:bg-[#202d36]"
              key={index}
              onClick={() => {
                handleCountryClick(country);
              }}
            >
              <Image
                src={country.flags.png}
                alt={
                  !country.flags.alt
                    ? "This is the country flag"
                    : country.flags.alt
                }
                width={400}
                height={130}
                className="w-[inherit] h-[130px] md:h-[170px] lg:h-[130px] aspect-video flag-rounded z-[999]"
              />
              <div className="flex  flex-col items-start gap-2 card-details bg-[#ffffff] dark:bg-[#2b3743] text-[#000000] dark:text-[#ffffff]">
                <h1 className="mb-3 font-extrabold text-[1.25rem]">
                  {country.name.common}
                </h1>
                <p className="font-semibold">
                  Population:{" "}
                  <span className="text-[0.85rem] font-light">
                    {country.population.toLocaleString()}
                  </span>
                </p>
                <p className="font-semibold">
                  Region:{" "}
                  <span className="text-[0.85rem] font-light">
                    {country.region}
                  </span>
                </p>
                <p className="font-semibold">
                  Capital:{" "}
                  <span className="text-[0.85rem] font-light">
                    {country.capital}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export { CountryCards };
