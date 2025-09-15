import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Homepage/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kunjung",
  description: "Curated villas in Bandung",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
