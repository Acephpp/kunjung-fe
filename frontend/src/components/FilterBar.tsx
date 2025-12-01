"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiMinus, FiPlus, FiFilter, FiArrowDown } from "react-icons/fi";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function FilterBar() {
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [showWhere, setShowWhere] = useState(false);
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [showCheckOut, setShowCheckOut] = useState(false);
    const [showGuests, setShowGuests] = useState(false);

    const [destination, setDestination] = useState("");

    // guests detail (SAMA DENGAN SearchBar)
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    // date state (SAMA DENGAN SearchBar)
    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

    // filter lain
    const [price, setPrice] = useState([0, 6430000]);
    const [amenities, setAmenities] = useState<string[]>([]);
    const [propertyType, setPropertyType] = useState("any");
    const [sortOption, setSortOption] = useState("Relevance");

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
                setShowFilter(false);
                setShowSort(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleAmenity = (item: string) => {
        setAmenities((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };

    const getGuestText = () => {
        const guestCount = adults + children;
        const infantCount = infants;

        if (guestCount === 0 && infantCount === 0) return "Add guests";
        if (infantCount === 0)
            return `${guestCount} guest${guestCount > 1 ? "s" : ""}`;
        if (guestCount === 0)
            return `${infantCount} infant${infantCount > 1 ? "s" : ""}`;

        return `${guestCount} guest${guestCount > 1 ? "s" : ""}, ${infantCount} infant${
            infantCount > 1 ? "s" : ""
        }`;
    };

    const formatLabelDate = (date: Date | null) => {
        if (!date) return "Select dates";
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

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
        <div className="mx-auto mt-4 relative font-secondary" ref={dropdownRef}>
            <div className="flex items-center justify-between gap-3 relative">
                {/* Button Filter */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowFilter(!showFilter);
                            setShowSort(false);
                            setShowWhere(false);
                            setShowCheckIn(false);
                            setShowCheckOut(false);
                            setShowGuests(false);
                        }}
                        className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-xl bg-[#F8F6F2] text-gray-800 font-medium hover:bg-gray-100 transition"
                    >
                        <FiFilter size={18} />
                        Filter
                    </button>

                    {showFilter && (
                        <div className="absolute left-0 mt-5 w-[400px] bg-[#FCFBF7] rounded-3xl shadow-lg border border-gray-200 p-6 z-50">
                            <h2 className="text-center font-primary text-2xl font-semibold mb-10">
                                Filters
                            </h2>
                            <hr className="my-4" />

                            {/* Price Range */}
                            <div className="mb-10">
                                <label className="text-[16px] font-semibold font-secondary text-gray-700">
                                    Weekend pricing
                                </label>
                                <input
                                    type="range"
                                    min={0}
                                    max={6430000}
                                    value={price[1]}
                                    onChange={(e) =>
                                        setPrice([price[0], Number(e.target.value)])
                                    }
                                    className="w-full accent-[#7A3E2C] mt-2"
                                />
                                <div className="flex justify-between text-sm text-gray-700 mt-1">
                                    <span>Rp{price[0].toLocaleString()}</span>
                                    <span>Rp{price[1].toLocaleString()}</span>
                                </div>
                            </div>

                            <hr className="my-4" />

                            {/* Amenities */}
                            <div className="grid grid-cols-2 gap-3 mb-10 text-[15px] text-gray-800">
                                {[
                                    "Bath tub",
                                    "Kitchen",
                                    "Hot water",
                                    "Wifi",
                                    "Pet friendly",
                                    "Pool",
                                ].map((item) => (
                                    <label
                                        key={item}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={amenities.includes(item)}
                                            onChange={() => toggleAmenity(item)}
                                            className="w-4 h-4 accent-[#7A3E2C]"
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>

                            <hr className="my-4" />

                            {/* Property Type */}
                            <div className="flex justify-center items-center gap-3">
                                {[
                                    { id: "any", label: "Any types" },
                                    { id: "room", label: "Room" },
                                    { id: "entire", label: "Entire house" },
                                ].map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setPropertyType(type.id)}
                                        className={`px-5 py-2 rounded-xl border text-sm font-medium ${
                                            propertyType === type.id
                                                ? "bg-gray-200 border-gray-300 text-gray-800"
                                                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                                        }`}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Search Bar */}
                <div className="flex flex-1 items-center justify-between bg-[#FCFBF7] border border-gray-300 rounded-2xl shadow-sm h-[70px] overflow-visible">
                    {/* Where */}
                    <div className="relative flex-1 max-w-[400px]">
                        <div
                            className={`px-6 py-3 cursor-pointer transition rounded-xl ${
                                showWhere ? "bg-gray-200" : "hover:bg-gray-100/70"
                            }`}
                            onClick={() => {
                                setShowWhere(!showWhere);
                                setShowCheckIn(false);
                                setShowCheckOut(false);
                                setShowGuests(false);
                                setShowFilter(false);
                                setShowSort(false);
                            }}
                        >
                            <p className="text-[16px] font-medium text-gray-800">Where</p>
                            <p className="text-[16px] text-gray-400">
                                {destination ? destination : "Select region"}
                            </p>
                        </div>

                        {/* Popup WHERE – width 400, sejajar kiri dengan kolom */}
                        {showWhere && (
                            <div className="absolute left-0 mt-2 w-[400px] bg-[#FCFBF7] rounded-3xl shadow-lg border border-gray-200 p-4 z-50 font-secondary">
                                <div
                                    onClick={() => {
                                        setDestination("Bandung");
                                        setShowWhere(false);
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
                                            Bandung
                                        </p>
                                        <p className="text-[14px] text-gray-500">
                                            West Java, Indonesia
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
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
                            setShowFilter(false);
                            setShowSort(false);
                        }}
                    >
                        <p className="text-[16px] font-medium text-gray-800">Check in</p>
                        <p className="text-[16px] text-gray-400">
                            {formatLabelDate(checkInDate)}
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
                            setShowFilter(false);
                            setShowSort(false);
                        }}
                    >
                        <p className="text-[16px] font-medium text-gray-800">Check out</p>
                        <p className="text-[16px] text-gray-400">
                            {formatLabelDate(checkOutDate)}
                        </p>
                    </div>

                    <div className="w-px h-8 bg-gray-300" />

                    {/* Who */}
                    <div className="relative flex-1 max-w-[380px]">
                        <div
                            className={`px-6 py-3 cursor-pointer transition rounded-xl ${
                                showGuests ? "bg-gray-200" : "hover:bg-gray-100/70"
                            }`}
                            onClick={() => {
                                setShowGuests(!showGuests);
                                setShowWhere(false);
                                setShowCheckIn(false);
                                setShowCheckOut(false);
                                setShowFilter(false);
                                setShowSort(false);
                            }}
                        >
                            <p className="text-[16px] font-medium text-gray-800">Who</p>
                            <p className="text-[16px] text-gray-400">{getGuestText()}</p>
                        </div>

                        {/* Popup WHO – width 380, sejajar KANAN dengan kolom */}
                        {showGuests && (
                            <div className="absolute right-0 mt-2 w-[380px] bg-[#FCFBF7] rounded-3xl shadow-lg border border-gray-200 px-7 py-5 z-50 font-secondary">
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

                    {/* Search Button */}
                    <button className="bg-transparent text-gray-800 w-[60px] h-[60px] flex items-center justify-center hover:bg-gray-100 rounded-2xl transition">
                        <FiSearch size={20} />
                    </button>
                </div>

                {/* Button Sort */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowSort(!showSort);
                            setShowFilter(false);
                            setShowWhere(false);
                            setShowCheckIn(false);
                            setShowCheckOut(false);
                            setShowGuests(false);
                        }}
                        className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-xl bg-[#F8F6F2] text-gray-800 font-medium hover:bg-gray-100 transition"
                    >
                        <FiArrowDown size={18} />
                        Sort
                    </button>

                    {showSort && (
                        <div className="absolute right-0 mt-5 w-[280px] bg-[#FCFBF7] rounded-3xl shadow-lg border border-gray-200 p-4 z-50">
                            <div className="flex flex-col gap-3 text-gray-800 text-[15px]">
                                {[
                                    "Relevance",
                                    "Trending",
                                    "Price: High to Low",
                                    "Price: Low to High",
                                    "A to Z",
                                    "Z to A",
                                ].map((option) => (
                                    <label
                                        key={option}
                                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-2 rounded-md"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={sortOption === option}
                                            onChange={() => setSortOption(option)}
                                            className="w-4 h-4 accent-[#7A3E2C]"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Dropdown Date (Check in & Check out) */}
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
        </div>
    );
}
