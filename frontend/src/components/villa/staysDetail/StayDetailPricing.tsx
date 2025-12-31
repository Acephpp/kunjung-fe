"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgePercent, ChevronLeft, MapPin, Star } from "lucide-react"
import { DateRange, type Range } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import Link from "next/link"
import { FiMinus, FiPlus } from "react-icons/fi"
import type { villas } from "@/app/data/villas"
import Image from "next/image"

type Villa = (typeof villas)[number]

interface StaysDetailPricingProps {
    villa: Villa
    showDatePicker: boolean
    setShowDatePicker: (show: boolean) => void
    checkIn: Date | undefined
    setCheckIn: (date: Date | undefined) => void
    checkOut: Date | undefined
    setCheckOut: (date: Date | undefined) => void
    dateRange: Range[]
    setDateRange: (range: Range[]) => void
}

export default function StaysDetailPricing({
    villa,
    showDatePicker,
    setShowDatePicker,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    dateRange,
    setDateRange,
}: StaysDetailPricingProps) {
    const [showGuestModal, setShowGuestModal] = useState(false)
    const [guests, setGuests] = useState<number>(0)
    const [showMobilePanel, setShowMobilePanel] = useState(false)

    const formatDate = (d?: Date) => {
        if (!d) return "Add Dates"
        return d.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }

    const getCheckInText = () => formatDate(checkIn)
    const getCheckOutText = () => formatDate(checkOut)

    const formatMobileDateRange = () => {
        if (!checkIn && !checkOut) return "Add dates"
        if (checkIn && !checkOut) return formatDate(checkIn)
        if (checkIn && checkOut) {
            const startDay = checkIn.getDate()
            const endDay = checkOut.getDate()
            const startMonth = checkIn.toLocaleDateString("en-US", { month: "short" })
            const endMonth = checkOut.toLocaleDateString("en-US", { month: "short" })
            const year = checkOut.getFullYear()
            return `${startDay}-${endDay} ${endMonth}, ${year}`
        }
        return "Add dates"
    }

    const handleDateChange = (item: any) => {
        const sel = item.selection as Range

        if (!checkIn && !checkOut) {
            if (sel.startDate) {
                setCheckIn(sel.startDate)
                setDateRange([
                    {
                        ...sel,
                        endDate: sel.startDate,
                    },
                ])
            }
            return
        }

        if (checkIn && !checkOut) {
            const start = sel.startDate ?? checkIn
            const end = sel.endDate ?? sel.startDate ?? checkIn

            const startDate = start && end && start > end ? end : start
            const endDate = start && end && start > end ? start : end

            setCheckIn(startDate || undefined)
            setCheckOut(endDate || undefined)

            setDateRange([
                {
                    ...sel,
                    startDate: startDate || undefined,
                    endDate: endDate || undefined,
                },
            ])

            if (startDate && endDate) {
                setShowDatePicker(false)
            }
            return
        }

        if (checkIn && checkOut) {
            if (sel.startDate) {
                setCheckIn(sel.startDate)
                setCheckOut(undefined)
                setDateRange([
                    {
                        ...sel,
                        endDate: sel.startDate,
                    },
                ])
            }
        }
    }

    return (
        <>
            {/* DESKTOP VERSION */}
            <div className="hidden lg:block lg:col-span-1 mt-5">
                <Card className="sticky top-2/12 py-10 px-10 rounded-xl shadow-xl bg-[#fcfbf7] border-[#E7E6E2]">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[16px] font-primary font-bold text-[#2D2A29]">Weekdays</p>
                            <p className="font-secondary text-[18px] text-[#959290]">
                                From <span className="font-bold text-black">{villa.weekdayPrice}</span>
                            </p>
                        </div>
                        <div>
                            <p className="text-[16px] font-primary font-bold text-[#2D2A29]">Weekends</p>
                            <p className="font-secondary text-[18px] text-[#959290]">
                                From <span className="font-bold text-black">{villa.weekdayPrice}</span>
                            </p>
                        </div>
                    </div>

                    <p className="text-[18px] font-secondary text-gray-500 italic flex items-center justify-center gap-1">
                        <BadgePercent className="w-5 h-5" />
                        Prices include all fees
                    </p>

                    {/* CARD RESERVATION */}
                    <div className="rounded-lg overflow-hidden border border-gray-200 text-sm text-gray-500">
                        {/* Dates */}
                        <div className="grid grid-cols-2 divide-x divide-gray-200 border-b border-gray-200">
                            <div className="flex flex-col p-4 bg-[#F8F7F2] border-[#E7E6E2]">
                                <span className="font-medium font-secondary">
                                    Check in <span className="text-gray-400">(Optional)</span>
                                </span>
                                <span className="text-gray-400 font-secondary cursor-pointer" onClick={() => setShowDatePicker(true)}>
                                    {getCheckInText()}
                                </span>
                            </div>

                            <div className="flex flex-col p-4 bg-[#F8F7F2] border-[#E7E6E2]">
                                <span className="font-medium font-secondary">
                                    Check out <span className="text-gray-400">(Optional)</span>
                                </span>
                                <span className="text-gray-400 font-secondary cursor-pointer" onClick={() => setShowDatePicker(true)}>
                                    {getCheckOutText()}
                                </span>
                            </div>
                        </div>

                        {/* Who */}
                        <div
                            className="flex justify-between items-center p-4 bg-[#F8F7F2] border-[#E7E6E2] cursor-pointer"
                            onClick={() => setShowGuestModal(true)}
                        >
                            <div className="flex flex-col">
                                <span className="font-medium font-secondary">
                                    Who <span className="text-gray-400">(Optional)</span>
                                </span>
                                <span className="text-gray-400 font-secondary">{guests > 0 ? `${guests} Guests` : "Add Guests"}</span>
                            </div>
                        </div>

                        <div className="bg-[#eee9df] px-4 py-4 font-secondary flex justify-between items-center">
                            <p className="text-[12px] font-medium">Three Nights Weekdays</p>
                            <p className="font-bold text-lg">{villa.totalPrice}</p>
                        </div>
                    </div>

                    <Link href={`/houses/villa/${villa.id}/reserve`} className="block">
                        <Button className="w-full bg-[#7A3E2C] hover:bg-[#693424] text-white rounded-lg py-8">
                            <span className="text-3xl font-secondary">Reserve</span>
                        </Button>
                    </Link>

                    <p className="text-sm text-center font-secondary font-bold text-black italic">You won't be charged yet</p>
                </Card>
            </div>

            {/* MOBILE STICKY FOOTER */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40 bg-[#FCFBF7] border-t border-[#E7E6E2] shadow-lg">
                <div className="flex items-center justify-between px-4 py-4 md:py-2 max-w-7xl mx-auto w-full">
                    {/* LEFT */}
                    <div className="flex flex-col">
                        <p className="text-[18px] font-semibold text-[#2D2A29] font-secondary leading-tight">
                            {villa.weekdayPrice}
                        </p>
                        <p className="text-[12px] text-[#959290] font-secondary leading-tight">
                            1 night, {formatMobileDateRange()}
                        </p>
                    </div>

                    {/* RIGHT */}
                    <button
                        onClick={() => setShowMobilePanel(true)}
                        className="ml-4 flex-shrink-0 bg-[#7A3E2C] hover:bg-[#693424]
                       text-white rounded-full px-12 py-3
                       font-secondary font-bold text-sm transition"
                    >
                        reserve
                    </button>
                </div>
            </div>



            {showMobilePanel && (
                <div className="fixed inset-0 lg:hidden z-50 bg-white flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#E7E6E2] sticky top-0 bg-white">
                        {/* LEFT - BACK (START) */}
                        <button
                            onClick={() => setShowMobilePanel(false)}
                            className="text-[#2D2A29] hover:bg-gray-100
                   py-2 pr-2 pl-0 
                   rounded-full transition"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        {/* RIGHT - LOGO ICON */}
                        <Image
                            src="/images/kunjung.svg"
                            alt="Kunjung"
                            width={130}
                            height={28}
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 pb-32 font-secondary">

                        {/* MAIN CARD */}
                        <div className="border border-[#E7E6E2] rounded-2xl p-4 mb-6">

                            {/* Villa Info */}
                            <div className="flex gap-4 mb-4">
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                        src={villa.image || "/placeholder.svg"}
                                        alt={villa.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    {/* TOP: Name & Location */}
                                    <div>
                                        <h3 className="font-primary font-semibold text-[22px] text-[#2D2A29] mb-1">
                                            {villa.name}
                                        </h3>

                                        <p className="text-sm text-[#959290] flex items-center gap-1">
                                            <MapPin size={14} className="text-[#959290]" />
                                            {villa.location}
                                        </p>
                                    </div>

                                    {/* BOTTOM: Rating */}
                                    <div className="flex items-center gap-1 text-[#2D2A29] mt-2">
                                        <Star size={14} className="fill-[#2D2A29]" />
                                        <span className="text-sm font-medium">
                                            {villa.rating} ({villa.reviews})
                                        </span>
                                    </div>
                                </div>

                            </div>


                            <p className="text-sm text-[#7A7A75] leading-relaxed mb-6">
                                {villa.description}
                            </p>

                            <div className="border-t border-[#E7E6E2] my-2" />

                            {/* Dates */}
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-[#2D2A29]">Dates</h4>
                                <button
                                    onClick={() => setShowDatePicker(true)}
                                    className="text-sm font-medium bg-[#E7E6E2] px-8 py-1.5 rounded-full"
                                >
                                    change
                                </button>
                            </div>

                            <p className="text-[#959290] mb-4">
                                {checkIn && checkOut
                                    ? `${checkIn.toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "short",
                                    })} - ${checkOut.toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "short",
                                    })}, ${checkOut.getFullYear()}`
                                    : "Add dates"}
                            </p>

                            <div className="border-t border-[#E7E6E2] my-2" />

                            {/* Guests */}
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-[#2D2A29]">Guests</h4>
                                <button
                                    onClick={() => setShowGuestModal(true)}
                                    className="text-sm font-medium bg-[#E7E6E2] px-8 py-1.5 rounded-full"
                                >
                                    change
                                </button>
                            </div>

                            <p className="text-[#959290] mb-4">
                                {guests > 0 ? `${guests} Guests` : "Add guests"}
                            </p>

                            <div className="border-t border-[#E7E6E2] my-2" />

                            {/* Price */}
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-[#2D2A29]">Price</span>
                                <span className="font-medium text-[#2D2A29]">
                                    {villa.weekdayPrice}
                                </span>
                            </div>
                        </div>

                        {/* PRICE DETAILS (OUTSIDE CARD) */}
                        <div className="px-1">

                            <p className="text-[16px] font-medium text-[#2D2A29] mb-1">Price details</p>

                            <div className="flex items-center justify-between text-[16px] mb-4 text-[#2D2A29]">
                                <span>1 night x {villa.weekdayPrice}</span>
                                <span>{villa.weekdayPrice}</span>
                            </div>

                            <div className="border-t border-[#E7E6E2] pt-4 flex items-center justify-between">
                                <span className="font-bold text-[20px] text-[#2D2A29]">TOTAL</span>
                                <span className="font-bold text-[20px] text-[#2D2A29]">
                                    {villa.totalPrice}
                                </span>
                            </div>
                        </div>
                    </div>


                    {/* Footer with Buttons */}
                    <div className="fixed bottom-0 left-0 right-0 lg:hidden flex gap-3 p-4 bg-white border-t border-[#E7E6E2] z-50">

                        {/* Cancel */}
                        <Button
                            variant="outline"
                            onClick={() => setShowMobilePanel(false)}
                            className="flex-1 h-12 border-[#2D2A29] text-[#2D2A29] font-secondary font-bold"
                        >
                            cancel
                        </Button>

                        {/* Next */}
                        <Button
                            asChild
                            className="flex-1 h-12 bg-[#7A3E2C] hover:bg-[#693424] text-white font-secondary font-bold"
                        >
                            <Link href={`/houses/villa/${villa.id}/reserve`}>
                                next
                            </Link>
                        </Button>
                    </div>

                </div>
            )}

            {/* Add padding to body to prevent content overlap with sticky footer on mobile */}
            <style>{`
        @media (max-width: 1024px) {
          body {
            padding-bottom: 75px;
          }
        }
      `}</style>

            {/* MODAL KALENDER RANGE */}
            {showDatePicker && (
                <div
                    className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
                    onClick={() => setShowDatePicker(false)}
                >
                    <div
                        className="
                relative
                w-full md:w-auto
                bg-white md:bg-[#FCFBF7]
                rounded-t-3xl md:rounded-2xl
                shadow-xl
                border border-gray-200
                p-4 md:p-6
                md:px-10

                h-[85vh] md:h-auto
                min-h-[70vh] md:min-h-[20vh]
                max-h-[90vh]

                overflow-y-auto
                pb-24
            "
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* DRAG INDICATOR (MOBILE) */}
                        <div className="md:hidden flex justify-center mb-3">
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        {/* 🔥 MOBILE – 2 BULAN */}
                        <div className="md:hidden flex justify-center">
                            <DateRange
                                ranges={[
                                    {
                                        startDate: checkIn || new Date(),
                                        endDate: checkOut || checkIn || new Date(),
                                        key: "selection",
                                    },
                                ]}
                                onChange={handleDateChange}
                                rangeColors={["#7A3E2C"]}
                                months={2}
                                direction="vertical"
                                moveRangeOnFirstSelection={false}
                                editableDateInputs={false}
                            />
                        </div>

                        {/* 🔥 DESKTOP – 2 BULAN */}
                        <div className="hidden md:flex justify-center calendar-wrapper">
                            <DateRange
                                ranges={[
                                    {
                                        startDate: checkIn || new Date(),
                                        endDate: checkOut || checkIn || new Date(),
                                        key: "selection",
                                    },
                                ]}
                                onChange={handleDateChange}
                                rangeColors={["#7A3E2C"]}
                                months={2}
                                direction="horizontal"
                                moveRangeOnFirstSelection={false}
                                editableDateInputs={false}
                            />

                            <style jsx global>{`
                    .calendar-wrapper .rdrCalendarWrapper {
                        background-color: #FCFBF7;
                    }
                `}</style>
                        </div>

                        {/* ===================== */}
                        {/* 🔥 FOOTER – MOBILE ONLY */}
                        {/* ===================== */}
                        <div className="fixed bottom-0 left-0 right-0 md:hidden flex gap-3 p-4 bg-white border-t border-[#E7E6E2] z-50">

                            {/* Cancel */}
                            <Button
                                variant="outline"
                                onClick={() => setShowDatePicker(false)}
                                className="flex-1 h-12 border-[#2D2A29] text-[#2D2A29] font-secondary font-bold"
                            >
                                cancel
                            </Button>

                            {/* Next */}
                            <Button
                                onClick={() => setShowDatePicker(false)}
                                className="flex-1 h-12 bg-[#7A3E2C] hover:bg-[#693424] text-white font-secondary font-bold"
                            >
                                next
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* MODAL WHO (GUESTS) */}
            {/* MODAL WHO (GUESTS) */}
            {showGuestModal && (
                <div
                    className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
                    onClick={() => setShowGuestModal(false)}
                >
                    {/* ===================== */}
                    {/* 🔥 MOBILE – BOTTOM PANEL (SAMA DENGAN KALENDER) */}
                    {/* ===================== */}
                    <div
                        className="
                md:hidden
                w-full
                bg-[#FCFBF7]
                rounded-t-3xl
                shadow-xl
                border border-gray-200
                p-4

                h-[65vh]
                min-h-[60vh]
                max-h-[85vh]

                overflow-y-auto
            "
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* DRAG INDICATOR */}
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        {/* CONTENT */}
                        <div className="px-1">
                            <div className="border border-gray-700 rounded-2xl p-5">
                                <h2 className="font-serif text-2xl text-[#4A3B2D] mb-4">
                                    Who?
                                </h2>

                                <div className="border border-gray-400 rounded-xl px-4 py-4 flex items-center justify-between">
                                    {/* LEFT */}
                                    <div>
                                        <p className="font-medium text-[#4A3B2D]">
                                            Add Guests
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Children above 5 years are counted
                                        </p>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setGuests(Math.max(1, guests - 1))}
                                            className="w-9 h-9 rounded-full border flex items-center justify-center"
                                        >
                                            <FiMinus size={14} />
                                        </button>

                                        <span className="w-6 text-center font-medium">
                                            {guests}
                                        </span>

                                        <button
                                            onClick={() => setGuests(guests + 1)}
                                            className="w-9 h-9 rounded-full border flex items-center justify-center"
                                        >
                                            <FiPlus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}
                        {/* FOOTER – SAME STYLE AS MOBILE PANEL */}
                        <div className="fixed bottom-0 left-0 right-0 md:hidden flex gap-3 p-4 bg-white border-t border-[#E7E6E2] z-50">

                            {/* Cancel */}
                            <Button
                                variant="outline"
                                onClick={() => setShowGuestModal(false)}
                                className="flex-1 h-12 border-[#2D2A29] text-[#2D2A29] font-secondary font-bold"
                            >
                                cancel
                            </Button>

                            {/* Next */}
                            <Button
                                onClick={() => setShowGuestModal(false)}
                                className="flex-1 h-12 bg-[#7A3E2C] hover:bg-[#693424] text-white font-secondary font-bold"
                            >
                                next
                            </Button>
                        </div>

                    </div>

                    {/* ===================== */}
                    {/* 🔥 DESKTOP – TETAP MODAL LAMA */}
                    {/* ===================== */}
                    <div
                        className="hidden md:flex items-center justify-center h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-[#FDFBF6] rounded-3xl shadow-2xl border border-[#E5E2DD] px-8 py-6 w-[420px]">
                            <div className="flex items-center justify-between font-secondary">
                                <span className="text-[15px] font-medium text-[#2D2A29]">
                                    Add Guests
                                </span>

                                <div className="flex items-center gap-3 text-[13px] text-[#7A7A75]">
                                    <button
                                        onClick={() => setGuests(Math.max(0, guests - 1))}
                                        disabled={guests === 0}
                                        className="hover:text-gray-800 disabled:opacity-40 transition"
                                    >
                                        <FiMinus size={14} />
                                    </button>

                                    <span className="text-[15px] w-3 text-center">
                                        {guests}
                                    </span>

                                    <button
                                        onClick={() => setGuests(guests + 1)}
                                        className="hover:text-gray-800 transition"
                                    >
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-3 border-b border-[#CFCBC5]" />
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}
