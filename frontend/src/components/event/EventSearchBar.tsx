"use client"

import { useState, useEffect, useRef } from "react"
import { FiSearch, FiChevronLeft, FiX } from "react-icons/fi"
import { addDays, format } from "date-fns"
import Calendar from "react-date-range/dist/components/Calendar"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import Link from "next/link"

type CategoryKey = "celebration" | "gathering" | "business" | null

export default function EventSearchBar() {
    const [openMobile, setOpenMobile] = useState(false)
    const [mobileStep, setMobileStep] = useState(1)

    const [showRegion, setShowRegion] = useState(false)
    const [showDate, setShowDate] = useState(false)
    const [showEvent, setShowEvent] = useState(false)

    // region kosong dulu → "Select region"
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
        setMobileStep(1)
    }

    return (
        <div ref={dropdownRefObj} className="relative z-40">
            {/* ================= MOBILE SEARCH BAR ================= */}
            <div className="lg:hidden px-4">
                <button
                    onClick={() => setOpenMobile(true)}
                    className="w-full flex items-center justify-between px-5 py-4 rounded-full border bg-white shadow"
                >
                    <span className="text-gray-500">Find events</span>
                    <FiSearch />
                </button>
            </div>

            {/* ================= MOBILE MODAL WITH STEP FLOW ================= */}
            {openMobile && (
                <div className="fixed inset-0 bg-black/40 z-50 lg:hidden">
                    <div className="absolute inset-0 w-full bg-white flex flex-col transition-all duration-300">
                        {/* Header */}
                        <div className="border-b border-gray-200 px-4 py-4">
                            <div className="flex items-center justify-between">
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
                        </div>

                        {/* Step 1: Where */}
                        {mobileStep === 1 && (
                            <div className="flex-1 overflow-y-auto px-4 py-6 animate-fade-in">
                                <div className="space-y-4">
                                    <div className="border-2 border-gray-900 rounded-2xl p-6 space-y-4">
                                        <h2 className="text-2xl font-medium text-gray-900">Where?</h2>
                                        <div className="w-full h-px bg-gray-300" />

                                        <button
                                            onClick={() => setRegion("Bandung")}
                                            className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${region === "Bandung" ? "bg-gray-100" : "hover:bg-gray-50"
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

                                    <div className="space-y-3 mt-6">
                                        <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                                            <span className="text-gray-400">when</span>
                                            <span className="font-medium text-gray-800">
                                                {selectedDate ? format(selectedDate, "MMM dd") : "add dates"}
                                            </span>
                                        </div>
                                        <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                                            <span className="text-gray-400">event type</span>
                                            <span className="font-medium text-gray-800">{eventType || "add event"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: When (Calendar) */}
                        {mobileStep === 2 && (
                            <div className="flex-1 overflow-y-auto px-4 py-6 animate-fade-in">
                                <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between mb-6 bg-gray-50">
                                    <span className="text-gray-400">where</span>
                                    <span className="font-medium text-gray-900">{region}</span>
                                </div>

                                <div className="border-2 border-gray-900 rounded-2xl p-6">
                                    <h2 className="text-2xl font-medium text-gray-900 mb-4">When?</h2>
                                    <div className="w-full h-px bg-gray-300 mb-4" />

                                    <div className="flex justify-center">
                                        <Calendar
                                            date={selectedDate || new Date()}
                                            onChange={(date: Date) => {
                                                setSelectedDate(date)
                                            }}
                                            color="#1f2937"
                                            monthDisplayFormat="MMMM yyyy"
                                        />
                                    </div>

                                    <button className="w-full mt-6 border border-gray-300 rounded-xl py-3 text-gray-700 hover:bg-gray-50 transition">
                                        load more dates
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Event Type */}
                        {mobileStep === 3 && (
                            <div className="flex-1 overflow-y-auto px-4 py-6 animate-fade-in">
                                <div className="space-y-3 mb-6">
                                    <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50">
                                        <span className="text-gray-400">where</span>
                                        <span className="font-medium text-gray-900">{region}</span>
                                    </div>
                                    <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50">
                                        <span className="text-gray-400">when</span>
                                        <span className="font-medium text-gray-900">
                                            {selectedDate ? format(selectedDate, "MMM dd") : "add dates"}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-2 border-gray-900 rounded-2xl p-6">
                                    <h2 className="text-2xl font-medium text-gray-900 mb-4">Type of event?</h2>
                                    <div className="w-full h-px bg-gray-300 mb-4" />

                                    <div className="space-y-2">
                                        {eventCategories.map((cat) => (
                                            <div key={cat.key}>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleCategory(cat.key)}
                                                    className="w-full px-4 py-3 flex items-center justify-between rounded-xl hover:bg-gray-100 transition"
                                                >
                                                    <span className="text-[16px] font-semibold text-gray-900">{cat.label}</span>
                                                    <span className="text-[18px] leading-none text-gray-800">
                                                        {openCategory === cat.key ? "−" : "+"}
                                                    </span>
                                                </button>

                                                {openCategory === cat.key && (
                                                    <div className="mt-2 mb-2 ml-4 space-y-2">
                                                        {cat.items.map((item) => (
                                                            <div
                                                                key={item}
                                                                className="px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-100 transition"
                                                                onClick={() => handleSelectEvent(item)}
                                                            >
                                                                <span className="text-[14px] text-gray-800">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
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
                                    <Link href="/events/searchResult" className="w-full block">
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
                        <p className="text-[15px] text-gray-400">{region || "Select region"}</p>
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

                        <div className="flex-1 bg-white p-5">
                            <Calendar
                                date={selectedDate || new Date()}
                                onChange={(date: Date) => {
                                    setSelectedDate(date)
                                    setShowDate(false)
                                }}
                                color="#7A3E2C"
                                monthDisplayFormat="MMMM yyyy"
                            />
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
