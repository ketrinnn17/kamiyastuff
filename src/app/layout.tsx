import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "<ketrianur>/components/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "KamiyaStuff | Premium Bag Collection",
  description: "Koleksi tas eksklusif dengan kualitas terbaik",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </head>
      <body className={`${montserrat.variable} font-sans bg-gray-50 text-gray-900`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}