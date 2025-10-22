import AboutIntro from '@/components/AboutPage/AboutIntro'
import ComfortSection from '@/components/AboutPage/ComfortSection'
import FounderStory from '@/components/AboutPage/FounderStory'
import HeroAbout from '@/components/AboutPage/HeroAbout'
import ScrollGallery from '@/components/AboutPage/ScrollGallery'
import VisiMisi from '@/components/AboutPage/VisiMisi'
import React from 'react'

export default function Page() {
    return (
        <div className="max-w-9xl mx-auto px-10 py-5 bg-[#FCFBF7]">
            <HeroAbout />
            <AboutIntro/>
            <FounderStory/>
            <VisiMisi/>
            <ScrollGallery/>
            <ComfortSection/>
        </div>
    )
}
