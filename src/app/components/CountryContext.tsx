"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import useSWR from "swr";

//create the context with a default value of empty/undefined
const CountryContext = createContext<any | undefined>(undefined);

//create the provider component that wraps around the app giving access to the country state.

const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [resError, setResError] = useState<any>(null);
  const [resIsValidating, setResIsValidating] = useState<any>(null);

  const url: string = "https://restcountries.com/v3.1/all";
  const fetcher = () => fetch(url).then((res) => res.json());

  const { data, error, isValidating } = useSWR(url, fetcher);

  useEffect(() => {
    if (data) {
      setCountries(data);
    }
    setResError(error);
    setResIsValidating(isValidating);
  }, [data, error, isValidating]);
  console.log(data);

  return (
    <CountryContext.Provider
      value={{
        countries,
        resError,
        resIsValidating,
        selectedCountry,
        setSelectedCountry,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

//custom hooks to use the CountryContext easily

const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("UseCountryContext must be used within a CountryProvider!");
  }
  return context;
};

export { CountryProvider, useCountryContext };
