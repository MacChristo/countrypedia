import Header from "./components/Header";
import { CountryCards } from "./components/CountriesCards";

export default function Home() {
  return (
    <main className="flex flex-col justify-center w-[100%] bg-[#f0f8ff]">
      <Header />
      <div className="flex flex-col self-center w-[90%] min-h-screen gap-8">
        <CountryCards />
      </div>
    </main>
  );
}
