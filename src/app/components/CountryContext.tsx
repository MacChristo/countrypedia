"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import useSWR from "swr";

export interface CountryTypes {
  name: { common: string; official: string };
  flags: { png: string; alt: string };
  population: number;
  region: string;
  subregion: string;
  tld: string;
  currencies: number;
  capital: string;
  borders: [];
  official: string;
  cca3: string;
}

interface CountryContextType {
  selectedCountry: CountryTypes | null;
  setSelectedCountry: (country: CountryTypes | null) => void;
  countries: CountryTypes[];
  resError: boolean;
  resIsValidating: boolean;
}
//create the context with a default value of empty/undefined
const CountryContext = createContext<CountryContextType | undefined>(undefined);

//create the provider component that wraps around the app giving access to the country state.

const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryTypes | null>(
    null
  );
  const [countries, setCountries] = useState<CountryTypes[]>([]);
  const [resError, setResError] = useState<boolean>(false);
  const [resIsValidating, setResIsValidating] = useState<boolean>(false);

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
