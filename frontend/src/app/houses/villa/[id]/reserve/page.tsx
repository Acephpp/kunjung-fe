import Footer from '@/components/Footer'
import NavbarReserve from '@/components/villa/reserve/NavbarReserve'
import ReservePage from '@/components/villa/reserve/ReservePage'
import React from 'react'

export default function page() {
    return (
        <div>
            <NavbarReserve/>
            <ReservePage/>
            <Footer/>
        </div>
    )
}
