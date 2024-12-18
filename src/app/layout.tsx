import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { CountryProvider } from "./components/CountryContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunitoSans",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Countrypedia",
  description: "See important information about different countries",
  keywords:
    "country, countries, REST API countries, macchristo, flags, information about country",
  // openGraph: {
  //   images: [
  //     {
  //       url: "https://countrypedia-macchristos-projects.vercel.app//Countrypedia-preview.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "This is Countrypedia",
  //     },
  //   ],
  // }
  openGraph: {
    type: "website",
    url: "https://countrypedia-macchristos-projects.vercel.app",
    title: "Countrypedia",
    description: "See important information about different countries",
    siteName: "Countrypedia",
    images: [
      {
        url: "https://countrypedia-macchristos-projects.vercel.app/Countrypedia-preview.png",
        width: 1200,
        height: 630,
        alt: "This is Countrypedia",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Countrypedia",
    description: "See important information about different countries",
    images: [
      "https://countrypedia-macchristos-projects.vercel.app/Countrypedia-preview.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} antialiased font-sans font-light bg-[#ffffff] dark:bg-[#202d36]`}
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
