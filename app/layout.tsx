import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/styles/globals.css'
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "untitled sample library",
  description: "equanimous sample sharing. are.na for audio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} px-16`}>
        <Header />
        {children}
      </body>
    </html>
  );
}









