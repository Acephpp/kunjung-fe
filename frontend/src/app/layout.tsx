import Navbar from "@/components/Navbar"
import "./globals.css"
import HeroSection from "@/components/HeroSection"
import SearchBar from "@/components/SearchBar"
import DefiningComfort from "@/components/DefiningComport"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <SearchBar/>
        <HeroSection/>
        <DefiningComfort/>
        <main className="pt-36">{children}</main>
      </body>
    </html>
  )
}
