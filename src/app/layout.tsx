import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
// import localFont from "next/font/local";
import Head from "next/head";
import "./globals.css";
import { CountryProvider } from "./components/CountryContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunitoSans",
  weight: ["400"],
});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Countrypedia",
  description: "See important information about different countries",
  keywords:
    "country, countries, REST API countries, macchristo, flags, information about country",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} antialiased font-sans font-light bg-[#ffffff]`}
      >
        <CountryProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </CountryProvider>
      </body>
    </html>
  );
}
