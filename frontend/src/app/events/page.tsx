import EventSearchBar from '@/components/event/EventSearchBar'
import FilterBar from '@/components/FilterBar'
import HeroSection from '@/components/Homepage/HeroSection'
import React from 'react'

export default function Page() {
    return (
        <div>
            <div className='max-w-9xl mx-auto px-10'>
                <EventSearchBar />
            </div>
            <div className="mb-5">
                <HeroSection />
            </div>
        </div>
    )
}
