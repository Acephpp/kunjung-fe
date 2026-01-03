"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { FiSearch, FiChevronLeft, FiX } from "react-icons/fi"
import { addDays, format } from "date-fns"
import Calendar from "react-date-range/dist/components/Calendar"
import { DateRange, Range } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

type ShootOption =
    | "instacation"
    | "session-morning"
    | "session-afternoon"
    | "session-fullday"
    | ""

type ShootSection = "instacation" | "session" | ""
type ActiveDateField = "single" | "checkin" | "checkout" | null

export default function ShootSearchBar() {
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

    const [showRegion, setShowRegion] = useState(false)
    const [showDate, setShowDate] = useState(false)
    const [showShoot, setShowShoot] = useState(false)

    const [region, setRegion] = useState("")
    const [shootType, setShootType] = useState<ShootOption>("")
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    // untuk Instacation (range)
    const [checkIn, setCheckIn] = useState<Date | null>(null)
    const [checkOut, setCheckOut] = useState<Date | null>(null)
    const [activeDateField, setActiveDateField] = useState<ActiveDateField>("single")

    // state DateRange khusus Instacation
    const [range, setRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ])

    // section yang sedang dibuka di popup type of shoot
    const [openShootSection, setOpenShootSection] = useState<ShootSection>("instacation")

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowRegion(false)
                setShowDate(false)
                setShowShoot(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

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


    // 📅 Quick date options (dipakai hanya untuk popup WHEN)
    const today = new Date()
    const tomorrow = addDays(today, 1)
    const weekendStart = addDays(today, 1)
    const weekendEnd = addDays(today, 2)

    const getShootLabel = () => {
        switch (shootType) {
            case "instacation":
                return "Instacation"
            case "session-morning":
                return "Morning session"
            case "session-afternoon":
                return "Afternoon session"
            case "session-fullday":
                return "Full day session"
            default:
                return "Add shoot"
        }
    }

    const handleSelectShoot = (type: ShootOption) => {
        setShootType(type)
        setShowShoot(false)

        // kalau instacation → pakai range (check in / check out)
        if (type === "instacation") {
            setActiveDateField("checkin")
        } else {
            setActiveDateField("single")
        }
        // Mobile behavior: close modal (step 0)
        setMobileStep(0)
    }

    const handleMobileClose = () => {
        setOpenMobile(false)
        setMobileStep(0)
    }

    const handleClearAll = () => {
        setRegion("")
        setSelectedDate(null)
        setCheckIn(null)
        setCheckOut(null)
        setShootType("")
        setRange([{
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        }])
        setMobileStep(0)
    }

    // helper tampilkan text di check-in / check-out
    const renderCheckInText = () =>
        checkIn ? format(checkIn, "MMM dd") : "Select dates"

    const renderCheckOutText = () =>
        checkOut ? format(checkOut, "MMM dd") : "Select dates"

    // handler DateRange untuk Instacation (rule mirip SearchBar)
    const handleRangeChange = (item: any) => {
        const sel = item.selection as Range
        setRange([sel])

        const start = sel.startDate ?? null
        const end = sel.endDate ?? null

        setCheckIn(start)
        setCheckOut(end)

        // Mobile specific: don't auto close, just update state
    }

    // handler untuk quick option & calendar pada popup WHEN (single date)
    const applyDate = (date: Date) => {
        setSelectedDate(date)
        setShowDate(false)
        // Mobile specific
        if (mobileStep === 2) setMobileStep(0)
    }

    return (
        <div ref={dropdownRef} className="relative z-40">
            {/* ================= MOBILE SEARCH BAR ================= */}
            <div className="lg:hidden px-4">
                <button
                    onClick={() => setOpenMobile(true)}
                    className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-[#E7E6E2] bg-[#FCFBF7] shadow"
                >
                    <span className="text-gray-500">Find shoots</span>
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
                                <Link href="/?openModal=true" className="text-[15px] font-medium text-gray-400 pb-1">stays</Link>
                                <Link href="/events?openModal=true" className="text-[15px] font-medium text-gray-400 pb-1">events</Link>
                                <button className="text-[15px] font-medium text-gray-900 border-b-2 border-gray-900 pb-1">shoots</button>
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
                                    <span className="font-semibold text-gray-900 text-md">{region || "select region"}</span>
                                </div>
                                <div
                                    onClick={() => setMobileStep(2)}
                                    className="bg-[#FCFBF7] border border-gray-200 rounded-2xl px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <span className="text-gray-400 text-md">when</span>
                                    <span className="font-semibold text-gray-900 text-md">
                                        {shootType === "instacation"
                                            ? (checkIn && checkOut ? `${format(checkIn, "MMM dd")} - ${format(checkOut, "MMM dd")}` : "add dates")
                                            : (selectedDate ? format(selectedDate, "MMM dd") : "add dates")
                                        }
                                    </span>
                                </div>
                                <div
                                    onClick={() => setMobileStep(3)}
                                    className="bg-[#FCFBF7] border border-gray-200 rounded-2xl px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <span className="text-gray-400 text-md">type of shoot</span>
                                    <span className="font-semibold text-gray-900 text-md">{getShootLabel().replace("Add shoot", "add shoot")}</span>
                                </div>
                            </div>
                        )}

                        {/* Step 1: Where */}
                        {mobileStep === 1 && (
                            <div className="animate-fade-in flex flex-col h-full">
                                {/* Active Where Card */}
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

                                    <div className="space-y-1">
                                        {[{ name: "Bandung", sub: "West Java, Indonesia" }, { name: "Jakarta", sub: "DKI Jakarta, Indonesia" }, { name: "Bali", sub: "Bali, Indonesia" }].map((loc) => (
                                            <button
                                                key={loc.name}
                                                onClick={() => setRegion(loc.name)}
                                                className="w-full text-left"
                                            >
                                                <div
                                                    className={`py-4 px-2 rounded-2xl flex items-center gap-4 transition-all ${region === loc.name
                                                        ? "bg-gray-100"
                                                        : "bg-transparent hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-[#EAEAEA] flex items-center justify-center">
                                                        <FiSearch size={24} className="text-gray-800" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-[16px]">
                                                            {loc.name}
                                                        </p>
                                                        <p className="text-gray-500 text-[12px]">
                                                            {loc.sub}
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-auto mb-2">
                                        <p className="text-gray-400 italic font-primary text-[12px]">
                                            more destination coming soon
                                        </p>
                                    </div>
                                </div>

                                {/* Inactive Options */}
                                <div className="space-y-3">
                                    <div onClick={() => setMobileStep(2)} className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition">
                                        <span className="text-gray-400 text-md">when</span>
                                        <span className="font-semibold text-gray-900 text-md">
                                            {shootType === "instacation"
                                                ? (checkIn && checkOut ? `${format(checkIn, "MMM dd")} - ${format(checkOut, "MMM dd")}` : "add dates")
                                                : (selectedDate ? format(selectedDate, "MMM dd") : "add dates")
                                            }
                                        </span>
                                    </div>
                                    <div onClick={() => setMobileStep(3)} className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition">
                                        <span className="text-gray-400 text-md">type of shoot</span>
                                        <span className="font-semibold text-gray-900 text-md">{getShootLabel().replace("Add shoot", "add shoot")}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: When (Dynamic Calendar) */}
                        {mobileStep === 2 && (
                            <div className="animate-fade-in flex flex-col h-full">
                                {/* Where Summary */}
                                <div onClick={() => setMobileStep(1)} className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm mb-3 cursor-pointer hover:bg-gray-50 transition">
                                    <span className="text-gray-400 text-md">where</span>
                                    <span className="font-semibold text-gray-900 text-md">{region || "select region"}</span>
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

                                    {/* DYNAMIC CALENDAR CONTENT */}
                                    <div className="flex justify-center -mx-4">
                                        {shootType === "instacation" ? (
                                            <DateRange
                                                ranges={range}
                                                onChange={handleRangeChange}
                                                rangeColors={["#7A3E2C"]}
                                                months={1}
                                                direction="horizontal"
                                                editableDateInputs={true}
                                            />
                                        ) : (
                                            <Calendar
                                                date={selectedDate || new Date()}
                                                onChange={(date: Date) => {
                                                    setSelectedDate(date)
                                                }}
                                                color="#7A3E2C"
                                                monthDisplayFormat="MMMM yyyy"
                                            />
                                        )}
                                    </div>

                                    <style jsx global>{`
                                        .rdrCalendarWrapper {
                                            background-color: transparent !important;
                                        }
                                        .rdrMonth {
                                            width: 100% !important;
                                        }
                                    `}</style>
                                </div>

                                {/* Type of Shoot Summary */}
                                <div onClick={() => setMobileStep(3)} className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition">
                                    <span className="text-gray-400 text-md">type of shoot</span>
                                    <span className="font-semibold text-gray-900 text-md">{getShootLabel().replace("Add shoot", "add shoot")}</span>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Type of Shoot (Sticky Header) */}
                        {mobileStep === 3 && (
                            <div className="animate-fade-in flex flex-col h-full">
                                {/* Where Summary */}
                                <div onClick={() => setMobileStep(1)} className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm mb-3 cursor-pointer hover:bg-gray-50 transition">
                                    <span className="text-gray-400 text-md">where</span>
                                    <span className="font-semibold text-gray-900 text-md">{region || "select region"}</span>
                                </div>
                                {/* When Summary */}
                                <div onClick={() => setMobileStep(2)} className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm mb-3 cursor-pointer hover:bg-gray-50 transition">
                                    <span className="text-gray-400 text-md">when</span>
                                    <span className="font-semibold text-gray-900 text-md">
                                        {shootType === "instacation"
                                            ? (checkIn && checkOut ? `${format(checkIn, "MMM dd")} - ${format(checkOut, "MMM dd")}` : "add dates")
                                            : (selectedDate ? format(selectedDate, "MMM dd") : "add dates")
                                        }
                                    </span>
                                </div>

                                {/* Active Type of Shoot Card (with Sticky Header) */}
                                <div className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] shadow-sm h-full flex flex-col overflow-hidden relative">
                                    {/* Sticky Header */}
                                    <div
                                        onClick={() => setMobileStep(0)}
                                        className="p-6 pb-2 cursor-pointer bg-[#FCFBF7] z-10 flex-shrink-0"
                                    >
                                        <h2 className="text-[24px] font-primary text-gray-900 mb-4">
                                            Type of shoot?
                                        </h2>
                                        <div className="w-full h-px bg-gray-200" />
                                    </div>

                                    {/* Scrollable Content */}
                                    <div className="p-6 pt-4 space-y-6 font-secondary text-gray-800 overflow-y-auto flex-1">
                                        {/* Instacation */}
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => setOpenShootSection(openShootSection === "instacation" ? "" : "instacation")}
                                                className="w-full flex items-center justify-between group"
                                            >
                                                <span className="text-[18px] font-semibold text-gray-800 group-hover:text-gray-600 transition">Instacation</span>
                                                <span className="text-[24px] leading-none text-gray-400 font-light">
                                                    {openShootSection === "instacation" ? "−" : "+"}
                                                </span>
                                            </button>

                                            <div
                                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openShootSection === "instacation" ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                                                    }`}
                                            >
                                                <div className="space-y-5 pl-5">
                                                    <div className="flex items-center justify-between cursor-pointer group" onClick={() => handleSelectShoot("instacation")}>
                                                        <div>
                                                            <p className="text-[15px] text-gray-600 group-hover:text-gray-900 transition">This package include</p>
                                                            <p className="text-[13px] text-gray-500">stay & shooting session</p>
                                                        </div>
                                                        <span className={`text-[12px] font-medium transition ${shootType === "instacation" ? "text-gray-400" : "text-gray-300 group-hover:text-gray-400"}`}>
                                                            {shootType === "instacation" ? "selected" : "select"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full h-px bg-gray-100 mt-4" />
                                        </div>

                                        {/* Session Shoot */}
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => setOpenShootSection(openShootSection === "session" ? "" : "session")}
                                                className="w-full flex items-center justify-between group"
                                            >
                                                <span className="text-[18px] font-semibold text-gray-800 group-hover:text-gray-600 transition">Session shoot</span>
                                                <span className="text-[24px] leading-none text-gray-400 font-light">
                                                    {openShootSection === "session" ? "−" : "+"}
                                                </span>
                                            </button>

                                            <div
                                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openShootSection === "session" ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                                                    }`}
                                            >
                                                <div className="space-y-4 pl-5">
                                                    {/* Morning */}
                                                    <div className="flex items-center justify-between cursor-pointer group" onClick={() => handleSelectShoot("session-morning")}>
                                                        <div>
                                                            <p className="text-[15px] text-gray-600 group-hover:text-gray-900 transition mb-0">Morning session (5hr)</p>
                                                            <p className="text-[13px] font-semibold text-gray-800">07am—12pm</p>
                                                        </div>
                                                        <span className={`text-[12px] font-medium transition ${shootType === "session-morning" ? "text-gray-400" : "text-gray-300 group-hover:text-gray-400"}`}>
                                                            {shootType === "session-morning" ? "selected" : "select"}
                                                        </span>
                                                    </div>

                                                    <div className="w-full h-px bg-gray-100" />

                                                    {/* Afternoon */}
                                                    <div className="flex items-center justify-between cursor-pointer group" onClick={() => handleSelectShoot("session-afternoon")}>
                                                        <div>
                                                            <p className="text-[15px] text-gray-600 group-hover:text-gray-900 transition mb-0">Afternoon session (5hr)</p>
                                                            <p className="text-[13px] font-semibold text-gray-800">01pm—06pm</p>
                                                        </div>
                                                        <span className={`text-[12px] font-medium transition ${shootType === "session-afternoon" ? "text-gray-400" : "text-gray-300 group-hover:text-gray-400"}`}>
                                                            {shootType === "session-afternoon" ? "selected" : "select"}
                                                        </span>
                                                    </div>

                                                    <div className="w-full h-px bg-gray-100" />

                                                    {/* Full Day */}
                                                    <div className="flex items-center justify-between cursor-pointer group" onClick={() => handleSelectShoot("session-fullday")}>
                                                        <div>
                                                            <p className="text-[15px] text-gray-600 group-hover:text-gray-900 transition mb-0">Full day session (11hr)</p>
                                                            <p className="text-[13px] font-semibold text-gray-800">07am—06pm</p>
                                                        </div>
                                                        <span className={`text-[12px] font-medium transition ${shootType === "session-fullday" ? "text-gray-400" : "text-gray-300 group-hover:text-gray-400"}`}>
                                                            {shootType === "session-fullday" ? "selected" : "select"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full h-px bg-gray-100 mt-4" />
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
                            <Link href="/shoots/searchResult" className="w-full">
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
            <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-4 relative">
                {/* === Search Bar === */}
                <div className="flex items-center bg-[#FCFBF7] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden h-[70px] font-secondary">
                    {/* WHERE */}
                    <div
                        className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showRegion ? "bg-gray-100" : "hover:bg-gray-100/60"
                            }`}
                        onClick={() => {
                            setShowRegion(!showRegion)
                            setShowDate(false)
                            setShowShoot(false)
                        }}
                    >
                        <p className="text-[16px] font-medium text-gray-800">Where</p>
                        <p className="text-[15px] text-gray-400">
                            {region || "select region"}
                        </p>
                    </div>

                    <div className="w-px h-8 bg-gray-300" />

                    {/* === DATE PART === */}
                    {shootType === "instacation" ? (
                        <>
                            {/* CHECK IN */}
                            <div
                                className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showDate && activeDateField === "checkin"
                                    ? "bg-gray-100"
                                    : "hover:bg-gray-100/60"
                                    }`}
                                onClick={() => {
                                    setActiveDateField("checkin")
                                    // sync range dengan state sekarang
                                    setRange([
                                        {
                                            startDate: checkIn || new Date(),
                                            endDate: checkOut || addDays(new Date(), 1),
                                            key: "selection",
                                        },
                                    ])
                                    setShowDate(true)
                                    setShowRegion(false)
                                    setShowShoot(false)
                                }}
                            >
                                <p className="text-[16px] font-medium text-gray-800">
                                    Check in
                                </p>
                                <p className="text-[15px] text-gray-400">
                                    {renderCheckInText()}
                                </p>
                            </div>

                            <div className="w-px h-8 bg-gray-300" />

                            {/* CHECK OUT */}
                            <div
                                className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showDate && activeDateField === "checkout"
                                    ? "bg-gray-100"
                                    : "hover:bg-gray-100/60"
                                    }`}
                                onClick={() => {
                                    setActiveDateField("checkout")
                                    setRange([
                                        {
                                            startDate: checkIn || new Date(),
                                            endDate: checkOut || addDays(new Date(), 1),
                                            key: "selection",
                                        },
                                    ])
                                    setShowDate(true)
                                    setShowRegion(false)
                                    setShowShoot(false)
                                }}
                            >
                                <p className="text-[16px] font-medium text-gray-800">
                                    Check out
                                </p>
                                <p className="text-[15px] text-gray-400">
                                    {renderCheckOutText()}
                                </p>
                            </div>
                        </>
                    ) : (
                        // MODE BIASA: hanya "When" (JANGAN DIUBAH RULE & TAMPILANNYA)
                        <>
                            <div
                                className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showDate && activeDateField === "single"
                                    ? "bg-gray-100"
                                    : "hover:bg-gray-100/60"
                                    }`}
                                onClick={() => {
                                    setActiveDateField("single")
                                    setShowDate(!showDate)
                                    setShowRegion(false)
                                    setShowShoot(false)
                                }}
                            >
                                <p className="text-[16px] font-medium text-gray-800">When</p>
                                <p className="text-[15px] text-gray-400">
                                    {selectedDate
                                        ? format(selectedDate, "MMMM dd, yyyy")
                                        : "Select dates"}
                                </p>
                            </div>
                        </>
                    )}

                    <div className="w-px h-8 bg-gray-300" />

                    {/* TYPE OF SHOOT */}
                    <div
                        className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showShoot ? "bg-gray-100" : "hover:bg-gray-100/60"
                            }`}
                        onClick={() => {
                            setShowShoot(!showShoot)
                            setShowRegion(false)
                            setShowDate(false)
                        }}
                    >
                        <p className="text-[16px] font-medium text-gray-800">Type of shoot</p>
                        <p className="text-[15px] text-gray-400">{getShootLabel()}</p>
                    </div>

                    {/* SEARCH BUTTON */}
                    <Link href="/shoots/searchResult">
                        <button className="bg-gray-100 text-gray-700 w-[55px] h-[55px] rounded-xl m-3 flex items-center justify-center hover:bg-gray-200 transition">
                            <FiSearch size={20} />
                        </button>
                    </Link>
                </div>

                {/* === DROPDOWN TYPE OF SHOOT (Instacation + Session shoot) === */}
                {showShoot && (
                    <div className="absolute right-3 mt-2 w-[380px] bg-[#FCFBF7] rounded-2xl shadow-[0_6px_25px_rgba(0,0,0,0.08)] border border-gray-200 py-4 z-50 font-secondary">
                        {/* Instacation header */}
                        <button
                            type="button"
                            className="w-full px-5 py-2 flex items-center justify-between"
                            onClick={() =>
                                setOpenShootSection((prev) =>
                                    prev === "instacation" ? "" : "instacation"
                                )
                            }
                        >
                            <span className="text-[16px] font-semibold text-gray-900">
                                Instacation
                            </span>
                            <span className="text-[18px] leading-none text-gray-800">
                                {openShootSection === "instacation" ? "−" : "+"}
                            </span>
                        </button>

                        {/* Instacation content */}
                        {openShootSection === "instacation" && (
                            <div className="mt-2 mb-4 px-5">
                                <div className="flex items-center justify-between">
                                    <p className="text-[13px] text-gray-600 leading-snug">
                                        This package include
                                        <br />
                                        stay &amp; shooting session
                                    </p>
                                    <button
                                        type="button"
                                        className={`text-[12px] ${shootType === "instacation"
                                            ? "text-gray-500"
                                            : "text-gray-600 underline"
                                            }`}
                                        onClick={() => handleSelectShoot("instacation")}
                                    >
                                        {shootType === "instacation" ? "selected" : "select"}
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="border-b border-gray-200 mx-5 my-2" />

                        {/* Session shoot header */}
                        <button
                            type="button"
                            className="w-full px-5 py-2 flex items-center justify-between"
                            onClick={() =>
                                setOpenShootSection((prev) =>
                                    prev === "session" ? "" : "session"
                                )
                            }
                        >
                            <span className="text-[16px] font-semibold text-gray-900">
                                Session shoot
                            </span>
                            <span className="text-[18px] leading-none text-gray-800">
                                {openShootSection === "session" ? "−" : "+"}
                            </span>
                        </button>

                        {/* Session shoot list */}
                        {openShootSection === "session" && (
                            <div className="mt-3 mb-1">
                                {/* Morning */}
                                <div className="px-5">
                                    <div className="flex items-center justify-between pl-3 pr-3 py-2 cursor-pointer">
                                        <div>
                                            <p className="text-[13px] text-gray-700">
                                                Morning session (5hr)
                                            </p>
                                            <p className="text-[13px] font-semibold text-gray-900">
                                                07am—12pm
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleSelectShoot("session-morning")}
                                            className={`text-[12px] ${shootType === "session-morning"
                                                ? "text-gray-500"
                                                : "text-gray-600 underline"
                                                }`}
                                        >
                                            {shootType === "session-morning" ? "selected" : "select"}
                                        </button>
                                    </div>
                                    <div className="border-b border-gray-200 mx-3" />
                                </div>

                                {/* Afternoon */}
                                <div className="px-5 mt-1">
                                    <div className="flex items-center justify-between pl-3 pr-3 py-2 cursor-pointer">
                                        <div>
                                            <p className="text-[13px] text-gray-700">
                                                Afternoon session (5hr)
                                            </p>
                                            <p className="text-[13px] font-semibold text-gray-900">
                                                01pm—06pm
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSelectShoot("session-afternoon")
                                            }
                                            className={`text-[12px] ${shootType === "session-afternoon"
                                                ? "text-gray-500"
                                                : "text-gray-600 underline"
                                                }`}
                                        >
                                            {shootType === "session-afternoon"
                                                ? "selected"
                                                : "select"}
                                        </button>
                                    </div>
                                    <div className="border-b border-gray-200 mx-3" />
                                </div>

                                {/* Full day */}
                                <div className="px-5 mt-1">
                                    <div className="flex items-center justify-between pl-3 pr-3 py-2 cursor-pointer">
                                        <div>
                                            <p className="text-[13px] text-gray-700">
                                                Full day session (11hr)
                                            </p>
                                            <p className="text-[13px] font-semibold text-gray-900">
                                                07am—06pm
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleSelectShoot("session-fullday")}
                                            className={`text-[12px] ${shootType === "session-fullday"
                                                ? "text-gray-500"
                                                : "text-gray-600 underline"
                                                }`}
                                        >
                                            {shootType === "session-fullday" ? "selected" : "select"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* === DROPDOWN DATE === */}
                {/* 1) Popup WHEN (single date) – TIDAK DIUBAH */}
                {showDate && activeDateField === "single" && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-[#FCFBF7] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-gray-200 p-0 z-50 font-secondary flex overflow-hidden">
                        {/* LEFT QUICK OPTIONS */}
                        <div className="w-[40%] bg-[#F9F8F4] flex flex-col justify-start gap-3 p-5 border-r border-gray-200">
                            <div
                                className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
                                onClick={() => applyDate(today)}
                            >
                                <p className="font-semibold text-gray-800">Today</p>
                                <p className="text-sm text-gray-500">
                                    {format(today, "MMMM dd")}
                                </p>
                            </div>

                            <div
                                className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
                                onClick={() => applyDate(tomorrow)}
                            >
                                <p className="font-semibold text-gray-800">Tomorrow</p>
                                <p className="text-sm text-gray-500">
                                    {format(tomorrow, "MMMM dd")}
                                </p>
                            </div>

                            <div
                                className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
                                onClick={() => applyDate(weekendStart)}
                            >
                                <p className="font-semibold text-gray-800">This weekend</p>
                                <p className="text-sm text-gray-500">
                                    {`${format(weekendStart, "MMMM dd")} - ${format(
                                        weekendEnd,
                                        "dd"
                                    )}`}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT CALENDAR */}
                        <div className="flex-1 p-5">
                            <Calendar
                                date={selectedDate || new Date()}
                                onChange={(date: Date) => applyDate(date)}
                                color="#7A3E2C"
                                monthDisplayFormat="MMMM yyyy"
                            />
                            <style jsx global>{`
                             .rdrCalendarWrapper {
                                 background-color: #FCFBF7;
                             }
                         `}</style>
                        </div>
                    </div>
                )}

                {/* 2) Popup CHECK IN / CHECK OUT – tampilan & rule seperti SearchBar */}
                {showDate && activeDateField !== "single" && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-[#FCFBF7] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-gray-200 p-4 z-50 font-secondary">
                        <DateRange
                            ranges={range}
                            onChange={handleRangeChange}
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

                {/* === DROPDOWN REGION === */}
                {showRegion && (
                    <div className="absolute left-3 mt-2 w-[380px] bg-[#FCFBF7] rounded-2xl shadow-lg border border-gray-200 p-4 z-50 font-secondary">
                        {[{ city: "Bandung", region: "West Java, Indonesia" }].map((loc) => (
                            <div
                                key={loc.city}
                                onClick={() => {
                                    setRegion(loc.city)
                                    setShowRegion(false)
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
                                    <p className="text-[16px] font-medium text-gray-800">{loc.city}</p>
                                    <p className="text-[14px] text-gray-500">{loc.region}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
