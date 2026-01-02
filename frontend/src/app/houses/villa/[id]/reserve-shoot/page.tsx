import Footer from '@/components/Footer'
import NavbarReserve from '@/components/villa/reserve/NavbarReserve'
import ReservePageShoot from '@/components/villa/reserve/ReservePageShoot'
import React from 'react'

export default function page() {
    return (
        <div>
            <NavbarReserve/>
            <ReservePageShoot/>
            <div className='hidden md:block'>
                <Footer/>
            </div>
        </div>
    )
}
