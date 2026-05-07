import type { Metadata } from "next";
import { Almarai, Instrument_Serif } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const almarai = Almarai({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Gent OS",
  description: "A private personal operating system for durable life state.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${almarai.variable} ${instrumentSerif.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
