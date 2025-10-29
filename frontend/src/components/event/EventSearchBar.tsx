"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { addDays, format } from "date-fns";
import Calendar from "react-date-range/dist/components/Calendar";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function EventSearchBar() {
    const [showRegion, setShowRegion] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [showEvent, setShowEvent] = useState(false);

    const [region, setRegion] = useState("Bandung");
    const [eventType, setEventType] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [customEvent, setCustomEvent] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowRegion(false);
                setShowDate(false);
                setShowEvent(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 📅 Quick date options
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const weekendStart = addDays(today, 1);
    const weekendEnd = addDays(today, 2);

    // 🧠 Event type options
    const eventOptions = ["Celebration", "Wedding", "Gathering", "Meeting", "Other"];

    return (
        <div className="max-w-5xl mx-auto px-4 mt-4 relative" ref={dropdownRef}>
            {/* === Search Bar === */}
            <div className="flex items-center bg-[#FCFBF7] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden h-[70px] font-secondary">
                {/* WHERE */}
                <div
                    className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showRegion ? "bg-gray-100" : "hover:bg-gray-100/60"
                        }`}
                    onClick={() => {
                        setShowRegion(!showRegion);
                        setShowDate(false);
                        setShowEvent(false);
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
                        setShowDate(!showDate);
                        setShowRegion(false);
                        setShowEvent(false);
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
                        setShowEvent(!showEvent);
                        setShowRegion(false);
                        setShowDate(false);
                    }}
                >
                    <p className="text-[16px] font-medium text-gray-800">Type of event</p>
                    <p className="text-[15px] text-gray-400">{eventType || "Add event"}</p>
                </div>

                {/* SEARCH BUTTON */}
                <button className="bg-gray-100 text-gray-700 w-[55px] h-[55px] rounded-xl m-3 flex items-center justify-center hover:bg-gray-200 transition">
                    <FiSearch size={20} />
                </button>
            </div>

            {/* === DROPDOWN TYPE OF EVENT === */}
            {showEvent && (
                <div className="absolute right-3 mt-2 w-[440px] bg-[#FCFBF7] rounded-2xl shadow-[0_6px_25px_rgba(0,0,0,0.08)] border border-gray-200 p-5 z-50 font-secondary transition-all duration-200 ease-in-out">

                    {/* + Stay Button */}
                    <div className="mb-4">
                        <button
                            onClick={() => {
                                setEventType("+ Stay");
                                setSelectedCategory("");
                                setShowEvent(false);
                            }}
                            className="px-4 py-[7px] border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
                        >
                            + Stay
                        </button>
                    </div>

                    <hr className="border-gray-200 mb-4" />

                    {/* Category Buttons */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {eventOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => setSelectedCategory(option)}
                                className={`px-4 py-[7px] rounded-full text-sm font-medium transition-all ${selectedCategory === option
                                        ? "bg-gray-300 text-gray-800"
                                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {/* Custom Input */}
                    {selectedCategory && (
                        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:border-gray-400 transition">
                            <input
                                type="text"
                                placeholder="Enter event name"
                                value={customEvent}
                                onChange={(e) => setCustomEvent(e.target.value)}
                                className="flex-1 px-4 py-[10px] text-[15px] outline-none bg-transparent placeholder-gray-400"
                            />
                            <button
                                onClick={() => {
                                    if (customEvent.trim()) {
                                        setEventType(customEvent.trim());
                                        setSelectedCategory("");
                                        setCustomEvent("");
                                        setShowEvent(false);
                                    }
                                }}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
                            >
                                <FiArrowRight size={18} className="text-gray-600" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* === DROPDOWN DATE === */}
            {showDate && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-[#FCFBF7] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-gray-200 p-0 z-50 font-secondary flex overflow-hidden">
                    {/* LEFT QUICK OPTIONS */}
                    <div className="w-[40%] bg-[#F9F8F4] flex flex-col justify-start gap-3 p-5 border-r border-gray-200">
                        <div
                            className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setSelectedDate(today);
                                setShowDate(false);
                            }}
                        >
                            <p className="font-semibold text-gray-800">Today</p>
                            <p className="text-sm text-gray-500">{format(today, "MMMM dd")}</p>
                        </div>

                        <div
                            className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setSelectedDate(tomorrow);
                                setShowDate(false);
                            }}
                        >
                            <p className="font-semibold text-gray-800">Tomorrow</p>
                            <p className="text-sm text-gray-500">{format(tomorrow, "MMMM dd")}</p>
                        </div>

                        <div
                            className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setSelectedDate(weekendStart);
                                setShowDate(false);
                            }}
                        >
                            <p className="font-semibold text-gray-800">This weekend</p>
                            <p className="text-sm text-gray-500">
                                {`${format(weekendStart, "MMMM dd")} - ${format(weekendEnd, "dd")}`}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT CALENDAR */}
                    <div className="flex-1 bg-white p-5">
                        <Calendar
                            date={selectedDate || new Date()}
                            onChange={(date: Date) => {
                                setSelectedDate(date);
                                setShowDate(false);
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
                    {[
                        { city: "Bandung", region: "West Java, Indonesia" },
                        { city: "Jakarta", region: "Capital Region, Indonesia" },
                        { city: "Bali", region: "Bali, Indonesia" },
                        { city: "Surabaya", region: "East Java, Indonesia" },
                    ].map((loc) => (
                        <div
                            key={loc.city}
                            onClick={() => {
                                setRegion(loc.city);
                                setShowRegion(false);
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
    );
}
