"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { FiSearch, FiChevronLeft, FiX } from "react-icons/fi"
import { addDays, format } from "date-fns"
import Calendar from "react-date-range/dist/components/Calendar"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

type CategoryKey = "celebration" | "gathering" | "business" | null

export default function EventSearchBar() {
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
    const [showEvent, setShowEvent] = useState(false)

    // region kosong dulu → "select region"
    const [region, setRegion] = useState("")
    const [eventType, setEventType] = useState("")
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const dropdownRefObj = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRefObj.current && !dropdownRefObj.current.contains(e.target as Node)) {
                setShowRegion(false)
                setShowDate(false)
                setShowEvent(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // 📅 Quick date options
    const today = new Date()
    const tomorrow = addDays(today, 1)
    const weekendStart = addDays(today, 1)
    const weekendEnd = addDays(today, 2)

    // 📂 Data kategori & item
    const eventCategories: {
        key: CategoryKey
        label: string
        items: string[]
    }[] = [
            {
                key: "celebration",
                label: "Celebration",
                items: ["Wedding", "Birthday Party", "Engagement Party", "Anniversary", "Bridal Shower", "Baby Shower"],
            },
            {
                key: "gathering",
                label: "Gathering",
                items: ["Reunion", "Arisan", "Syukuran"],
            },
            {
                key: "business",
                label: "Business",
                items: ["Meeting"],
            },
        ]

    // kategori yang sedang terbuka
    const [openCategory, setOpenCategory] = useState<CategoryKey>(null)

    const toggleCategory = (key: CategoryKey) => {
        setOpenCategory((prev) => (prev === key ? null : key))
    }

    const handleSelectEvent = (name: string) => {
        setEventType(name)
        setShowEvent(false)
    }

    const handleMobileClose = () => {
        setOpenMobile(false)
        setMobileStep(0)
    }

    const handleClearAll = () => {
        setRegion("")
        setSelectedDate(null)
        setEventType("")
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
        <div ref={dropdownRefObj} className="relative z-40">
            {/* ================= MOBILE SEARCH BAR ================= */}
            <div className="lg:hidden px-4">
                <button
                    onClick={() => setOpenMobile(true)}
                    className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-[#E7E6E2] bg-[#FCFBF7] shadow"
                >
                    <span className="text-gray-500">Find events</span>
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
                                <button className="text-[15px] font-medium text-gray-900 border-b-2 border-gray-900 pb-1">events</button>
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
                                    <span className="font-semibold text-gray-900 text-md">{region || "select region"}</span>
                                </div>
                                <div
                                    onClick={() => setMobileStep(2)}
                                    className="bg-[#FCFBF7] border border-gray-200 rounded-2xl px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <span className="text-gray-400 text-md">when</span>
                                    <span className="font-semibold text-gray-900 text-md">
                                        {selectedDate ? format(selectedDate, "MMM dd") : "add dates"}
                                    </span>
                                </div>
                                <div
                                    onClick={() => setMobileStep(3)}
                                    className="bg-[#FCFBF7] border border-gray-200 rounded-2xl px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <span className="text-gray-400 text-md">type of event</span>
                                    <span className="font-semibold text-gray-900 text-md">{eventType || "add event"}</span>
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

                                    <div className="space-y-1">
                                        {/* Bandung */}
                                        <button
                                            onClick={() => setRegion("Bandung")}
                                            className="w-full text-left"
                                        >
                                            <div
                                                className={`py-4 px-2 rounded-2xl flex items-center gap-4 transition-all ${region === "Bandung"
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
                                            onClick={() => setRegion("Jakarta")}
                                            className="w-full text-left"
                                        >
                                            <div
                                                className={`py-4 px-2 rounded-2xl flex items-center gap-4 transition-all ${region === "Jakarta"
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
                                            onClick={() => setRegion("Bali")}
                                            className="w-full text-left"
                                        >
                                            <div
                                                className={`py-4 px-2 rounded-2xl flex items-center gap-4 transition-all ${region === "Bali"
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
                                            {selectedDate ? format(selectedDate, "MMM dd") : "add dates"}
                                        </span>
                                    </div>
                                    <div
                                        onClick={() => setMobileStep(3)}
                                        className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition"
                                    >
                                        <span className="text-gray-400 text-md">type of event</span>
                                        <span className="font-semibold text-gray-900 text-md">{eventType || "add event"}</span>
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

                                    <div className="flex justify-center -mx-4">
                                        <Calendar
                                            date={selectedDate || new Date()}
                                            onChange={(date: Date) => {
                                                setSelectedDate(date)
                                            }}
                                            color="#7A3E2C"
                                            monthDisplayFormat="MMMM yyyy"
                                        />
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

                                {/* Type of Event Summary */}
                                <div
                                    onClick={() => setMobileStep(3)}
                                    className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <span className="text-gray-400 text-md">type of event</span>
                                    <span className="font-semibold text-gray-900 text-md">{eventType || "add event"}</span>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Type of Event */}
                        {mobileStep === 3 && (
                            <div className="animate-fade-in flex flex-col h-full">
                                {/* Where Summary */}
                                <div
                                    onClick={() => setMobileStep(1)}
                                    className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm mb-3 cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <span className="text-gray-400 text-md">where</span>
                                    <span className="font-semibold text-gray-900 text-md">{region || "select region"}</span>
                                </div>

                                {/* When Summary */}
                                <div
                                    onClick={() => setMobileStep(2)}
                                    className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] px-6 py-6 flex items-center justify-between shadow-sm mb-3 cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <span className="text-gray-400 text-md">when</span>
                                    <span className="font-semibold text-gray-900 text-md">
                                        {selectedDate ? format(selectedDate, "MMM dd") : "add dates"}
                                    </span>
                                </div>

                                {/* Active Event Type Card */}
                                <div className="bg-[#FCFBF7] border border-gray-200 rounded-[24px] shadow-sm h-full flex flex-col overflow-hidden relative">
                                    {/* Sticky Header */}
                                    <div
                                        onClick={() => setMobileStep(0)}
                                        className="p-6 pb-2 cursor-pointer bg-[#FCFBF7] z-10 flex-shrink-0"
                                    >
                                        <h2 className="text-[24px] font-primary text-gray-900 mb-4">
                                            Type of event?
                                        </h2>
                                        <div className="w-full h-px bg-gray-200" />
                                    </div>

                                    {/* Scrollable Content */}
                                    <div className="p-6 pt-4 space-y-6 font-secondary text-gray-800 overflow-y-auto flex-1">
                                        {eventCategories.map((cat, idx) => (
                                            <div key={cat.key}>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleCategory(cat.key)}
                                                    className="w-full flex items-center justify-between group"
                                                >
                                                    <span className="text-[18px] font-semibold text-gray-800 group-hover:text-gray-600 transition">{cat.label}</span>
                                                    <span className="text-[24px] leading-none text-gray-400 font-light">
                                                        {openCategory === cat.key ? "−" : "+"}
                                                    </span>
                                                </button>

                                                {/* Expanded Items */}
                                                <div
                                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openCategory === cat.key ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                                                        }`}
                                                >
                                                    <div className="space-y-5 pl-5">
                                                        {cat.items.map((item) => (
                                                            <div
                                                                key={item}
                                                                onClick={() => {
                                                                    setEventType(item)
                                                                    setMobileStep(0)
                                                                }}
                                                                className="flex items-center justify-between cursor-pointer group"
                                                            >
                                                                <span className="text-[15px] text-gray-600 group-hover:text-gray-900 transition">{item}</span>
                                                                <span className={`text-[12px] font-medium transition ${eventType === item ? "text-gray-400" : "text-gray-300 group-hover:text-gray-400"}`}>
                                                                    {eventType === item ? "selected" : "select"}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Separator */}
                                                <div className="w-full h-px bg-gray-100 mt-4" />
                                            </div>
                                        ))}
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
                            <Link href="/events/searchResult" className="w-full">
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
            <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-4 relative" ref={dropdownRefObj}>
                <div className="flex items-center bg-[#FCFBF7] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden h-[70px] font-secondary">
                    {/* WHERE */}
                    <div
                        className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showRegion ? "bg-gray-100" : "hover:bg-gray-100/60"
                            }`}
                        onClick={() => {
                            setShowRegion(!showRegion)
                            setShowDate(false)
                            setShowEvent(false)
                        }}
                    >
                        <p className="text-[16px] font-medium text-gray-800">Where</p>
                        <p className="text-[15px] text-gray-400">{region || "select region"}</p>
                    </div>

                    <div className="w-px h-8 bg-gray-300" />

                    {/* WHEN */}
                    <div
                        className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showDate ? "bg-gray-100" : "hover:bg-gray-100/60"
                            }`}
                        onClick={() => {
                            setShowDate(!showDate)
                            setShowRegion(false)
                            setShowEvent(false)
                        }}
                    >
                        <p className="text-[16px] font-medium text-gray-800">When</p>
                        <p className="text-[15px] text-gray-400">
                            {selectedDate ? format(selectedDate, "MMMM dd, yyyy") : "Select dates"}
                        </p>
                    </div>

                    <div className="w-px h-8 bg-gray-300" />

                    {/* TYPE OF EVENT */}
                    <div
                        className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showEvent ? "bg-gray-100" : "hover:bg-gray-100/60"
                            }`}
                        onClick={() => {
                            setShowEvent(!showEvent)
                            setShowRegion(false)
                            setShowDate(false)
                        }}
                    >
                        <p className="text-[16px] font-medium text-gray-800">Type of event</p>
                        <p className="text-[15px] text-gray-400">{eventType || "Add event"}</p>
                    </div>

                    {/* SEARCH BUTTON */}
                    <Link href="/events/searchResult">
                        <button className="bg-gray-100 text-gray-700 w-[55px] h-[55px] rounded-xl m-3 flex items-center justify-center hover:bg-gray-200 transition">
                            <FiSearch size={20} />
                        </button>
                    </Link>
                </div>

                {/* === DROPDOWN TYPE OF EVENT (accordion per kategori) === */}
                {showEvent && (
                    <div className="absolute right-3 mt-2 w-[360px] bg-[#FCFBF7] rounded-2xl shadow-[0_6px_25px_rgba(0,0,0,0.08)] border border-gray-200 py-4 z-50 font-secondary">
                        {eventCategories.map((cat, idxCat) => (
                            <div key={cat.key}>
                                <button
                                    type="button"
                                    onClick={() => toggleCategory(cat.key)}
                                    className="w-full px-5 py-2 flex items-center justify-between"
                                >
                                    <span className="text-[16px] font-semibold text-gray-900">{cat.label}</span>
                                    <span className="text-[18px] leading-none text-gray-800">{openCategory === cat.key ? "−" : "+"}</span>
                                </button>

                                {openCategory === cat.key && (
                                    <div className="mt-3 mb-3">
                                        {cat.items.map((item, idx) => (
                                            <div key={item} className="px-5">
                                                <div
                                                    className="flex items-center justify-between pl-3 pr-3 py-2 cursor-pointer"
                                                    onClick={() => handleSelectEvent(item)}
                                                >
                                                    <span className="text-[14px] text-gray-800">{item}</span>

                                                    <button
                                                        type="button"
                                                        className={`text-[12px] ${eventType === item ? "text-gray-500" : "text-gray-600 underline"
                                                            }`}
                                                    >
                                                        {eventType === item ? "selected" : "select"}
                                                    </button>
                                                </div>

                                                {idx < cat.items.length - 1 && <div className="border-b border-gray-200 mx-3" />}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {idxCat < eventCategories.length - 1 && <div className="border-b border-gray-200 mx-5 my-1" />}
                            </div>
                        ))}
                    </div>
                )}

                {/* === DROPDOWN DATE === */}
                {showDate && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-[#FCFBF7] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-gray-200 p-0 z-50 font-secondary flex overflow-hidden">
                        <div className="w-[40%] bg-[#F9F8F4] flex flex-col justify-start gap-3 p-5 border-r border-gray-200">
                            <div
                                className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setSelectedDate(today)
                                    setShowDate(false)
                                }}
                            >
                                <p className="font-semibold text-gray-800">Today</p>
                                <p className="text-sm text-gray-500">{format(today, "MMMM dd")}</p>
                            </div>

                            <div
                                className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setSelectedDate(tomorrow)
                                    setShowDate(false)
                                }}
                            >
                                <p className="font-semibold text-gray-800">Tomorrow</p>
                                <p className="text-sm text-gray-500">{format(tomorrow, "MMMM dd")}</p>
                            </div>

                            <div
                                className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setSelectedDate(weekendStart)
                                    setShowDate(false)
                                }}
                            >
                                <p className="font-semibold text-gray-800">This weekend</p>
                                <p className="text-sm text-gray-500">
                                    {`${format(weekendStart, "MMMM dd")} - ${format(weekendEnd, "dd")}`}
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 p-5">
                            <Calendar
                                date={selectedDate || new Date()}
                                onChange={(date: Date) => {
                                    setSelectedDate(date)
                                    setShowDate(false)
                                }}
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
