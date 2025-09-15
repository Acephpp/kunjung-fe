import Navbar from "@/components/Navbar"
import "./globals.css"
import HeroSection from "@/components/HeroSection"
import SearchBar from "@/components/SearchBar"
import DefiningComfort from "@/components/DefiningComport"
import ProviderSection from "@/components/ProviderSection"
import GallerySection from "@/components/GallerySection"
import TestimoniSection from "@/components/TestimoniSection"
import ProductSection from "@/components/ProductSection"
import Footer from "@/components/Footer"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <SearchBar/>
        <HeroSection/>
        <DefiningComfort/>
        <ProviderSection/>
        <GallerySection/>
        <TestimoniSection/>
        <ProductSection/>
        <Footer/>
        <main className="pt-36">{children}</main>
      </body>
    </html>
  )
}
