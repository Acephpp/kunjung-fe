"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiMinus, FiPlus } from "react-icons/fi";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Link from "next/link";

export default function SearchBar() {
    const [showWhere, setShowWhere] = useState(false);
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [showCheckOut, setShowCheckOut] = useState(false);
    const [showGuests, setShowGuests] = useState(false);

    const [destination, setDestination] = useState("");

    // guests detail
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    const totalGuests = adults + children + infants;

    // date state
    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

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

    // text Who
    const getGuestText = () => {
        const guestCount = adults + children;
        const infantCount = infants;

        if (guestCount === 0 && infantCount === 0) return "Add guests";
        if (infantCount === 0)
            return `${guestCount} guest${guestCount > 1 ? "s" : ""}`;
        if (guestCount === 0)
            return `${infantCount} infant${infantCount > 1 ? "s" : ""}`;

        return `${guestCount} guest${guestCount > 1 ? "s" : ""}, ${infantCount} infant${infantCount > 1 ? "s" : ""
            }`;
    };

    // label tanggal
    const formatLabelDate = (date: Date | null) => {
        if (!date) return "Select dates";
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    // perubahan tanggal
    const handleDateChange = (item: any) => {
        const sel = item.selection as Range;
        setDateRange([sel]);

        const start = sel.startDate ?? null;
        const end = sel.endDate ?? null;

        if (showCheckIn) {
            setCheckInDate(start);
            setCheckOutDate(null);
            setShowCheckIn(false);
            setShowCheckOut(true);
            return;
        }

        if (showCheckOut) {
            setCheckOutDate(end);
            setShowCheckOut(false);
            return;
        }
    };

    // row guest
    const GuestRow = ({
        title,
        subtitle,
        value,
        onChange,
    }: {
        title: string;
        subtitle: string;
        value: number;
        onChange: (val: number) => void;
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
    );

    return (
        <div className="max-w-5xl mx-auto px-4 mt-4 relative" ref={dropdownRef}>
            <div className="flex items-center bg-[#FCFBF7] rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-[70px] font-secondary">
                {/* Where */}
                <div
                    className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showWhere ? "bg-gray-200" : "hover:bg-gray-200/60"
                        }`}
                    onClick={() => {
                        setShowWhere(!showWhere);
                        setShowCheckIn(false);
                        setShowCheckOut(false);
                        setShowGuests(false);
                    }}
                >
                    <p className="text-[16px] font-medium text-gray-800">Where</p>
                    <p className="text-[16px] text-gray-400">
                        {destination ? destination : "Select region"}
                    </p>
                </div>

                <div className="w-px h-8 bg-gray-300" />

                {/* Check in */}
                <div
                    className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showCheckIn ? "bg-gray-200" : "hover:bg-gray-200/60"
                        }`}
                    onClick={() => {
                        setShowCheckIn(!showCheckIn);
                        setShowWhere(false);
                        setShowCheckOut(false);
                        setShowGuests(false);
                    }}
                >
                    <p className="text-[16px] font-medium text-gray-800">Check in</p>
                    <p className="text-[16px] text-gray-400">
                        {formatLabelDate(checkInDate)}
                    </p>
                </div>

                <div className="w-px h-8 bg-gray-300" />

                {/* Check out */}
                <div
                    className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showCheckOut ? "bg-gray-200" : "hover:bg-gray-200/60"
                        }`}
                    onClick={() => {
                        setShowCheckOut(!showCheckOut);
                        setShowWhere(false);
                        setShowCheckIn(false);
                        setShowGuests(false);
                    }}
                >
                    <p className="text-[16px] font-medium text-gray-800">Check out</p>
                    <p className="text-[16px] text-gray-400">
                        {formatLabelDate(checkOutDate)}
                    </p>
                </div>

                <div className="w-px h-8 bg-gray-300" />

                {/* Who */}
                <div
                    className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${showGuests ? "bg-gray-200" : "hover:bg-gray-200/60"
                        }`}
                    onClick={() => {
                        setShowGuests(!showGuests);
                        setShowWhere(false);
                        setShowCheckIn(false);
                        setShowCheckOut(false);
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
                            setDestination("Bandung");
                            setShowWhere(false);      // 🔹 tutup popup setelah pilih value
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
                            <p className="text-[14px] text-gray-500">
                                West Java, Indonesia
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Dropdown Date (check in & check out) */}
            {(showCheckIn || showCheckOut) && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-[#FCFBF7] rounded-2xl shadow-lg border border-gray-200 p-4 z-50 font-secondary">
                    <DateRange
                        ranges={dateRange}
                        onChange={handleDateChange}
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
                <div className="absolute right-3 mt-2 w-[380px] bg-[#FCFBF7] rounded-2xl shadow-lg border border-gray-200 px-7 py-5 z-50 font-secondary">
                    <GuestRow
                        title="Adults"
                        subtitle="Age 13 or above"
                        value={adults}
                        onChange={setAdults}
                    />
                    <GuestRow
                        title="Children"
                        subtitle="Age 2–12"
                        value={children}
                        onChange={setChildren}
                    />
                    <GuestRow
                        title="Infants"
                        subtitle="Under 2"
                        value={infants}
                        onChange={setInfants}
                    />
                </div>
            )}
        </div>
    );
}
