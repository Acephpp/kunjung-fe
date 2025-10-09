"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiMinus, FiPlus, FiFilter, FiArrowDown } from "react-icons/fi";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function FilterBar() {
    const [showWhere, setShowWhere] = useState(false);
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [showCheckOut, setShowCheckOut] = useState(false);
    const [showGuests, setShowGuests] = useState(false);

    const [destination, setDestination] = useState("");
    const [guests, setGuests] = useState(0);

    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowWhere(false);
                setShowCheckIn(false);
                setShowCheckOut(false);
                setShowGuests(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="mx-auto mt-4 relative font-secondary" ref={dropdownRef}>
            <div className="flex items-center justify-between gap-3">
                {/* Button Filter */}
                <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-xl bg-[#F8F6F2] text-gray-800 font-medium hover:bg-gray-100 transition">
                    <FiFilter size={18} />
                    Filter
                </button>

                {/* Main Search Bar */}
                <div className="flex flex-1 items-center justify-between bg-[#FCFBF7] border border-gray-300 rounded-2xl shadow-sm overflow-hidden h-[70px]">
                    {/* Where */}
                    <div
                        className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${
                            showWhere ? "bg-gray-200" : "hover:bg-gray-100/70"
                        }`}
                        onClick={() => {
                            setShowWhere(!showWhere);
                            setShowCheckIn(false);
                            setShowCheckOut(false);
                            setShowGuests(false);
                        }}
                    >
                        <p className="text-[15px] font-semibold text-gray-800">Where</p>
                        <p className="text-[15px] text-gray-400">
                            {destination ? destination : "Select region"}
                        </p>
                    </div>

                    <div className="w-px h-8 bg-gray-300" />

                    {/* Check In */}
                    <div
                        className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${
                            showCheckIn ? "bg-gray-200" : "hover:bg-gray-100/70"
                        }`}
                        onClick={() => {
                            setShowCheckIn(!showCheckIn);
                            setShowWhere(false);
                            setShowCheckOut(false);
                            setShowGuests(false);
                        }}
                    >
                        <p className="text-[15px] font-semibold text-gray-800">Check in</p>
                        <p className="text-[15px] text-gray-400">
                            {dateRange[0].startDate
                                ? dateRange[0].startDate?.toDateString()
                                : "Select dates"}
                        </p>
                    </div>

                    <div className="w-px h-8 bg-gray-300" />

                    {/* Check Out */}
                    <div
                        className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${
                            showCheckOut ? "bg-gray-200" : "hover:bg-gray-100/70"
                        }`}
                        onClick={() => {
                            setShowCheckOut(!showCheckOut);
                            setShowWhere(false);
                            setShowCheckIn(false);
                            setShowGuests(false);
                        }}
                    >
                        <p className="text-[15px] font-semibold text-gray-800">Check out</p>
                        <p className="text-[15px] text-gray-400">
                            {dateRange[0].endDate
                                ? dateRange[0].endDate?.toDateString()
                                : "Select dates"}
                        </p>
                    </div>

                    <div className="w-px h-8 bg-gray-300" />

                    {/* Who */}
                    <div
                        className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${
                            showGuests ? "bg-gray-200" : "hover:bg-gray-100/70"
                        }`}
                        onClick={() => {
                            setShowGuests(!showGuests);
                            setShowWhere(false);
                            setShowCheckIn(false);
                            setShowCheckOut(false);
                        }}
                    >
                        <p className="text-[15px] font-semibold text-gray-800">Who</p>
                        <p className="text-[15px] text-gray-400">
                            {guests > 0 ? `${guests} guests` : "Add guest"}
                        </p>
                    </div>

                    {/* Search Button */}
                    <button className="bg-transparent text-gray-800 w-[60px] h-[60px] flex items-center justify-center hover:bg-gray-100 rounded-2xl transition">
                        <FiSearch size={20} />
                    </button>
                </div>

                {/* Button Sort */}
                <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-xl bg-[#F8F6F2] text-gray-800 font-medium hover:bg-gray-100 transition">
                    <FiArrowDown size={18} />
                    Sort
                </button>
            </div>

            {/* Dropdown Where */}
            {showWhere && (
                <div className="absolute left-[120px] mt-3 w-[400px] bg-[#FCFBF7] rounded-2xl shadow-lg border border-gray-200 p-4 z-50">
                    <div
                        onClick={() => setDestination("Bandung")}
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

            {/* Dropdown Date */}
            {(showCheckIn || showCheckOut) && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 bg-[#FCFBF7] rounded-2xl shadow-lg border border-gray-200 p-4 z-50">
                    <DateRange
                        ranges={dateRange}
                        onChange={(item) => {
                            setDateRange([item.selection]);

                            if (showCheckIn) {
                                setShowCheckIn(false);
                                setShowCheckOut(true);
                            } else if (showCheckOut) {
                                setShowCheckOut(false);
                            }
                        }}
                        rangeColors={["#7A3E2C"]}
                        months={2}
                        direction="horizontal"
                        moveRangeOnFirstSelection={false}
                        editableDateInputs={true}
                    />
                </div>
            )}

            {/* Dropdown Guests */}
            {showGuests && (
                <div className="absolute right-[130px] mt-3 w-[350px] bg-[#FCFBF7] rounded-2xl shadow-lg border border-gray-200 p-7 z-50">
                    <div className="flex items-center justify-between">
                        <p className="text-[16px] font-semibold text-gray-800">Add guests</p>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setGuests(Math.max(0, guests - 1))}
                                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                                disabled={guests === 0}
                            >
                                <FiMinus size={14} />
                            </button>
                            <span className="w-6 text-center text-gray-800">{guests}</span>
                            <button
                                onClick={() => setGuests(guests + 1)}
                                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                            >
                                <FiPlus size={14} />
                            </button>
                        </div>
                    </div>
                    <div className="border-b border-gray-300 mt-3"></div>
                </div>
            )}
        </div>
    );
}
