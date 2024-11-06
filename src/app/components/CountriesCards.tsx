"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdSearch } from "react-icons/io";
import { useCountryContext } from "./CountryContext";
import { CountryTypes } from "./CountryContext";
import Image from "next/image";

interface itemType {
  region: string;
  name: { common: string };
}

const CountryCards = () => {
  //selectedRegion is a variable that holds the selected filter region
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [searchTerms, setSearchTerms] = useState<string>("");

  //this changes the value of the selectedRegion to the one that was clicked
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };
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
            <h2 className="flex items-center self-center text-3xl text-red-700">
              Error encountered while fetching data
            </h2>
          </i>
        </>
      );
    if (resIsValidating)
      return (
        <h2 className="flex items-center self-center text-3xl">
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
    if (selectedRegion !== "All" && item.region !== selectedRegion) {
      return false;
    }
    if (
      !item.name.common.toLowerCase().includes(searchTerms.toLocaleLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <>
      <div className="flex flex-row w-[100%] justify-between mt-6 xxs:flex-col xxs:gap-3">
        <form
          action="PUT"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex"
        >
          <div className="w-[300px] flex flex-row items-center gap-2 bg-[#fff] p-2 rounded-[2px] search-shadow">
            <IoMdSearch />
            <input
              type="search"
              name="search"
              id="search"
              value={searchTerms}
              onChange={handleSearchChange}
              placeholder="Search for a country..."
              className="w-[80%] text-xs outline-none"
            />
          </div>
        </form>
        <div className="flex flex-row items-center gap-2 bg-[#fff] p-2 rounded-[2px] search-shadow w-full">
          <select
            title="Region"
            value={selectedRegion}
            onChange={handleFilterChange}
            className="outline-none hover:cursor-pointer"
          >
            <option value="All">All Region</option>
            <option value="Africa">Africa</option>
            <option value="Antarctic">Antarctic</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
      <div className="grid-ctn gap-10 w-[100%]">
        {filteredCountries.length === 0 ? (
          <>
            <p>
              No country in <strong>{selectedRegion}</strong> matches your
              search: <em>{searchTerms}</em>
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerms("");
              }}
            >
              Cancel search
            </button>
          </>
        ) : (
          filteredCountries &&
          filteredCountries.map((country: CountryTypes, index: number) => (
            <div
              className="w-[100%] h-auto flex flex-col justify-start items-start hover:cursor-pointer card-shadow rounded-[10px]"
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
                className="w-[inherit] h-[130px] aspect-video flag-rounded z-[999]"
              />
              <div className="flex  flex-col items-start gap-2 card-details">
                <h1 className="mb-3 font-bold text-[1.25rem]">
                  {country.name.common}
                </h1>
                <p className="font-bold">
                  Population:{" "}
                  <span className="text-[0.85rem] font-normal">
                    {country.population.toLocaleString()}
                  </span>
                </p>
                <p className="font-bold">
                  Region:{" "}
                  <span className="text-[0.85rem] font-normal">
                    {country.region}
                  </span>
                </p>
                <p className="font-semibold">
                  Capital:{" "}
                  <span className="text-[0.85rem] font-normal">
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
