"use client";
import React from "react";
import Header from "../components/Header";
import { useCountryContext } from "../components/CountryContext";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CountryDetails = () => {
  const router = useRouter();
  const { selectedCountry, countries } = useCountryContext();

  if (!selectedCountry) {
    return <p>No country was selected</p>;
  }

  const getCountryBorderNames = () => {
    if (!selectedCountry.borders) return [];

    //This maps through the selected country border array and uses the code to find countries that matches the code.
    return selectedCountry.borders.map((borderCode: string) => {
      const borderCountry = countries.find(
        (country) => country.cca3 === borderCode
      );
      return borderCountry ? borderCountry.name.common : borderCode;
    });
  };

  const Borders = () => {
    const borderCountryNames = getCountryBorderNames();
    return !borderCountryNames || borderCountryNames.length === 0 ? (
      <p>No border countries available for {selectedCountry.name.common}</p>
    ) : (
      borderCountryNames.map((bc: string, index: number) => (
        <span className="text-[0.85rem]" key={index}>
          {bc}
        </span>
      ))
    );
  };
  return (
    <main className="flex flex-col justify-center w-[100%]">
      <Header />

      <div className="flex flex-col self-center w-[90%] gap-8">
        <div className="flex flex-row w-[100%] justify-between mt-6">
          <button
            type="button"
            className="flex flex-row items-center gap-2 bg-[#fff] p-2 rounded-[2px] search-shadow"
            onClick={() => {
              router.push("./");
            }}
          >
            <IoArrowBack />
            Back
          </button>
        </div>
        <div className="flex flex-row w-full justify-between gap-[60px]">
          <Image
            className="w-[50%] h-auto"
            width={100}
            height={100}
            src={selectedCountry.flags.png}
            alt={selectedCountry.flags.alt}
          />
          <div className="w-full rounded-none">
            <div className="flex  flex-col items-start gap-2 bg-gray-50 pt-3 pr-4 pb-6 pl-4">
              <h1 className="mb-3 font-bold text-[1.35rem]">
                {selectedCountry.name.common}
              </h1>
              <div className="w-full flex flex-row gap-14">
                <div className="flex  flex-col items-start gap-2 w-1/2">
                  <p className="font-semibold text-sm">
                    Native Name:{" "}
                    <span className="text-[0.85rem] font-normal">
                      {selectedCountry.name.official}
                    </span>
                  </p>
                  <p className="font-semibold text-sm">
                    Population:{" "}
                    <span className="text-[0.85rem] font-normal">
                      {selectedCountry.population.toLocaleString()}
                    </span>
                  </p>
                  <p className="font-semibold text-sm">
                    Region:{" "}
                    <span className="text-[0.85rem] font-normal">
                      {selectedCountry.region}
                    </span>
                  </p>
                  <p className="font-semibold text-sm">
                    Sub Region:{" "}
                    <span className="text-[0.85rem] font-normal">
                      {selectedCountry.subregion}
                    </span>
                  </p>
                  <p className="font-semibold text-sm">
                    Capital:{" "}
                    <span className="text-[0.85rem] font-normal">
                      {selectedCountry.capital}
                    </span>
                  </p>
                </div>
                <div className="flex  flex-col items-start gap-2 w-1/2">
                  <p className="font-semibold text-sm">
                    Top level domain:{" "}
                    <span className="text-[0.85rem] font-normal">
                      {selectedCountry.tld[0]}
                    </span>
                  </p>
                  <p className="font-semibold text-sm">
                    Currency:{" "}
                    <span className="text-[0.85rem] font-normal">
                      {selectedCountry.name.official}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center w-full gap-2">
                <h1 className="text-sm font-semibold">Borders Countries: </h1>
                <div className="flex flex-row gap-5">
                  <Borders />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CountryDetails;
