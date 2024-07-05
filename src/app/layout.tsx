import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import { PreloaderProvider } from "@/contexts/PreloaderContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Axcel Raul",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background after:bg-background`}>
        <PreloaderProvider>
          <Header />
          {children}
        </PreloaderProvider>
      </body>
    </html>
  );
}
