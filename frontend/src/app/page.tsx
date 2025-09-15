"use client";

import SearchBar from "@/components/Homepage/SearchBar";
import HeroSection from "@/components/Homepage/HeroSection";
import ProviderSection from "@/components/Homepage/ProviderSection";
import GallerySection from "@/components/Homepage/GallerySection";
import TestimoniSection from "@/components/Homepage/TestimoniSection";
import ProductSection from "@/components/Homepage/ProductSection";
import DefiningComport from "@/components/Homepage/DefiningComport";

export default function HomePage() {
  return (
    <>
      <SearchBar />
      <HeroSection />
      <DefiningComport />
      <ProviderSection />
      <GallerySection />
      <TestimoniSection />
      <ProductSection />
    </>
  );
}
