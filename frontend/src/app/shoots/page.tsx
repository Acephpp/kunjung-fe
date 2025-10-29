import HeroSection from '@/components/Homepage/HeroSection'
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
        </div>
    )
}
