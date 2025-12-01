"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { addDays, format } from "date-fns";
import Calendar from "react-date-range/dist/components/Calendar";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Link from "next/link";

type ShootOption =
    | "instacation"
    | "session-morning"
    | "session-afternoon"
    | "session-fullday"
    | "";

type ShootSection = "instacation" | "session" | "";
type ActiveDateField = "single" | "checkin" | "checkout" | null;

export default function ShootSearchBar() {
    const [showRegion, setShowRegion] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [showShoot, setShowShoot] = useState(false);

    const [region, setRegion] = useState("");
    const [shootType, setShootType] = useState<ShootOption>("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // untuk Instacation (range)
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [activeDateField, setActiveDateField] =
        useState<ActiveDateField>("single");

    // state DateRange khusus Instacation (rule & tampilan seperti SearchBar)
    const [range, setRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ]);

    // section yang sedang dibuka di popup type of shoot
    const [openShootSection, setOpenShootSection] = useState<ShootSection>("");

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

    // 📅 Quick date options (dipakai hanya untuk popup WHEN)
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const weekendStart = addDays(today, 1);
    const weekendEnd = addDays(today, 2);

    const getShootLabel = () => {
        switch (shootType) {
            case "instacation":
                return "Instacation";
            case "session-morning":
                return "Morning session";
            case "session-afternoon":
                return "Afternoon session";
            case "session-fullday":
                return "Full day session";
            default:
                return "Add shoot";
        }
    };

    const handleSelectShoot = (type: ShootOption) => {
        setShootType(type);
        setShowShoot(false);

        // kalau instacation → pakai range (check in / check out)
        if (type === "instacation") {
            setActiveDateField("checkin");
        } else {
            setActiveDateField("single");
        }
    };

    // helper tampilkan text di check-in / check-out
    const renderCheckInText = () =>
        checkIn ? format(checkIn, "MMM dd") : "Select dates";

    const renderCheckOutText = () =>
        checkOut ? format(checkOut, "MMM dd") : "Select dates";

    // handler DateRange untuk Instacation (rule mirip SearchBar)
    const handleRangeChange = (item: any) => {
        const sel = item.selection as Range;
        setRange([sel]);

        const start = sel.startDate ?? null;
        const end = sel.endDate ?? null;

        if (activeDateField === "checkin") {
            setCheckIn(start);
            setCheckOut(null);
            // setelah pilih check-in, fokus otomatis ke checkout
            setActiveDateField("checkout");
            return;
        }

        if (activeDateField === "checkout") {
            setCheckOut(end);
            // selesai pilih checkout → tutup popup date
            setShowDate(false);
            setActiveDateField(null);
        }
    };

    // handler untuk quick option & calendar pada popup WHEN (single date)
    const applyDate = (date: Date) => {
        setSelectedDate(date);
        setShowDate(false);
    };

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
                    <p className="text-[15px] text-gray-400">
                        {region || "Select region"}
                    </p>
                </div>

                <div className="w-px h-8 bg-gray-300" />

                {/* === DATE PART === */}
                {shootType === "instacation" ? (
                    <>
                        {/* CHECK IN */}
                        <div
                            className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${
                                showDate && activeDateField === "checkin"
                                    ? "bg-gray-100"
                                    : "hover:bg-gray-100/60"
                            }`}
                            onClick={() => {
                                setActiveDateField("checkin");
                                // sync range dengan state sekarang
                                setRange([
                                    {
                                        startDate: checkIn || new Date(),
                                        endDate: checkOut || addDays(new Date(), 1),
                                        key: "selection",
                                    },
                                ]);
                                setShowDate(true);
                                setShowRegion(false);
                                setShowShoot(false);
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
                            className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${
                                showDate && activeDateField === "checkout"
                                    ? "bg-gray-100"
                                    : "hover:bg-gray-100/60"
                            }`}
                            onClick={() => {
                                setActiveDateField("checkout");
                                setRange([
                                    {
                                        startDate: checkIn || new Date(),
                                        endDate: checkOut || addDays(new Date(), 1),
                                        key: "selection",
                                    },
                                ]);
                                setShowDate(true);
                                setShowRegion(false);
                                setShowShoot(false);
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
                        <div className="w-px h-8 bg-gray-300" />
                        <div
                            className={`flex-1 px-6 py-3 cursor-pointer transition rounded-xl ${
                                showDate && activeDateField === "single"
                                    ? "bg-gray-100"
                                    : "hover:bg-gray-100/60"
                            }`}
                            onClick={() => {
                                setActiveDateField("single");
                                setShowDate(!showDate);
                                setShowRegion(false);
                                setShowShoot(false);
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
                                    className={`text-[12px] ${
                                        shootType === "instacation"
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
                                        className={`text-[12px] ${
                                            shootType === "session-morning"
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
                                        className={`text-[12px] ${
                                            shootType === "session-afternoon"
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
                                        className={`text-[12px] ${
                                            shootType === "session-fullday"
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
                    <div className="flex-1 bg-white p-5">
                        <Calendar
                            date={selectedDate || new Date()}
                            onChange={(date: Date) => applyDate(date)}
                            color="#7A3E2C"
                            monthDisplayFormat="MMMM yyyy"
                        />
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
                </div>
            )}

            {/* === DROPDOWN REGION === */}
            {showRegion && (
                <div className="absolute left-3 mt-2 w-[380px] bg-[#FCFBF7] rounded-2xl shadow-lg border border-gray-200 p-4 z-50 font-secondary">
                    {[{ city: "Bandung", region: "West Java, Indonesia" }].map((loc) => (
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
                                <p className="text-[16px] font-medium text-gray-800">
                                    {loc.city}
                                </p>
                                <p className="text-[14px] text-gray-500">{loc.region}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
