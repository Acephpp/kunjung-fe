"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { addDays, format } from "date-fns";
import Calendar from "react-date-range/dist/components/Calendar";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Link from "next/link";

export default function ShootSearchBar() {
    const [showRegion, setShowRegion] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [showShoot, setShowShoot] = useState(false);

    const [region, setRegion] = useState("Bandung");
    const [shootType, setShootType] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowRegion(false);
                setShowDate(false);
                setShowShoot(false);
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

    return (
        <div className="max-w-5xl mx-auto px-4 mt-4 relative" ref={dropdownRef}>
            {/* === Search Bar === */}
            <div className="flex items-center bg-[#FCFBF7] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden h-[70px] font-secondary">
                {/* WHERE */}
                <div
                    className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${
                        showRegion ? "bg-gray-100" : "hover:bg-gray-100/60"
                    }`}
                    onClick={() => {
                        setShowRegion(!showRegion);
                        setShowDate(false);
                        setShowShoot(false);
                    }}
                >
                    <p className="text-[16px] font-medium text-gray-800">Where</p>
                    <p className="text-[15px] text-gray-400">{region || "Select region"}</p>
                </div>

                <div className="w-px h-8 bg-gray-300" />

                {/* WHEN */}
                <div
                    className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${
                        showDate ? "bg-gray-100" : "hover:bg-gray-100/60"
                    }`}
                    onClick={() => {
                        setShowDate(!showDate);
                        setShowRegion(false);
                        setShowShoot(false);
                    }}
                >
                    <p className="text-[16px] font-medium text-gray-800">When</p>
                    <p className="text-[15px] text-gray-400">
                        {selectedDate ? format(selectedDate, "MMMM dd, yyyy") : "Select dates"}
                    </p>
                </div>

                <div className="w-px h-8 bg-gray-300" />

                {/* TYPE OF SHOOT */}
                <div
                    className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${
                        showShoot ? "bg-gray-100" : "hover:bg-gray-100/60"
                    }`}
                    onClick={() => {
                        setShowShoot(!showShoot);
                        setShowRegion(false);
                        setShowDate(false);
                    }}
                >
                    <p className="text-[16px] font-medium text-gray-800">Type of shoot</p>
                    <p className="text-[15px] text-gray-400">{shootType || "Add shoot"}</p>
                </div>

                {/* SEARCH BUTTON */}
                <Link href="/shoots/searchResult">
                    <button className="bg-gray-100 text-gray-700 w-[55px] h-[55px] rounded-xl m-3 flex items-center justify-center hover:bg-gray-200 transition">
                        <FiSearch size={20} />
                    </button>
                </Link>
            </div>

            {/* === DROPDOWN TYPE OF SHOOT === */}
            {showShoot && (
                <div className="absolute right-3 mt-2 w-[380px] bg-[#FCFBF7] rounded-2xl shadow-[0_6px_25px_rgba(0,0,0,0.08)] border border-gray-200 p-5 z-50 font-secondary transition-all duration-200 ease-in-out">
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setShootType("One day shoot");
                                setShowShoot(false);
                            }}
                            className={`flex-1 px-4 py-[8px] border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition ${
                                shootType === "One day shoot" ? "bg-gray-200 font-medium" : ""
                            }`}
                        >
                            One day shoot
                        </button>

                        <button
                            onClick={() => {
                                setShootType("Shoot & Stay");
                                setShowShoot(false);
                            }}
                            className={`flex-1 px-4 py-[8px] border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition ${
                                shootType === "Shoot & Stay" ? "bg-gray-200 font-medium" : ""
                            }`}
                        >
                            Shoot & Stay
                        </button>
                    </div>
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
