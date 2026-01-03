"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { FiSearch, FiMinus, FiPlus, FiChevronLeft, FiX } from "react-icons/fi"
import { DateRange, type Range } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function SearchBar() {
    const [openMobile, setOpenMobile] = useState(false)
    const [mobileStep, setMobileStep] = useState(0)
    const [mounted, setMounted] = useState(false)
    const searchParams = useSearchParams()

    useEffect(() => {
        setMounted(true)
        if (searchParams.get("openModal") === "true") {
            setOpenMobile(true)
            setMobileStep(0)
        }
    }, [searchParams])

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
        if (!checkInDate || !checkOutDate) return "Select dates"
        return `${checkInDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${checkOutDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
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
        if (!checkInDate && !checkOutDate) return "add dates"
        if (checkInDate && !checkOutDate) return checkInDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        if (checkInDate && checkOutDate) {
            return `${checkInDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${checkOutDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
        }
        return "add dates"
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
        setMobileStep(0)
    }

    // Clear all mobile state
    const handleClearAll = () => {
        setDestination("")
        setDateRange([
            {
                startDate: new Date(),
                endDate: new Date(),
                key: "selection",
            },
        ])
        setCheckInDate(null)
        setCheckOutDate(null)
        setAdults(0)
        setChildren(0)
        setInfants(0)
        setMobileStep(0)
    }

    // Disable body scroll when mobile modal is open
    useEffect(() => {
        if (openMobile) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [openMobile])

    return (
        <div className="relative z-40">
            {/* ================= MOBILE SEARCH BAR ================= */}
            <div className="lg:hidden px-4">
                <button
                    onClick={() => setOpenMobile(true)}
                    className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-[#E7E6E2] bg-[#FCFBF7] shadow"
                >
                    <span className="text-gray-500">Start your search</span>
                    <FiSearch />
                </button>
            </div>

            {/* ================= MOBILE MODAL WITH STEP FLOW ================= */}
            {openMobile && mounted && createPortal(
                <div className="fixed inset-0 bg-[#FCFBF7] z-[9999] lg:hidden font-secondary overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="px-5 pt-6 pb-4 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => {
                                    if (mobileStep > 0) {
                                        setMobileStep(0)
                                    } else {
                                        handleMobileClose()
                                    }
                                }}
                                className="text-gray-800 p-1"
                            >
                                <FiChevronLeft size={28} />
                            </button>

                            {/* Tabs navigation */}
                            <div className="flex gap-8">
                                <button className="text-[15px] font-medium text-gray-900 border-b-2 border-gray-900 pb-1">stays</button>
                                <Link href="/events?openModal=true" className="text-[15px] font-medium text-gray-400 pb-1">events</Link>
                                <Link href="/shoots?openModal=true" className="text-[15px] font-medium text-gray-400 pb-1">shoots</Link>
                            </div>

                            <button onClick={handleMobileClose} className="text-gray-800 p-1">
                                <FiX size={28} />
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto px-5 pb-6">
                        {/* Step 0: All Collapsed */}
                        {mobileStep === 0 && (
                            <div className="animate-fade-in space-y-3 pt-2">
                                <div
                                    onClick={() => setMobileStep(1)}
                                    className="bg-[#FCFBF7] border border-gray-200 rounded-2xl px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <span className="text-gray-400 text-md">where</span>
                                    <span className="font-semibold text-gray-900 text-md">{destination || "select region"}</span>
                                </div>
                                <div
                                    onClick={() => setMobileStep(2)}
                                    className="bg-[#FCFBF7] border border-gray-200 rounded-2xl px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <span className="text-gray-400 text-md">when</span>
                                    <span className="font-semibold text-gray-900 text-md">{formatMobileWhenSummary() !== "add dates" ? formatMobileDateRange() : "add dates"}</span>
                                </div>
                                <div
                                    onClick={() => setMobileStep(3)}
                                    className="bg-[#FCFBF7] border border-gray-200 rounded-2xl px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <span className="text-gray-400 text-md">who</span>
                                    <span className="font-semibold text-gray-900 text-md">
                                        {totalGuests === 0 ? "add guests" : `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Step 1: Where */}
                        {mobileStep === 1 && (
                            <div className="animate-fade-in flex flex-col h-full">
                                {/* Main Active Card */}
                                <div className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] p-6 shadow-sm mb-4 min-h-[500px] flex flex-col">
                                    <div
                                        onClick={() => setMobileStep(0)}
                                        className="mb-4 cursor-pointer"
                                    >
                                        <h2 className="text-[24px] font-primary text-gray-900 mb-4">
                                            Where?
                                        </h2>
                                        <div className="w-full h-px bg-gray-200" />
                                    </div>

                                    {/* Destination List */}
                                    <div className="space-y-1">
                                        {/* Bandung */}
                                        <button
                                            onClick={() => setDestination("Bandung")}
                                            className="w-full text-left"
                                        >
                                            <div
                                                className={`py-4 px-2 rounded-2xl flex items-center gap-4 transition-all ${destination === "Bandung"
                                                    ? "bg-gray-100"
                                                    : "bg-transparent hover:bg-gray-50"
                                                    }`}
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-[#EAEAEA] flex items-center justify-center">
                                                    <FiSearch size={24} className="text-gray-800" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-[16px]">
                                                        Bandung
                                                    </p>
                                                    <p className="text-gray-500 text-[12px]">
                                                        West Java, Indonesia
                                                    </p>
                                                </div>
                                            </div>
                                        </button>

                                        {/* Jakarta */}
                                        <button
                                            onClick={() => setDestination("Jakarta")}
                                            className="w-full text-left"
                                        >
                                            <div
                                                className={`py-4 px-2 rounded-2xl flex items-center gap-4 transition-all ${destination === "Jakarta"
                                                    ? "bg-gray-100"
                                                    : "bg-transparent hover:bg-gray-50"
                                                    }`}
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-[#EAEAEA] flex items-center justify-center">
                                                    <FiSearch size={24} className="text-gray-800" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-[16px]">
                                                        Jakarta
                                                    </p>
                                                    <p className="text-gray-500 text-[12px]">
                                                        DKI Jakarta, Indonesia
                                                    </p>
                                                </div>
                                            </div>
                                        </button>

                                        {/* Bali */}
                                        <button
                                            onClick={() => setDestination("Bali")}
                                            className="w-full text-left"
                                        >
                                            <div
                                                className={`py-4 px-2 rounded-2xl flex items-center gap-4 transition-all ${destination === "Bali"
                                                    ? "bg-gray-100"
                                                    : "bg-transparent hover:bg-gray-50"
                                                    }`}
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-[#EAEAEA] flex items-center justify-center">
                                                    <FiSearch size={24} className="text-gray-800" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-[16px]">
                                                        Bali
                                                    </p>
                                                    <p className="text-gray-500 text-[12px]">
                                                        Bali, Indonesia
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    </div>

                                    <div className="mt-auto mb-2">
                                        <p className="text-gray-400 italic font-primary text-[12px]">
                                            more destination coming soon
                                        </p>
                                    </div>
                                </div>

                                {/* Inactive Options */}
                                <div className="space-y-3">
                                    <div
                                        onClick={() => setMobileStep(2)}
                                        className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition"
                                    >
                                        <span className="text-gray-400 text-md">when</span>
                                        <span className="font-semibold text-gray-900 text-md">
                                            {formatMobileWhenSummary() !== "add dates"
                                                ? formatMobileDateRange()
                                                : "add dates"}
                                        </span>
                                    </div>

                                    <div
                                        onClick={() => setMobileStep(3)}
                                        className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition"
                                    >
                                        <span className="text-gray-400 text-md">who</span>
                                        <span className="font-semibold text-gray-900 text-md">
                                            {totalGuests === 0
                                                ? "add guests"
                                                : `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* Step 2: When (Calendar) */}
                        {mobileStep === 2 && (
                            <div className="animate-fade-in flex flex-col h-full">
                                {/* Where Summary */}
                                <div
                                    onClick={() => setMobileStep(1)}
                                    className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm mb-3 cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <span className="text-gray-400 text-md">where</span>
                                    <span className="font-semibold text-gray-900 text-md">{destination || "select region"}</span>
                                </div>

                                {/* Active When Card */}
                                <div className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] p-6 shadow-sm mb-3">
                                    <div
                                        onClick={() => setMobileStep(0)}
                                        className="mb-4 cursor-pointer"
                                    >
                                        <h2 className="text-[24px] font-primary text-gray-900 mb-4">
                                            When?
                                        </h2>
                                        <div className="w-full h-px bg-gray-200" />
                                    </div>
                                    <div className="flex justify-center -mx-4">
                                        <DateRange
                                            ranges={dateRange}
                                            onChange={(item: any) => {
                                                const sel = item.selection as Range
                                                setDateRange([sel])
                                                setCheckInDate(sel.startDate ?? null)
                                                setCheckOutDate(sel.endDate ?? null)
                                            }}
                                            rangeColors={["#7A3E2C"]}
                                            months={1}
                                            direction="vertical"
                                            moveRangeOnFirstSelection={false}
                                            editableDateInputs={false}
                                        />
                                    </div>
                                </div>

                                {/* Who Summary */}
                                <div
                                    onClick={() => setMobileStep(3)}
                                    className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <span className="text-gray-400 text-lg">who</span>
                                    <span className="font-semibold text-gray-900 text-md">
                                        {totalGuests === 0 ? "add guests" : `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Who (Guests) */}
                        {mobileStep === 3 && (
                            <div className="animate-fade-in flex flex-col h-full">
                                {/* Where Summary */}
                                <div
                                    onClick={() => setMobileStep(1)}
                                    className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm mb-3 cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <span className="text-gray-400 text-md">where</span>
                                    <span className="font-semibold text-gray-900 text-md">{destination || "select region"}</span>
                                </div>

                                {/* When Summary */}
                                <div
                                    onClick={() => setMobileStep(2)}
                                    className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm mb-3 cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <span className="text-gray-400 text-mf">when</span>
                                    <span className="font-semibold text-gray-900 text-md">{formatMobileWhenSummary() !== "add dates" ? formatMobileDateRange() : "add dates"}</span>
                                </div>

                                {/* Active Who Card */}
                                <div className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] p-6 shadow-sm h-full">
                                    <div
                                        onClick={() => setMobileStep(0)}
                                        className="mb-4 cursor-pointer"
                                    >
                                        <h2 className="text-[24px] font-primary text-gray-900 mb-4">
                                            Who?
                                        </h2>
                                        <div className="w-full h-px bg-gray-200" />
                                    </div>
                                    <div className="space-y-4">
                                        {/* Custom Boxed Guest Rows */}
                                        <div className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between bg-[#FCFBF7] shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                                            <div>
                                                <p className="text-[16px] font-semibold text-gray-900">Adults</p>
                                                <p className="text-[14px] text-gray-500">Age 13 or above</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setAdults(Math.max(0, adults - 1))}
                                                    disabled={adults === 0}
                                                    className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 disabled:opacity-30"
                                                >
                                                    <FiMinus size={16} />
                                                </button>
                                                <span className="w-4 text-center text-gray-900 font-medium">{adults}</span>
                                                <button
                                                    onClick={() => setAdults(adults + 1)}
                                                    className="w-8 h-8 rounded-full border border-gray-900 flex items-center justify-center text-gray-900"
                                                >
                                                    <FiPlus size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between bg-[#FCFBF7] shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                                            <div>
                                                <p className="text-[16px] font-semibold text-gray-900">Children</p>
                                                <p className="text-[14px] text-gray-500">Age 2–12</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setChildren(Math.max(0, children - 1))}
                                                    disabled={children === 0}
                                                    className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 disabled:opacity-30"
                                                >
                                                    <FiMinus size={16} />
                                                </button>
                                                <span className="w-4 text-center text-gray-900 font-medium">{children}</span>
                                                <button
                                                    onClick={() => setChildren(children + 1)}
                                                    className="w-8 h-8 rounded-full border border-gray-900 flex items-center justify-center text-gray-900"
                                                >
                                                    <FiPlus size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between bg-[#FCFBF7] shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                                            <div>
                                                <p className="text-[16px] font-semibold text-gray-900">Infants</p>
                                                <p className="text-[14px] text-gray-500">Under 2</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setInfants(Math.max(0, infants - 1))}
                                                    disabled={infants === 0}
                                                    className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 disabled:opacity-30"
                                                >
                                                    <FiMinus size={16} />
                                                </button>
                                                <span className="w-4 text-center text-gray-900 font-medium">{infants}</span>
                                                <button
                                                    onClick={() => setInfants(infants + 1)}
                                                    className="w-8 h-8 rounded-full border border-gray-900 flex items-center justify-center text-gray-900"
                                                >
                                                    <FiPlus size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions (Sticky Bottom) */}
                    <div className="px-4 py-4 bg-[#FCFBF7]">
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleClearAll}
                                className="text-center underline font-medium text-[15px] text-gray-800"
                            >
                                clear all
                            </button>
                            <Link href="/searchResult" className="w-full">
                                <button className="w-full bg-[#7A3E2C] text-white rounded-xl py-4 px-4 flex items-center justify-between shadow-md active:scale-95 transition-transform">
                                    <span className="text-[15px] font-medium">search</span>
                                    <FiSearch size={18} />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* ================= DESKTOP SEARCH BAR ================= */}
            <div ref={dropdownRef} className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-4 relative">
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
                        <p className="text-[16px] text-gray-400">{destination ? destination : "select region"}</p>
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
