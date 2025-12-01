import DefiningComport from '@/components/Homepage/DefiningComport'
import GallerySection from '@/components/Homepage/GallerySection'
import HeroSection from '@/components/Homepage/HeroSection'
import ProductSection from '@/components/Homepage/ProductSection'
import ProviderSection from '@/components/Homepage/ProviderSection'
import TestimoniSection from '@/components/Homepage/TestimoniSection'
import ShootSearchBar from '@/components/Shoots/ShootSearchBar'
import React from 'react'

export default function Page() {
    return (
        <div>
            <div className='max-w-9xl mx-auto px-10'>
                <ShootSearchBar />
            </div>
            <div className="mb-5">
                <HeroSection />
            </div>
            <div>
                <DefiningComport />
                <ProviderSection />
                <GallerySection />
                <TestimoniSection />
                <ProductSection />
            </div>
        </div>
    )
}
