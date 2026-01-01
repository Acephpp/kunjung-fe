"use client"

import { useState, useEffect, useRef } from "react"
import { FiSearch, FiMinus, FiPlus, FiChevronLeft, FiX } from "react-icons/fi"
import { DateRange, type Range } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import Link from "next/link"

export default function SearchBar() {
    const [openMobile, setOpenMobile] = useState(false)
    const [mobileStep, setMobileStep] = useState(1)

    // Desktop states
    const [showWhere, setShowWhere] = useState(false)
    const [showCheckIn, setShowCheckIn] = useState(false)
    const [showCheckOut, setShowCheckOut] = useState(false)
    const [showGuests, setShowGuests] = useState(false)

    const [destination, setDestination] = useState("")

    const [adults, setAdults] = useState(0)
    const [children, setChildren] = useState(0)
    const [infants, setInfants] = useState(0)

    const totalGuests = adults + children + infants

    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ])

    const [checkInDate, setCheckInDate] = useState<Date | null>(null)
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowWhere(false)
                setShowCheckIn(false)
                setShowCheckOut(false)
                setShowGuests(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const getGuestText = () => {
        const guestCount = adults + children
        const infantCount = infants

        if (guestCount === 0 && infantCount === 0) return "Add guests"
        if (infantCount === 0) return `${guestCount} guest${guestCount > 1 ? "s" : ""}`
        if (guestCount === 0) return `${infantCount} infant${infantCount > 1 ? "s" : ""}`

        return `${guestCount} guest${guestCount > 1 ? "s" : ""}, ${infantCount} infant${infantCount > 1 ? "s" : ""}`
    }

    const formatLabelDate = (date: Date | null) => {
        if (!date) return "Select dates"
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })
    }

    const formatMobileDateRange = () => {
        if (!checkInDate || !checkOutDate) return "add dates"
        const start = checkInDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        const end = checkOutDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        return `${start} - ${end}`
    }

    const handleDateChange = (item: any) => {
        const sel = item.selection as Range
        setDateRange([sel])

        const start = sel.startDate ?? null
        const end = sel.endDate ?? null

        if (showCheckIn) {
            setCheckInDate(start)
            setCheckOutDate(null)
            setShowCheckIn(false)
            setShowCheckOut(true)
            return
        }

        if (showCheckOut) {
            setCheckOutDate(end)
            setShowCheckOut(false)
            return
        }
    }

    const formatMobileWhenSummary = () => {
        if (!checkInDate || !checkOutDate) return "add dates"
        const start = checkInDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        const end = checkOutDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        return `${start.split(" ")[0]} ${start.split(" ")[1]} - ${end}`
    }

    const GuestRow = ({
        title,
        subtitle,
        value,
        onChange,
    }: {
        title: string
        subtitle: string
        value: number
        onChange: (val: number) => void
    }) => (
        <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
            <div>
                <p className="text-[15px] font-medium text-gray-800">{title}</p>
                <p className="text-[13px] text-gray-500">{subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => onChange(Math.max(0, value - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={value === 0}
                >
                    <FiMinus size={14} />
                </button>
                <span className="w-6 text-center text-gray-800">{value}</span>
                <button
                    onClick={() => onChange(value + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                    <FiPlus size={14} />
                </button>
            </div>
        </div>
    )

    const handleMobileClose = () => {
        setOpenMobile(false)
        setMobileStep(1)
    }

    return (
        <div ref={dropdownRef} className="relative z-40">
            {/* ================= MOBILE SEARCH BAR ================= */}
            <div className="lg:hidden px-4">
                <button
                    onClick={() => setOpenMobile(true)}
                    className="w-full flex items-center justify-between px-5 py-4 rounded-full border bg-white shadow"
                >
                    <span className="text-gray-500">Start your search</span>
                    <FiSearch />
                </button>
            </div>

            {/* ================= MOBILE MODAL WITH STEP FLOW ================= */}
            {openMobile && (
                <div className="fixed inset-0 bg-black/40 z-50 lg:hidden">
                    <div className="absolute inset-0 w-full bg-white flex flex-col transition-all duration-300">
                        {/* Header */}
                        <div className="border-b border-gray-200 px-4 py-4">
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    onClick={() => {
                                        if (mobileStep > 1) {
                                            setMobileStep(mobileStep - 1)
                                        } else {
                                            handleMobileClose()
                                        }
                                    }}
                                    className="text-gray-600 hover:text-gray-800 transition"
                                >
                                    <FiChevronLeft size={24} />
                                </button>
                                <button onClick={handleMobileClose} className="text-gray-600 hover:text-gray-800 transition">
                                    <FiX size={24} />
                                </button>
                            </div>
                            {/* Tabs navigation */}
                            <div className="flex gap-8 justify-center">
                                <button className="text-sm font-medium text-gray-800">stays</button>
                                <button className="text-sm font-medium text-gray-400">events</button>
                                <button className="text-sm font-medium text-gray-400">shoots</button>
                            </div>
                        </div>

                        {/* Step 1: Where */}
                        {mobileStep === 1 && (
                            <div className="flex-1 overflow-y-auto px-4 py-6 animate-fade-in">
                                <div className="space-y-4">
                                    {/* Where section with rounded border */}
                                    <div className="border-2 border-gray-900 rounded-2xl p-6 space-y-4">
                                        <h2 className="text-2xl font-medium text-gray-900">Where?</h2>
                                        <div className="w-full h-px bg-gray-300" />

                                        {/* Destination option */}
                                        <button
                                            onClick={() => setDestination("Bandung")}
                                            className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${destination === "Bandung" ? "bg-gray-100" : "hover:bg-gray-50"
                                                }`}
                                        >
                                            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 flex-shrink-0">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    className="w-6 h-6 text-gray-700"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 21c0 0 6-6.75 6-11.25A6 6 0 0 0 6 9.75C6 14.25 12 21 12 21z"
                                                    />
                                                    <circle cx="12" cy="9.75" r="2.25" />
                                                </svg>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[16px] font-medium text-gray-900">Bandung</p>
                                                <p className="text-[14px] text-gray-500">West Java, Indonesia</p>
                                            </div>
                                        </button>

                                        <p className="text-center text-sm text-gray-400 italic py-4">more destination coming soon</p>
                                    </div>

                                    {/* When and Who summary sections - below the box */}
                                    <div className="space-y-3 mt-6">
                                        <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                                            <span className="text-gray-400">when</span>
                                            <span className="font-medium text-gray-800">{formatMobileWhenSummary()}</span>
                                        </div>
                                        <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                                            <span className="text-gray-400">who</span>
                                            <span className="font-medium text-gray-800">
                                                {totalGuests === 0 ? "add guests" : `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: When (Calendar) */}
                        {mobileStep === 2 && (
                            <div className="flex-1 overflow-y-auto px-4 py-6 animate-fade-in">
                                {/* Summary of Where */}
                                <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between mb-6 bg-gray-50">
                                    <span className="text-gray-400">where</span>
                                    <span className="font-medium text-gray-900">{destination}</span>
                                </div>

                                <div className="border-2 border-gray-900 rounded-2xl p-6">
                                    <h2 className="text-2xl font-medium text-gray-900 mb-4">When?</h2>
                                    <div className="w-full h-px bg-gray-300 mb-4" />

                                    <div className="flex justify-center">
                                        <DateRange
                                            ranges={dateRange}
                                            onChange={(item: any) => {
                                                const sel = item.selection as Range
                                                setDateRange([sel])
                                                setCheckInDate(sel.startDate ?? null)
                                                setCheckOutDate(sel.endDate ?? null)
                                            }}
                                            rangeColors={["#1f2937"]}
                                            months={1}
                                            direction="vertical"
                                            moveRangeOnFirstSelection={false}
                                            editableDateInputs={false}
                                        />
                                    </div>

                                    <button className="w-full mt-6 border border-gray-300 rounded-xl py-3 text-gray-700 hover:bg-gray-50 transition">
                                        load more dates
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Who (Guests) */}
                        {mobileStep === 3 && (
                            <div className="flex-1 overflow-y-auto px-4 py-6 animate-fade-in">
                                {/* Summary of Where and When */}
                                <div className="space-y-3 mb-6">
                                    <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50">
                                        <span className="text-gray-400">where</span>
                                        <span className="font-medium text-gray-900">{destination}</span>
                                    </div>
                                    <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50">
                                        <span className="text-gray-400">when</span>
                                        <span className="font-medium text-gray-900">{formatMobileWhenSummary()}</span>
                                    </div>
                                </div>

                                <div className="border-2 border-gray-900 rounded-2xl p-6">
                                    <h2 className="text-2xl font-medium text-gray-900 mb-4">Who?</h2>
                                    <div className="w-full h-px bg-gray-300 mb-4" />

                                    <div className="space-y-3">
                                        <GuestRow title="Adults" subtitle="Age 13 or above" value={adults} onChange={setAdults} />
                                        <GuestRow title="Children" subtitle="Age 2–12" value={children} onChange={setChildren} />
                                        <GuestRow title="Infants" subtitle="Under 2" value={infants} onChange={setInfants} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer actions */}
                        <div className="border-t border-gray-200 px-4 py-6 space-y-3">
                            {mobileStep < 3 && (
                                <>
                                    <button
                                        onClick={() => setMobileStep(mobileStep + 1)}
                                        className="w-full bg-gray-900 text-white py-3 rounded-full font-medium hover:bg-gray-800 transition"
                                    >
                                        next
                                    </button>
                                    <button className="w-full text-center text-gray-700 underline hover:text-gray-900 transition">
                                        clear all
                                    </button>
                                </>
                            )}
                            {mobileStep === 3 && (
                                <>
                                    <Link href="/searchResult" className="w-full block">
                                        <button className="w-full bg-[#7A3E2C] text-white py-3 rounded-full font-medium hover:bg-[#5c2e20] transition flex items-center justify-center gap-2">
                                            search <FiSearch size={18} />
                                        </button>
                                    </Link>
                                    <button className="w-full text-center text-gray-700 underline hover:text-gray-900 transition">
                                        clear all
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ================= DESKTOP SEARCH BAR ================= */}
            <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-4 relative">
                <div className="flex items-center bg-[#FCFBF7] rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-[70px] font-secondary">
                    {/* Where */}
                    <div
                        className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showWhere ? "bg-gray-200" : "hover:bg-gray-200/60"
                            }`}
                        onClick={() => {
                            setShowWhere(!showWhere)
                            setShowCheckIn(false)
                            setShowCheckOut(false)
                            setShowGuests(false)
                        }}
                    >
                        <p className="text-[16px] font-medium text-gray-800">Where</p>
                        <p className="text-[16px] text-gray-400">{destination ? destination : "Select region"}</p>
                    </div>

                    <div className="w-px h-8 bg-gray-300" />

                    {/* Check in */}
                    <div
                        className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showCheckIn ? "bg-gray-200" : "hover:bg-gray-200/60"
                            }`}
                        onClick={() => {
                            setShowCheckIn(!showCheckIn)
                            setShowWhere(false)
                            setShowCheckOut(false)
                            setShowGuests(false)
                        }}
                    >
                        <p className="text-[16px] font-medium text-gray-800">Check in</p>
                        <p className="text-[16px] text-gray-400">{formatLabelDate(checkInDate)}</p>
                    </div>

                    <div className="w-px h-8 bg-gray-300" />

                    {/* Check out */}
                    <div
                        className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showCheckOut ? "bg-gray-200" : "hover:bg-gray-200/60"
                            }`}
                        onClick={() => {
                            setShowCheckOut(!showCheckOut)
                            setShowWhere(false)
                            setShowCheckIn(false)
                            setShowGuests(false)
                        }}
                    >
                        <p className="text-[16px] font-medium text-gray-800">Check out</p>
                        <p className="text-[16px] text-gray-400">{formatLabelDate(checkOutDate)}</p>
                    </div>

                    <div className="w-px h-8 bg-gray-300" />

                    {/* Who */}
                    <div
                        className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showGuests ? "bg-gray-200" : "hover:bg-gray-200/60"
                            }`}
                        onClick={() => {
                            setShowGuests(!showGuests)
                            setShowWhere(false)
                            setShowCheckIn(false)
                            setShowCheckOut(false)
                        }}
                    >
                        <p className="text-[16px] font-medium text-gray-800">Who</p>
                        <p className="text-[16px] text-gray-400">{getGuestText()}</p>
                    </div>

                    {/* Button Search */}
                    <Link href="/searchResult">
                        <button className="bg-[#7A3E2C] text-white w-[50px] h-[50px] rounded-2xl m-3 flex items-center justify-center hover:bg-[#5c2e20] transition">
                            <FiSearch size={22} />
                        </button>
                    </Link>
                </div>

                {/* Dropdown Where */}
                {showWhere && (
                    <div className="absolute left-3 mt-2 w-[400px] bg-[#FCFBF7] rounded-2xl shadow-lg border border-gray-200 p-4 z-50 font-secondary">
                        <div
                            onClick={() => {
                                setDestination("Bandung")
                                setShowWhere(false)
                            }}
                            className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-xl cursor-pointer"
                        >
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-gray-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 21c0 0 6-6.75 6-11.25A6 6 0 0 0 6 9.75C6 14.25 12 21 12 21z"
                                    />
                                    <circle cx="12" cy="9.75" r="2.25" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[16px] font-medium text-gray-800">Bandung</p>
                                <p className="text-[14px] text-gray-500">West Java, Indonesia</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Dropdown Date (check in & check out) */}
                {(showCheckIn || showCheckOut) && (
                    <div
                        className="absolute left-1/2 -translate-x-1/2 mt-2 bg-[#FCFBF7] rounded-2xl shadow-lg border border-gray-200 p-4 z-50 font-secondary"
                    >
                        <DateRange
                            ranges={dateRange}
                            onChange={handleDateChange}
                            rangeColors={["#7A3E2C"]}
                            months={2}
                            direction="horizontal"
                            moveRangeOnFirstSelection={false}
                            editableDateInputs={true}
                        />

                        <style jsx global>{`
                            .rdrCalendarWrapper {
                                background-color: #FCFBF7;
                            }
                        `}</style>
                    </div>
                )}


                {/* Dropdown Guests */}
                {showGuests && (
                    <div className="absolute right-3 mt-2 w-[380px] bg-[#FCFBF7] rounded-2xl shadow-lg border border-gray-200 px-7 py-5 z-50 font-secondary">
                        <GuestRow title="Adults" subtitle="Age 13 or above" value={adults} onChange={setAdults} />
                        <GuestRow title="Children" subtitle="Age 2–12" value={children} onChange={setChildren} />
                        <GuestRow title="Infants" subtitle="Under 2" value={infants} onChange={setInfants} />
                    </div>
                )}
            </div>
        </div>
    )
}
